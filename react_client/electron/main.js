const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const contextMenu = require('electron-context-menu');
const url = require('url');
const path = require('path');
const electronDl = require('electron-dl');

electronDl();

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
    title: 'OAA: Scholarship Management System',
  });

  // win.loadFile(path.join(__dirname, ".", "src", "index.html"));
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
    });
    win.loadURL(startUrl);
  // win.loadURL('http://localhost:3000');
  // win.webContents.openDevTools();
}

contextMenu({
	prepend: (defaultActions, parameters, browserWindow) => [
	]
});

app.whenReady().then(() => {
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
