const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win; 

const createWindow = () => {
  win = new BrowserWindow({
    width: 900,
    height: 560,
    webPreferences: {
      preload: path.join(__dirname, "src/Screens/preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, "src/Screens/Login.html"));
};

ipcMain.on("navigate", (event, page) => {
  win.loadFile(path.join(__dirname, `src/Screens/${page}.html`));
});

app.whenReady().then(createWindow);

console.log("Electron is running");













// const { app, BrowserWindow } = require('electron')

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600
//   })

//   win.loadFile('index.html')
// }

// app.whenReady().then(() => {
//   createWindow()
// })


// const { app, BrowserWindow } = require("electron");

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 900,
//     height: 560,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//     },
//   });

//   win.loadFile("src/Screens/Login.html");
// };

// app.whenReady().then(createWindow);


// console.log("Electron is running");

