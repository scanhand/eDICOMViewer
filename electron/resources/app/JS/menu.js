import { BrowserView } from 'electron';
const {remote} = require('electron');
const {Menu, MenuItem} = remote;
const {dialog} = require('electron').remote
var dcmTK = require('./nodeDCMTK.js');

const menu = new Menu();
menu.append(new MenuItem({
    label:'File', 
    submenu: [
        {
            label: 'Open File...',
            click: ()=>{
                var files=[];
                files = dialog.showOpenDialog({
                    properties: ['openFile'],
                    filters: [
                        {name: 'DICOM', extensions: ['dcm', 'dic']},
                        {name: 'All Files', extensions: ['*']}
                      ]
                }); 
                if(files == null)
                    return;
                
                dcmTK.loadDICOMFile(files[0]);
            }
        }
    ]
}));

menu.append(new MenuItem({
    label:'About',
    submenu: [
        {
            label: 'About DICOM Viewer...',
            click: ()=>{
                console.log("Click About DICOM Viewer.");
            }
        },
      
    ]
}));

//for debugging
menu.append(new MenuItem({
        label: 'reload',
        click: ()=>{
            remote.getCurrentWindow().reload();
        }
    }
));

var opendDevTool = false;
menu.append(new MenuItem({
    label: 'DevTool',
    click: ()=>{
        if(opendDevTool)
            remote.getCurrentWebContents().closeDevTools();
        else
            remote.getCurrentWebContents().openDevTools();
            
        opendDevTool = !opendDevTool;
    }
}
));

Menu.setApplicationMenu(menu);