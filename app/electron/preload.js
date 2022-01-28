const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const i18nextBackend = require("i18next-electron-fs-backend");
const Store = require("secure-electron-store").default;
const ContextMenu = require("secure-electron-context-menu").default;
const SecureElectronLicenseKeys = require("secure-electron-license-keys");
const manager = require("../src/db/db")

// Create the electron store to be made available in the renderer process
const store = new Store();

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer, process),
  store: store.preloadBindings(ipcRenderer, fs),
  contextMenu: ContextMenu.preloadBindings(ipcRenderer),
  licenseKeys: SecureElectronLicenseKeys.preloadBindings(ipcRenderer)
});

contextBridge.exposeInMainWorld("myAPI", {
  listCompany: () => manager.listCompany(),
  getCompany: (id) => manager.getCompany(id),
  handleCompanyChangeRequest: (compList) => manager.handleCompanyChangeRequest(compList),
  listProduct: () => manager.listProduct(),
  getProduct: (id) => manager.getProduct(id),
  handleProductChangeRequest: (prodList) => manager.handleProductChangeRequest(prodList),
  listPrice: () => manager.listPrice(),
  handlePriceChangeRequest: (priceList) => manager.handlePriceChangeRequest(priceList),
  listForm: () => manager.listForm(),
  getForm: (id) => manager.getForm(id),
  handleFormChangeRequest: (formList) => manager.handleFormChangeRequest(formList),
  listRecord: (formId) => manager.listRecord(formId),
  handleRecordChangeRequest: (recordList) => manager.handleRecordChangeRequest(recordList),
});
