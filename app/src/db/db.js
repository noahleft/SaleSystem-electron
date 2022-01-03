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
    listProduct() {
        const row = this.db.prepare('SELECT * FROM product').all();
        return row;
    }
    getProduct(id) {
        const row = this.db.prepare('SELECT * FROM product WHERE id = ?').get(id);
        return row;
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