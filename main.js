const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("node:path");
const fs = require('fs');
const { mainMenu, popMenu } = require("./Menu/menuMaker");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true, // Ensure nodeIntegration is enabled
      contextIsolation: false // Ensure contextIsolation is disabled
    },
  });

  Menu.setApplicationMenu(mainMenu);

  mainWindow.loadFile("index.html");
  mainWindow.webContents.on("context-menu", () => {
    popMenu.popup(mainWindow.webContents);
  });
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// ipcMain.on("saveText", (event, textValue) => {
//   fs.writeFile("c:\\Temporary\\file1.txt",textValue,(err) =>{
//     if(!err){
//       console.log('file Written')
//     }
//     else{
//       console.log(err);
//     }
//   }),
ipcMain.on("saveText", (event, textValue) => {
  fs.appendFile("c:\\Temporary\\file1.txt",textValue,(err) =>{
    if(!err){
      console.log('file Appended')
    }
    else{
      console.log(err);
    }
  })

});

// ipcMain.on("createTextFile", (event, filePath) => {
//   // Create the empty text file at the specified path
//   fs.writeFile(filePath, "", (err) => {
//     if (err) {
//       console.error("Error creating file:", err);
//     } else {
//       console.log("New text file created:", filePath);
//       // Optionally, open the newly created file in the main window
//       // const mainWindow = BrowserWindow.getAllWindows()[0];
//       // mainWindow.loadFile(filePath);
//     }
//   });
// });
