import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Nav, Navbar, Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { Sidebar } from './Sidebar'
import '../dashboard.css'
import { pr } from '../common';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './gridlayout.css'
import RGL, { WidthProvider } from "react-grid-layout";
import { TableApp } from './TableApp'
import axios from 'axios';
import useEventListener from './use-event-listener';
import usePrevious from './use-previous';
const _ = require("lodash");
const { v4: uuidv4 } = require('uuid');

const ReactGridLayout = WidthProvider(RGL);


const Layout = ({ title,
    onNavClick,
    togglemenu, hide = false, children }) => {

    const [layout, setLayout] = useState([]);
    const savedLayout = usePrevious(layout)

    const [cmdKeyState, setCmdKeyState] = useState({ ctrl: false, alt: false, shift: false });

    const [state, setState] = useState({ static: true, draggable: false, resizable: false, });

    const onLayoutChange = (layout) => {
        setLayout(layout);
        pr('onLayoutChange: ', layout);
    };

    const [items, setItems] = useState([])// Format: [{ DOM: <type such as table, chart>, id: uuidv4(), url: 'https://localhost:3000/web/datawheeler/data/data2.js' }])
    const [cmdHistory, setCmdHistory] = useState([])
    const saveditems = usePrevious(items);
    const savecmdHistory = usePrevious(cmdHistory);
    //pr('items: ', items);

     // If pressed key is our target key then set to true
    function downHandler({ key }) {

        switch (key) {
            case 'Control': !cmdKeyState.ctrl && setCmdKeyState({ ...cmdKeyState, ctrl: true });
                break;
            case 'Alt': !cmdKeyState.alt && setCmdKeyState({ ...cmdKeyState, alt: true });
                break;
            case 'Shift': !cmdKeyState.shift && setCmdKeyState({ ...cmdKeyState, shift: true });
                break;
        }

        if (key == 'Control' && !state.draggable ) {
            setState({  draggable: true, resizable: true })
            //pr(key, 'down, state ', state)
        }

    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
        
        switch (key) {
           case 'Control': cmdKeyState.ctrl && setCmdKeyState({ ...cmdKeyState, ctrl: false });
               break;
            case 'Alt': cmdKeyState.alt && setCmdKeyState({ ...cmdKeyState, alt: false });
               break;
            case 'Shift': cmdKeyState.shift &&  setCmdKeyState({ ...cmdKeyState, shift: false });
               break;
       }

        if (key == 'Control' && state.draggable) {
           setState({ draggable: false, resizable: false })
          
       }
    };

    // Add event listeners
    useEventListener('keydown', downHandler);
    useEventListener('keyup', upHandler);



    const handleItemClick = (e, id) => {
        //pr(e.type, e.altKey, e.shiftKey, e.ctrlKey);

        if (e.altKey && e.shiftKey && e.ctrlKey) {
            //setState({ draggable: false, resizable: false })
            pr('removing:', id)
            setItems(_.reject(items, { id: id }));

        }
        else  if (e.altKey && e.shiftKey) {
            let modLayout = _.find(savedLayout, { i: id });
            const appNodes = document.getElementById(id).getElementsByTagName("div")
            if (appNodes.length == 0)
                return;
            modLayout = { ...modLayout, w: 1 + appNodes[0].offsetWidth / 48, h: 1 + appNodes[0].offsetHeight /40 }
            setLayout([..._.reject(savedLayout, { i: id }), modLayout]);
            appNodes[0] && pr('Client Height', modLayout );
            //pr('modLayout', modLayout)
        }
    };

    const generateDOM = () => {
        //const prevLayout = _.orderBy(layout, 'id')
        pr('generateDOM', 'items', items)
        return (_.map(_.range(items.length), (i) =>
            (<div key={items[i].id} data-grid={{ x: 0, y: 0, w: items[i].dim[0], h: items[i].dim[1]}} 
                    style={{ border: '3px solid', backgroundColor: "lightgrey", margin: "auto", overflowY: "scroll"
                            }} onClick={(e) => handleItemClick(e, items[i].id)}
                id={items[i].id} >
                <h6 style={{ padding: '3px', margin: '5px' }} align="left" onClick={(e) =>
                                            (e.target.innerText == '☰ Show command' ? e.target.innerHTML = items[i].url : e.target.innerText = '☰ Show command')}>☰ Show command</h6>

                {items[i].DOM == 'Table' ? <TableApp url={items[i].url} id={items[i].id} raw={false} /> : <></>}

                </div>)
            ))
    }
    const defaultProps = {
        className: "layout",
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        autoSize: true,
};

        return (
            <Container fluid>
                <Row>
                    <Col id="sidebar-wrapper" sm={hide ? 1 : 4}>
                        <br />
                        {togglemenu}
                        <span><Navbar variant="dark" expand="lg">
                            <Navbar.Brand href="#home">{title}</Navbar.Brand>
                        </Navbar></span>

                        <Sidebar onNavClick={onNavClick} hide={hide} cmdHistory={cmdHistory} />

                    </Col>
                    <Col id="page-content-wrapper" sm={hide ? 10 : 7} style={{ backgroundColor: 'lightgrey' }}>

                        <InputGroup sm={8}>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Command</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl sm={9} as="textarea" aria-label="With textarea"
                                onKeyUp={(e) => {
                                    if (e.ctrlKey && e.key == 'Enter') {
                                        const id = uuidv4();
                                        setItems([{ DOM: 'Table', url: e.target.value.trim(), id: id, url: e.target.value.trim(), dim: [16, 12] }, ...saveditems,])
                                        setCmdHistory([e.target.value.trim(), ...cmdHistory])
                                     }
                                }} />;

                        </InputGroup>

                        <ReactGridLayout layout={layout} {...defaultProps} cols={hide ? 20 : 24} rowHeight={30} width={1200}
                            onLayoutChange={onLayoutChange} isResizable={state.resizable} isDraggable={state.draggable}>
                            {generateDOM()}
                        </ReactGridLayout>

                    </Col>
                </Row>
            </Container>

        )

}

export { Layout };
