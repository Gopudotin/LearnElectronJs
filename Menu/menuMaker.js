const { app, Menu, dialog } = require("electron");

// Check for macOS platform
const isMac = process.platform === 'darwin';

const template = [
  // macOS-specific menu (if applicable)
  ...(isMac ? [
    { label: app.name, submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'quit' },
    ] },
  ] : []),

  // File menu
  {
    label: 'File',
    submenu: [
      {
        label: 'Open File',
        click: async () => {
          const { filePath } = await dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{ name: 'Text Files', extensions: ['txt', 'md'] }] // Example filter
          });

          if (filePath) {
            // Load or process the selected file here
          }
        },
      },
    ],
  },

  // Edit menu
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'PasteAndMatchStyle' },
        { type: 'separator' },
      ] : []),
      { role: 'delete' },
      { type: 'separator' },
      { role: 'selectAll' },
    ],
  },

  // View menu
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
    ],
  },

  // Window menu (custom label for non-macOS)
  {
    label: isMac ? 'Window' : 'My Menu',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' },
      ] : [
        { role: 'close' },
      ]),
    ],
  },
];

module.exports.mainMenu=Menu.buildFromTemplate(template);