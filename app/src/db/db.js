const Sqlite3 = require('better-sqlite3');

class DbManager {
    open() {
        console.log("open db");
    }
    close() {
        console.log("close db");
    }
}

const manager = new DbManager();
module.exports = manager;