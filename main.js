'use strict'

const { app, BrowserWindow } = require('electron')



function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 1100,
        height: 800,
    })

    // and load the index.html of the app.
    win.loadFile('index.html')
}

app.on('ready', createWindow)

