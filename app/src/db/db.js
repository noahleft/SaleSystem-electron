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
    listProduct() {
        const row = this.db.prepare('SELECT * FROM product').all();
        return row;
    }
    getProduct(id) {
        const row = this.db.prepare('SELECT * FROM product WHERE id = ?').get(id);
        return row;
    }
    listPrice(compId, prodId) {
        if(compId != 0 && prodId != 0) {
            const row = this.db.prepare('SELECT * FROM unitprice WHERE COMP_ID = ? AND PROD_ID = ?').all(compId, prodId);
            return row;
        }
        if(compId != 0) {
            const row = this.db.prepare('SELECT * FROM unitprice WHERE COMP_ID = ? ').all(compId);
            return row;
        }
        if(prodId != 0) {
            const row = this.db.prepare('SELECT * FROM unitprice WHERE PROD_ID = ? ').all(prodId);
            return row;
        }
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