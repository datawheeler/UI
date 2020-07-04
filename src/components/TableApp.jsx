import React, { useEffect, Component } from 'react';
import Input from './Input';
import Table from './Table';


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
        this.state = { items: null, error: null, loaded: false,  };
        this.id = props.id;
        this.raw = props.raw||true;
        ;
    }

       
    componentDidMount() {
        //Ajax call 
        console.log('Table - mounted');
        fetch(this.props.url)
            .then(res => {
                if (this.raw) {
                    return  res.text()
                    }
                else
                    return res.json()
                })
            .then(
                (result) => {
                    this.setState({ items: {result }, error: null, loaded: true  })
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
                console.log(this.state.items)
                return (
                    <div className="App" ref='div' style={{ display: "inline-block", textAlign: "left", padding: "10px" }}>
                        {!this.raw ? <Table data={this.state.items} id={this.id} url={this.props.url} /> :
                            <p style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(this.state.items.result, null, 3).replace(/(^")|("$)/g, "")
                                                                                                                .replace(/\\n/g, "\n")
                                                                                                                .replace(/\\'/g, "\'")
                                                                                                                .replace(/\\"/g, '\"')
                                                                                                                .replace(/\\&/g, "\&")
                                                                                                                .replace(/\\r/g, "\r")
                                                                                                                .replace(/\\t/g, "\t")
                                                                                                                .replace(/\\b/g, "\b")
                                                                                                                .replace(/\\f/g, "\f")
                                                                                                                }</p>}  
                        
                    </div>
                );
            }
        }
}
////
export { TableApp };