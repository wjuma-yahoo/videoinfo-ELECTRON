const electron = require("electron");
const defaultWindowOpts = require("electron-browser-window-options");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron;

const opts = Object.assign({}, defaultWindowOpts, {
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
});

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow(opts);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submited", (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send("video:metadata", metadata.format.duration);
  });
});
