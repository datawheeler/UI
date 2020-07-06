import React, { useEffect, Component } from 'react';
import Input from './Input';
import Table from './Table';
import {pr} from '../common'
const csv = require('csvtojson')
const _ = require("lodash");

//const TableApp = ({ id }) => {
//
//  //  useEffect(()=> {
//  //      //Ajax call 
//  //      console.log('Table - mounted');
//  //      //this.setState({})
//  //  })
//  //
//    const data = 'https://localhost:3000/web/datawheeler/data/data.js';
// //   console.log('TableApp', data)
//
//            return (
//                <div className="App" ref='div' style={{ textAlign: "center", padding: "20px" }}>
//                    <Table data={data} id={id} />
//                </div>
//            );
//        
//    }


class TableApp extends Component {
    constructor(props) {
        super(props);
        pr('TableApp props', props)
        this.state = { items: null, error: null, loaded: false, };
        this.dom = props.dom;
        this.id = props.id;
        this.raw = (this.dom == 'RAW');
        ;
    }

    componentDidMount() {
        //Ajax call 
        console.log('Table - mounted');
        fetch(this.props.url)
            .then(res => {
                if (this.raw || this.dom == 'CSV') {
                    return res.text();
                }else
                    return res.json()
                })
            .then(
                (result) => {

                    if (this.dom == 'CSV') {
                        csv({
                            noheader: true,
                            output: "csv"
                        })
                            .fromString(result)
                            .then((csvRow) => {
                                const result = {
                                    cols: _.map(csvRow[0], (title) => ({ title: title })),
                                    rows: _.takeRight(csvRow, csvRow.length - 1)
                                }
                                console.log(result)
                                this.setState({ items: { result }, error: null, loaded: true })
                            })

                    }
                    else {
                        console.log(result)
                        this.setState({ items: { result }, error: null, loaded: true })
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({ items: null, error: error, loaded: true, })
                }
            )
    }
    
    render() {
        if (!this.state.loaded) {
            return (<div style={{ padding: '3px', margin: '5px' }}>Loading...</div>)
        } else
            if (this.state.error)
                return (<div style={{ padding: '3px', margin: '5px' }}>{this.state.error.toString()}</div>)
        else
            {
                return (
                    <div className="App" ref='div' style={{ display: "inline-block", textAlign: "left", padding: "10px" }}>
                        {this.raw ?
                            <p style={{ whiteSpace: 'pre-wrap' }}>
                                {JSON.stringify(this.state.items.result, null, 3).removeSpecialChars().replace(/(^")|("$)/g, "")}
                            </p> 
                            : <Table data={this.state.items.result} id={this.id} url={this.props.url} />}
                        
                    </div>
                );
            }
        }
}
////
export { TableApp };