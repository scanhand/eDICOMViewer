import $ from 'jquery';
var format = require('string-format')
format.extend(String.prototype);
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import menu from './menu.js';
import 'datatables.net-dt/css/jquery.dataTables.css';
var dataTables = require('datatables.net');


console.log("index.js loaded!")

$(document).ready(function() {
    $('#Elements').DataTable();
} );