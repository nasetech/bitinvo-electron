'use strict'
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipc = require('electron').ipcMain;
const localUrl = 'file://' + __dirname + '/index.html';
const appUrl = 'https://localhost';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  let mainWindow = new BrowserWindow();
  mainWindow.loadURL(localUrl);
  mainWindow.setFullScreen(true);
  //mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-fail-load', function(){
    mainWindow.reload();
  })

  ipc.on('redirect', function(){
    mainWindow.loadURL(appUrl);
    const ses = mainWindow.webContents.session;
    ses.clearCache(function(){});
  });

  mainWindow.on('closed', function () {
    mainWindow = null
  });
})

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (certificate.issuerName === 'Nasetech Ltd CA') {
    // Verification logic.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
