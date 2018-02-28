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
        searching: true,
        ordering: false,
        rowId: 'id',
        columns: [
            { data: "id", visible: false },
            { className: 'details-control', orderable: false, data: null, defaultContent: ''},
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
        
        var parentid = dcmTK.GetRowId(row);
        if(dcmTK.IsRowOpend(row))
        {
            dcmTK.SetOpenClosed(row, 'closed');
            $('[parentid={0}]'.format(parentid)).each(function(){
                $(this).show();
            });
        }
        else if(dcmTK.IsRowClosed(row))
        {
            dcmTK.SetOpenClosed(row, 'opend');
            $('[parentid={0}]'.format(parentid)).each(function(){
                $(this).hide();
            });
        }
    } );

    ///Test Code
    var fileName = "..\\etc\\sampleDICOM\\0001.DCM";
    dcmTK.loadDICOMFileHierarchy(fileName);


} );

