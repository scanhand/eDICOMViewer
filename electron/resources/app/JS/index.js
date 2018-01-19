import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

$('#JQTest').html('<h1>Index.js First Write!</h1>');
$('#JQTest').append(" \
<table class='table  table-striped table-dark'> \
<thead class='thead-dark'>\
  <tr>\
    <th scope='col'>#</th>\
    <th scope='col'>First</th>\
    <th scope='col'>Last</th>\
    <th scope='col'>Handle</th>\
  </tr>\
</thead>\
<tbody>\
  <tr>\
    <th scope='row'>1</th>\
    <td>Mark</td>\
    <td>Otto</td>\
    <td>@mdo</td>\
  </tr>\
  <tr>\
    <th scope='row'>2</th>\
    <td>Jacob</td>\
    <td>Thornton</td>\
    <td>@fat</td>\
  </tr>\
  <tr>\
    <th scope='row'>3</th>\
    <td>Larry</td>\
    <td>the Bird</td>\
    <td>@twitter</td>\
  </tr>\
</tbody>\
</table>");