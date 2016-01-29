'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  console.log("window-all-closed");  
  mainWindow.close();
  app.quit();
});

app.on('ready', function() {
  
  mainWindow = new BrowserWindow({    
    width : 1024,
    height : 768,    
    autoHideMenuBar: true,
    useContentSize: true,
  });
  mainWindow.openDevTools();
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.focus();
  console.log("ready!!");
});
