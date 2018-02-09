import $ from 'jquery';
var format = require('string-format')
format.extend(String.prototype);
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import menu from './menu.js';
var dt = require('datatables.net');


console.log("index.js loaded!")

$(document).ready(function() {
    $('#Elements').DataTable();
} );