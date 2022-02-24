const { app, dialog, Menu, MenuItem, BrowserWindow } = require("electron");
const i18nBackend = require("i18next-electron-fs-backend");
const whitelist = require("../localization/whitelist");
const isMac = process.platform === "darwin";
const path = require("path");
const fs = require("fs");
const {DbManager} = require("./db");

const MenuBuilder = function(mainWindow, appName) {

  function handleClickImport(menuItem, browserWindow, event) {
    const dbPath = app.getPath("userData");
    const dataPath = path.join(dbPath, "data.db");
    const importFiles = dialog.showOpenDialogSync({ properties: ['openFile'] });
    if(importFiles){
      fs.unlinkSync(dataPath); // purge database
      const dbManager = new DbManager({
        path: app.getPath("userData")
      }).dbMigration(importFiles[0]);
      app.relaunch();
      app.exit();
    }
  }

  function handleClickExport(menuItem, browserWindow, event) {
    const dbPath = app.getPath("userData");
    const dataPath = path.join(dbPath, "data.db");
    const destDir = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
    if(destDir) {
      const destPath = path.join(destDir[0], "data.db");
      fs.copyFile(dataPath, destPath, (err) => {
        if (err) throw err;
      });
    }
  }

  function handleClickPurge(menuItem, browserWindow, event) {
    const dbPath = app.getPath("userData");
    const dataPath = path.join(dbPath, "data.db");
    fs.unlink(dataPath, (err) => {
      if (err) throw err;
    });
    app.relaunch();
    app.exit();
  }

  function handleClickPrint(menuItem, browserWindow, event) {
    var options = {
      silent: false,
      printBackground: true,
      color: false,
      margin: {
        marginType: 'printableArea',
      },
      landscape: false,
      pagesPerSheet: 1,
      collate: false,
      copies: 1,
    }
    browserWindow.webContents.print(options, (success, failureReason) => {
      if(!success) console.log(failureReason);
      
    })
  }

  // https://electronjs.org/docs/api/menu#main-process
  const defaultTemplate = function(i18nextMainBackend) {
    return [
      // { role: "appMenu" }
      ...(isMac
        ? [
            {
              label: appName,
              submenu: [
                {
                  role: "about",
                  label: i18nextMainBackend.t("About")
                },
                {
                  type: "separator"
                },
                {
                  role: "services",
                  label: i18nextMainBackend.t("Services")
                },
                {
                  type: "separator"
                },
                {
                  role: "hide",
                  label: i18nextMainBackend.t("Hide")
                },
                {
                  role: "hideothers",
                  label: i18nextMainBackend.t("Hide Others")
                },
                {
                  role: "unhide",
                  label: i18nextMainBackend.t("Unhide")
                },
                {
                  type: "separator"
                },
                {
                  role: "quit",
                  label: i18nextMainBackend.t("Quit")
                }
              ]
            }
          ]
        : []),
      // { role: "fileMenu" }
      {
        label: i18nextMainBackend.t("File"),
        submenu: [
          {
            label: i18nextMainBackend.t("Database"),
            submenu: [
              {
                role: "import...",
                click: handleClickImport,
                label: i18nextMainBackend.t("Import")
              },
              {
                role: "export...",
                click: handleClickExport,
                label: i18nextMainBackend.t("Export")
              },
              {
                role: "purge",
                click: handleClickPurge,
                label: i18nextMainBackend.t("Purge")
              },
            ]
          },
          {
            type: "separator"
          },
          {
            role: "print",
            click: handleClickPrint,
            accelerator: process.platform === 'darwin' ? 'Cmd+P' : 'Shift+P',
            label: i18nextMainBackend.t("Print")
          },
          isMac
            ? {
                role: "close",
                label: i18nextMainBackend.t("Quit")
              }
            : {
                role: "quit",
                label: i18nextMainBackend.t("Exit")
              },
        ]
      },
      // { role: "editMenu" }
      {
        label: i18nextMainBackend.t("Edit"),
        submenu: [
          {
            role: "undo",
            label: i18nextMainBackend.t("Undo")
          },
          {
            role: "redo",
            label: i18nextMainBackend.t("Redo")
          },
          {
            type: "separator"
          },
          {
            role: "cut",
            label: i18nextMainBackend.t("Cut")
          },
          {
            role: "copy",
            label: i18nextMainBackend.t("Copy")
          },
          {
            role: "paste",
            label: i18nextMainBackend.t("Paste")
          },
          ...(isMac
            ? [
                {
                  role: "pasteAndMatchStyle",
                  label: i18nextMainBackend.t("Paste and Match Style")
                },
                {
                  role: "delete",
                  label: i18nextMainBackend.t("Delete")
                },
                {
                  role: "selectAll",
                  label: i18nextMainBackend.t("Select All")
                },
                {
                  type: "separator"
                },
                {
                  label: i18nextMainBackend.t("Speech"),
                  submenu: [
                    {
                      role: "startspeaking",
                      label: i18nextMainBackend.t("Start Speaking")
                    },
                    {
                      role: "stopspeaking",
                      label: i18nextMainBackend.t("Stop Speaking")
                    }
                  ]
                }
              ]
            : [
                {
                  role: "delete",
                  label: i18nextMainBackend.t("Delete")
                },
                {
                  type: "separator"
                },
                {
                  role: "selectAll",
                  label: i18nextMainBackend.t("Select All")
                }
              ])
        ]
      },
      // { role: "viewMenu" }
      {
        label: i18nextMainBackend.t("View"),
        submenu: [
          {
            role: "reload",
            label: i18nextMainBackend.t("Reload")
          },
          {
            role: "forcereload",
            label: i18nextMainBackend.t("Force Reload")
          },
          {
            role: "toggledevtools",
            label: i18nextMainBackend.t("Toggle Developer Tools")
          },
          {
            type: "separator"
          },
          {
            role: "resetzoom",
            label: i18nextMainBackend.t("Reset Zoom")
          },
          {
            role: "zoomin",
            label: i18nextMainBackend.t("Zoom In")
          },
          {
            role: "zoomout",
            label: i18nextMainBackend.t("Zoom Out")
          },
          {
            type: "separator"
          },
          {
            role: "togglefullscreen",
            label: i18nextMainBackend.t("Toggle Fullscreen")
          }
        ]
      },
      // language menu
      {
        label: i18nextMainBackend.t("Language"),
        submenu: whitelist.buildSubmenu(i18nBackend.changeLanguageRequest, i18nextMainBackend)
      },
      // { role: "windowMenu" }
      {
        label: i18nextMainBackend.t("Window"),
        submenu: [
          {
            role: "minimize",
            label: i18nextMainBackend.t("Minimize")
          },
          {
            role: "zoom",
            label: i18nextMainBackend.t("Zoom")
          },
          ...(isMac
            ? [
                {
                  type: "separator"
                },
                {
                  role: "front",
                  label: i18nextMainBackend.t("Front")
                },
                {
                  type: "separator"
                },
                {
                  role: "window",
                  label: i18nextMainBackend.t("Window")
                }
              ]
            : [
                {
                  role: "close",
                  label: i18nextMainBackend.t("Close")
                }
              ])
        ]
      },
      {
        role: "help",
        label: i18nextMainBackend.t("Help"),
        submenu: [
          {
            label: i18nextMainBackend.t("Learn More"),
            click: async () => {
              const { shell } = require("electron");
              await shell.openExternal("https://electronjs.org");
            }
          }
        ]
      }
    ];
  };

  return {
    buildMenu: function(i18nextMainBackend) {
      const menu = Menu.buildFromTemplate(defaultTemplate(i18nextMainBackend));
      Menu.setApplicationMenu(menu);

      return menu;
    }
  };
};

module.exports = MenuBuilder;
