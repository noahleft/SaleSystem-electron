const Sqlite3 = require('better-sqlite3');
const path = require("path");
const fs = require("fs");

class FakeDb {
    constructor(dbPath) {
        console.log(`creating fake db on ${dbPath}`);
        this.db = Sqlite3(dbPath);
        const compTbl = "CREATE TABLE company(\n\
            ID          INTEGER PRIMARY KEY AUTOINCREMENT,\n\
            NAME        TEXT    NOT NULL,\n\
            HIDE        BOOLEAN NOT NULL DEFAULT 0,\n\
            PRINTTAX    BOOLEAN NOT NULL DEFAULT 0,\n\
            ADDRESS     TEXT    NOT NULL DEFAULT '', \n\
            PHONE       TEXT    NOT NULL DEFAULT '', \n\
            CONTACT     TEXT    NOT NULL DEFAULT '', \n\
            BUSINESSNUM TEXT    NOT NULL DEFAULT '', \n\
            NOTE        TEXT    NOT NULL DEFAULT '', \n\
            INTERNAL    TEXT    NOT NULL DEFAULT '', \n\
            UNIQUE(NAME));";
        this.db.exec(compTbl);
        const prodTbl = "CREATE TABLE product(\n\
            ID       INTEGER PRIMARY KEY AUTOINCREMENT,\n\
            NAME     TEXT NOT NULL,\n\
            HIDE     BOOLEAN NOT NULL DEFAULT 0,\n\
            TYPE     INTEGER NOT NULL DEFAULT 0,\n\
            GROUP_ID INTEGER NOT NULL DEFAULT 0,\n\
            UNIQUE(NAME));";
        this.db.exec(prodTbl);
        const priceTbl = "CREATE TABLE unitprice(\n\
            ID         INTEGER PRIMARY KEY AUTOINCREMENT,\n\
            COMP_ID    INTEGER NOT NULL,\n\
            PROD_ID    INTEGER NOT NULL,\n\
            UNIT_PRICE REAL  NOT NULL);";
        this.db.exec(priceTbl);
        const formTbl = "CREATE TABLE form(\n\
            ID       INTEGER PRIMARY KEY AUTOINCREMENT,\n\
            NAME     TEXT    NOT NULL,\n\
            HIDE     BOOLEAN NOT NULL DEFAULT 0,\n\
            QUANTITY INTEGER NOT NULL DEFAULT 0,\n\
            SUM      INTEGER NOT NULL DEFAULT 0,\n\
            UNIQUE(NAME));";
        this.db.exec(formTbl);
        const recordTbl = "CREATE TABLE record(\n\
            ID           INTEGER  PRIMARY KEY AUTOINCREMENT,\n\
            COMP_ID      INTEGER  NOT NULL,\n\
            PROD_ID      INTEGER  NOT NULL,\n\
            FORM_ID      INTEGER  NOT NULL,\n\
            CREATED_DATE DATETIME NOT NULL,\n\
            DELIVER_DATE DATETIME NOT NULL,\n\
            UNIT_PRICE   REAL     NOT NULL,\n\
            QUANTITY     INTEGER  NOT NULL,\n\
            NOTE         TEXT     NOT NULL DEFAULT '',\n\
            HIDE  BOOLEAN NOT NULL DEFAULT 0);";
        this.db.exec(recordTbl);
        const userVersion = "PRAGMA user_version=2;";
        this.db.exec(userVersion);
    }
};

class DbManager {
    constructor(options) {
        if(typeof options === "undefined") {
            const arg = process.argv.filter(p => p.indexOf("dbPath:") >= 0)[0];
            const dbPath = arg.substr(arg.indexOf(":") + 1);
            options = {
                path: dbPath,
            };
        }
        const dbPath = path.join(options.path, "data.db");
        try {
            fs.accessSync(dbPath, fs.constants.R_OK);
        } catch (err) {
            // creating fake db
            const fakeDb = new FakeDb(dbPath);
        }

        this.db = Sqlite3(dbPath);
    }
    dbMigration(importDbPath) {
        function getHideVal(obj) {
            if(obj.HIDE){
                if(obj.HIDE === "0") return 0;
                if(obj.HIDE === "1") return 1;
                return obj.toLowerCase()=="false"?0:1;
            }
            return 0;
        }
        const source = Sqlite3(importDbPath);
        const compList = source.prepare('SELECT * FROM company').all().map(function(obj){
            var rObj = {
                id: obj.ID,
                name : obj.NAME,
                hide: getHideVal(obj.HIDE),
                printtax: obj.PRINTTAX?obj.PRINTTAX:0,
                address: obj.ADDRESS?obj.ADDRESS:"",
                phone: obj.PHONE?obj.PHONE:"",
                contact: obj.CONTACT?obj.CONTACT:"",
                businessnum: obj.BUSINESSNUM?obj.BUSINESSNUM:"",
                note: obj.NOTE?obj.NOTE:"",
                internal: obj.INTERNAL?obj.INTERNAL:"",
            }
            return rObj;
        });
        this.handleCompanyChangeRequest(compList);
        const prodList = source.prepare('SELECT * FROM product').all().map(function(obj){
            var rObj = {
                id: obj.ID,
                name : obj.NAME,
                hide : getHideVal(obj.HIDE),
                type : obj.TYPE?obj.TYPE:0,
                group_id: obj.GROUP_ID?obj.GROUP_ID:0,
            }
            return rObj;
        })
        this.handleProductChangeRequest(prodList);
        const priceList = source.prepare('SELECT * FROM unitprice').all().map(function(obj){
            var rObj = {
                id: 0, // 0 means insertion
                comp_id: obj.COMP_ID,
                prod_id: obj.PROD_ID,
                unit_price: obj.UNIT_PRICE,
            }
            return rObj;
        })
        this.handlePriceChangeRequest(priceList);
        const formList = source.prepare('SELECT * FROM form').all().map(function(obj){
            var rObj = {
                id: obj.ID,
                name: obj.NAME,
                hide: obj.HIDE,
                quantity: obj.QUANTITY?obj.QUANTITY:0,
                sum: obj.SUM?obj.SUM:0,
            }
            return rObj;
        })
        this.handleFormChangeRequest(formList);
        this.handleFormSummary(formList);
        const recordList = source.prepare('SELECT * FROM record').all().map(function(obj){
            var rObj = {
                id: 0, // 0 means insertion
                comp_id: obj.COMP_ID,
                prod_id: obj.PROD_ID,
                form_id: obj.FORM_ID,
                created_date: obj.CREATED_DATE,
                deliver_date: obj.DELIVER_DATE,
                unit_price: obj.UNIT_PRICE,
                quantity: obj.QUANTITY,
                note: obj.NOTE?obj.NOTE:"",
                hide: getHideVal(obj.HIDE),
            }
            return rObj;
        });
        this.handleRecordChangeRequest(recordList);
    }
    listCompany() {
        const row = this.db.prepare('SELECT * FROM company').all();
        return row;
    }
    getCompany(id) {
        const row = this.db.prepare('SELECT * FROM company WHERE id = ?').get(id);
        return row;
    }
    addCompany(compList) {
        const insert = this.db.prepare('INSERT INTO company (name) VALUES (@name);');
        const insertMany = this.db.transaction((compList) => {
            for (const comp of compList) insert.run(comp);
          });
        insertMany(compList);
    }
    updateCompany(compList) {
        const update = this.db.prepare('UPDATE company SET \
            name = (@name), printtax = (@printtax), businessnum = (@businessnum), address = (@address),\
            phone = (@phone), contact = (@contact), note = (@note), hide = (@hide) WHERE id = (@id);');
        const updateMany = this.db.transaction((compList) => {
            for (const comp of compList) update.run(comp);
        });
        updateMany(compList);
    }
    handleCompanyChangeRequest(compList) {
        const DbCompList = this.listCompany();
        const insertList = compList.filter(function(obj){
            if(DbCompList.length < obj.id) return true;
            return false;
        });
        this.addCompany(insertList);
        this.updateCompany(compList);
    }
    listProduct() {
        const row = this.db.prepare('SELECT * FROM product').all();
        return row;
    }
    getProduct(id) {
        const row = this.db.prepare('SELECT * FROM product WHERE id = ?').get(id);
        return row;
    }
    addProduct(prodList) {
        const insert = this.db.prepare('INSERT INTO product (name) VALUES (@name);');
        const insertMany = this.db.transaction((prodList) => {
            for (const prod of prodList) insert.run(prod);
          });
        insertMany(prodList);
    }
    updateProduct(prodList) {
        const update = this.db.prepare('UPDATE product SET name = (@name), hide = (@hide), type = (@type), group_id = (@group_id) WHERE id = (@id);');
        const updateMany = this.db.transaction((prodList) => {
            for (const prod of prodList) update.run(prod);
        });
        updateMany(prodList);
    }
    handleProductChangeRequest(prodList) {
        const DbProdList = this.listProduct();
        const insertList = prodList.filter(function(obj){
            if(DbProdList.length < obj.id) return true;
            return false;
        });
        this.addProduct(insertList);
        this.updateProduct(prodList);
    }
    listPrice() {
        const row = this.db.prepare('SELECT * FROM unitprice').all();
        return row;
    }
    addPrice(priceList) {
        const insert = this.db.prepare('INSERT INTO unitprice (comp_id, prod_id, unit_price) VALUES (@comp_id, @prod_id, @unit_price);');
        const insertMany = this.db.transaction((priceList) => {
            for (const price of priceList) insert.run(price);
          });
        insertMany(priceList);
    }
    updatePrice(priceList) {
        const update = this.db.prepare('UPDATE unitprice SET unit_price = (@unit_price) WHERE comp_id = (@comp_id) AND prod_id = (@prod_id);');
        const updateMany = this.db.transaction((priceList) => {
            for (const price of priceList) update.run(price);
        });
        updateMany(priceList);
    }
    handlePriceChangeRequest(priceList) {
        const insertList = priceList.filter(function(obj){
            if(obj.id == 0) return true;
            return false;
        });
        this.addPrice(insertList);
        this.updatePrice(priceList);
    }
    listForm() {
        const row = this.db.prepare('SELECT * FROM form').all();
        return row;
    }
    getForm(id) {
        const row = this.db.prepare('SELECT * FROM form WHERE id = ?').get(id);
        return row;
    }
    addForm(formList) {
        const insert = this.db.prepare('INSERT INTO form (name, hide) VALUES (@name, @hide);');
        const insertMany = this.db.transaction((formList) => {
            for (const form of formList) insert.run(form);
          });
        insertMany(formList);
    }
    updateForm(formList) {
        const update = this.db.prepare('UPDATE form SET name = (@name) WHERE id = (@id);');
        const updateMany = this.db.transaction((formList) => {
            for (const form of formList) update.run(form);
        });
        updateMany(formList);
    }
    handleFormChangeRequest(formList) {
        const DbFormList = this.listForm();
        const insertList = formList.filter(function(obj){
            if(DbFormList.length < obj.id) return true;
            return false;
        });
        this.addForm(insertList);
        this.updateForm(formList);
    }
    handleFormSummary(formList) {
        const update = this.db.prepare('UPDATE form SET quantity = (@quantity), sum = (@sum) WHERE id = (@id);');
        const updateMany = this.db.transaction((formList) => {
            for (const form of formList) update.run(form);
        });
        updateMany(formList);
    }
    listRecord(formId) {
        const row = this.db.prepare('SELECT * FROM record WHERE form_id = ?').all(formId);
        return row;
    }
    addRecord(recordList) {
        const insert = this.db.prepare('INSERT INTO record \
        ( comp_id,  prod_id,  form_id,  created_date,  deliver_date,  unit_price,  quantity,  note,  hide) VALUES \
        (@comp_id, @prod_id, @form_id, @created_date, @deliver_date, @unit_price, @quantity, @note, @hide);');
        const insertMany = this.db.transaction((recordList) => {
            for (const record of recordList) insert.run(record);
          });
        insertMany(recordList);
    }
    updateRecord(recordList) {
        const update = this.db.prepare('UPDATE record SET\
            comp_id = (@comp_id), prod_id = (@prod_id), form_id = (@form_id),\
            created_date = (@created_date), deliver_date = (@deliver_date),\
            unit_price = (@unit_price), quantity = (@quantity), note = (@note),\
            hide = (@hide) WHERE id = (@id);');
        const updateMany = this.db.transaction((recordList) => {
            for (const record of recordList) update.run(record);
        });
        updateMany(recordList);
    }
    handleRecordChangeRequest(recordList) {
        const insertList = recordList.filter(function(obj){
            if(obj.id == 0) return true;
            return false;
        });
        this.addRecord(insertList);
        const updateList = recordList.filter(function(obj){
            if(obj.id != 0) return true;
            return false;
        });
        this.updateRecord(updateList);
    }
    getDBUserVersion() {
        const version = this.db.pragma('user_version', { simple: true});
        return version;
    }
}

module.exports = { DbManager };