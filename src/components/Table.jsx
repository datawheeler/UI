import React, {Component} from 'react';
import './datatables.css';
const $ = require('jquery');
$.DataTable = require('datatables.net');
const { v4: uuidv4 } = require('uuid');

//const columns = [
//    {
//        title: 'Name',
//        width: 120,
//        data: 'name'
//    },
//    {
//        title: 'Nickname',
//        width: 180,
//        data: 'nickname'
//    },
//];
//
const columns =  [
    { title: "Name" },
    { title: "Position" },
    { title: "Office" },
    { title: "Extn." },
    { title: "Start date" },
    { title: "Salary" }
]
//let columns =[]
function reloadTableData(data, id) {
    const table = $('.' + id ).find('table').DataTable();
    table.clear();
    table.rows.add(data);
    table.draw();
}

function updateTable(data, id) {
    //const table = $('.data-table-wrapper').find('table').DataTable();
    const table = $('.' + id).find('table').DataTable();
    let dataChanged = false;
    table.rows().every(function () {
        const oldNameData = this.data();
        const newNameData = data.find((nameData) => {
            return nameData.name === oldNameData.name;
        });
        if (oldNameData.nickname !== newNameData.nickname) {
            dataChanged = true;
            this.data(newNameData);
        }
       return true;
    });

    if (dataChanged) {
        table.draw();
    }
}


class Table extends Component {

    constructor(props) {
        super(props);
        this.uuidv4 = uuidv4();
        this.tableId = uuidv4();
        this.state = { refresh: props.refresh }
    }


    componentDidMount() {
         $('#' + this.uuidv4).DataTable({
            //dom: '<"data-table-wrapper"flipt>',
            dom: '<"' + this.tableId + '"flipt>', 
            data: this.props.data.rows,
            "autoWidth": false,
            "columns": this.props.data.cols,
            ordering: true,
            search: {
                "regex": true
            }
        });
    }

    componentWillUnmount(){
        //$("'." + this.props.id + "'").find('table').DataTable().destroy(true);
        $('#' + this.uuidv4).DataTable().destroy(true);
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.data && (nextProps.data.length !== this.props.data.length)) {
            reloadTableData(nextProps.data, this.props.id);
        } else {
            updateTable(nextProps.data, this.props.id);
        }
        return false;
    }



    render() {

        return (
            <div refresh={this.state.refresh} style={{ backgroundColor: 'lightgrey', width: '90%', margin: '0 auto 2em auto' }}
                cellpadding="3" cellspacing="0" border="0" >
                <table id={this.uuidv4} class="display" style={{ width: "100%", fontSize: '12px'}}/>
            </div>);
    }
}

//Table.PropTypes = {
//    names: React.PropTypes.array
//};

export default Table;