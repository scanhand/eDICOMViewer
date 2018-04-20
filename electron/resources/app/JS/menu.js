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
                
                dcmTK.loadDICOMFileHierarchy(files[0]);
            }
        },
        {
            label: 'Save File...',
            click: ()=>{
                var fileName=[];
                fileName = dialog.showSaveDialog({
                    properties: ['saveFile'],
                    filters: [
                        {name: 'DICOM', extensions: ['dcm', 'dic']},
                        {name: 'All Files', extensions: ['*']}
                      ]
                }); 
                if(fileName == null)
                    return;
                
                dcmTK.saveDICOMFile(fileName);
            }
        },
        {
            label: "Exit",
            click: ()=>{
                dcmTK.vex.defaultOptions.className = 'vex-theme-os';
                dcmTK.vex.dialog.confirm({
                    message: 'Are you want to exit eDICOM Viewer?',
                    callback: function (value) {
                        if (value != true) 
                            return;
                        
                        remote.getCurrentWindow().close();
                    }
                });
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
        }
    ]
}));

///Debugging
var opendDevTool = false;
menu.append(new MenuItem({
    label:'Debugging',
    submenu: [
        {
            label: 'reload',
            click: ()=>{
                remote.getCurrentWindow().reload();
            }
        },
        {
            label: 'DevTool',
            click: ()=>{
                if(opendDevTool)
                    remote.getCurrentWebContents().closeDevTools();
                else
                    remote.getCurrentWebContents().openDevTools();
                    
                opendDevTool = !opendDevTool;
            }
        }
    ]
}));

Menu.setApplicationMenu(menu);