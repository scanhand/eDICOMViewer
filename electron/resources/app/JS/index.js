import $ from 'jquery';
var format = require('string-format')
format.extend(String.prototype);
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';
import menu from './menu.js';

console.log("index.js loaded!")



$(document).ready(function() {
    
    var items = [
        {
            "Elment Tag": "0000:0001",
            "Tag Name":   "System Architect",
            "Value":      "$3,120",
        },
        {
            "Elment Tag": "0000:0002",
            "Tag Name":   "Test Architect",
            "Value":      "$2220",
        }
    ]
    elementTable = $('#Elements').DataTable({
        paging: false,
        searching: false
    });

    // console.log(items[0]);
    var counter = 1;    
    elementTable.row.add([
        counter +'.22',
        counter +'.33',
        counter +'.44'
    ] ).draw(false);

    // console.log(items[1]);
    elementTable.row.add([
        items[0]["Elment Tag"],
        items[0]["Tag Name"],
        items[0]["Value"],
    ]).draw(false);
} );