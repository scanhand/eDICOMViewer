import { BrowserView } from 'electron';
const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const menu = new Menu();
menu.append(new MenuItem({
    label:'File', 
    submenu: [
        {
            label: 'Open File...',
            click: ()=>{
                console.log("Click Open File.");
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
menu.append(new MenuItem(
    {
        label: 'reload',
        click: ()=>{
            remote.getCurrentWindow().reload();
        }
    }
));

Menu.setApplicationMenu(menu);