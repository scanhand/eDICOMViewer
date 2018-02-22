import $ from 'jquery';
var format = require('string-format')
format.extend(String.prototype);
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';
var dcmTK = require('./nodeDCMTK.js');
import menu from './menu.js';


console.log("index.js loaded!")

$(document).ready(function() {
    elementTable = $('#Elements').DataTable({
        paging: false,
        searching: false,
        ordering: false,
        rowId: 'id',
        columns: [
            { data: "id", visible: false },
            { "className": 'details-control', "orderable": false, "data": null, "defaultContent": ''},
            { title: "Elment Tag", data: "tag" },
            { title: "Tag Name", data: "name" },
            { title: "VR", data: "vr" },
            { title: "Value", data: "value" }
        ]
    });

    // Add event listener for opening and closing details
    $('#Elements tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = elementTable.row( tr );
 
        // tr.addClass('open');
        /*
        if ( row.child.isShown() ) {
            // This row is already open - close it
            //row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            //row.child( format(row.data()) ).show();
            tr.addClass('close');
        }
        */
    } );

    ///Test Code
    var fileName = "..\\etc\\sampleDICOM\\0001.DCM";
    dcmTK.loadDICOMFileHierarchy(fileName);
} );

