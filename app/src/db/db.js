const Sqlite3 = require('better-sqlite3');

class DbManager {
    constructor() {
        this.db = Sqlite3("sample.db");
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
        const insert = this.db.prepare('INSERT INTO company (name, hide) VALUES (@name, @hide);');
        const insertMany = this.db.transaction((compList) => {
            for (const comp of compList) insert.run(comp);
          });
        insertMany(compList);
    }
    updateCompany(compList) {
        const update = this.db.prepare('UPDATE company SET name = (@name) WHERE id = (@id);');
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
        const insert = this.db.prepare('INSERT INTO product (name, hide) VALUES (@name, @hide);');
        const insertMany = this.db.transaction((prodList) => {
            for (const prod of prodList) insert.run(prod);
          });
        insertMany(prodList);
    }
    updateProduct(prodList) {
        const update = this.db.prepare('UPDATE product SET name = (@name) WHERE id = (@id);');
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
    listForm() {
        const row = this.db.prepare('SELECT * FROM form').all();
        return row;
    }
    getForm(id) {
        const row = this.db.prepare('SELECT * FROM form WHERE id = ?').get(id);
        return row;
    }
    listRecord(formId) {
        const row = this.db.prepare('SELECT * FROM record WHERE form_id = ?').all(formId);
        return row;
    }
}

const manager = new DbManager();
module.exports = manager;