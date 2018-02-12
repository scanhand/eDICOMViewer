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
    elementTable = $('#Elements').DataTable({
        paging: false,
        searching: false
    });
} );