const db = require('../utils/database');

module.exports = class Message {
    constructor(id, message) {
        this.id = id;
        this.message = message;
    }

    static save() {
        return db.execute('INSERT INTO messages (id, message) VALUES (?)', [this.id, this.message]);
    }

    static deleteById(id) {

    }

    static fetchAll() {
        return db.execute('SELECT * FROM messages');
    }

    static findById(id) {

    }
}