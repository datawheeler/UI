import React from 'react';
import { Nav, Navbar, Badge, Row, Col, Card, Container, Button, Tab } from "react-bootstrap";
import { withRouter } from "react-router";
//import '../dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { pr } from '../common';

const _ = require("lodash");




const Side = ({ onNavClick, cmdHistory=['first', 'second'], hide = false }) => {

    //pr('Sidebar:', hide);

    return (
        <>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2} style={{ padding: '0' }}>
                        <Nav variant="pills" className="flex-column" onClick={onNavClick} style={{ font: 'bold' }}>
                            <Nav.Item>
                                <Nav.Link eventKey="first" >History</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">About</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    {!hide && <Col sm={10}>
                        <Tab.Content style={{ color: 'white', margin: 'auto' }}>
                            <Tab.Pane eventKey="first">
                               <Container><h6>Command history :</h6> 
                                {_.map(_.range(cmdHistory.length),
                                    (i) => (<Row>
                                                <Col sm={1} style={{ padding: '3px', margin: '5px' }}>{cmdHistory.length - i}</Col>
                                                <Col sm={10} style={{ padding: '3px', wordWrap: 'break-word', margin: '3px', }} onClick={(e) => e.ctrlKey && alert(e.target.innerText)}>
                                                    {cmdHistory[i]}</Col>
                                            </Row>))}
                                </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <h6>Datawheeler is a general purpose UI for data wrangling and data analytics.</h6>
              </Tab.Pane>
                        </Tab.Content>
                    </Col>}
                </Row>
            </Tab.Container>

        </>
    );
};

const Sidebar = withRouter(Side);

export { Sidebar };

