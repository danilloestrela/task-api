import { JsonDatabase } from './jsonDatabase.mjs';
import { databaseConfig } from '../config/database.mjs';

class Database {
    constructor(type) {
        switch (type) {
            case 'json':
                this.db = new JsonDatabase();
                break;
            // Outros tipos de banco de dados podem ser adicionados aqui
            default:
                throw new Error(`Unknown database type: ${type}`);
        }
    }

    select(table, search) {
        return this.db.select(table, search);
    }

    insert(table, data) {
        return this.db.insert(table, data);
    }

    update(table, id, data) {
        return this.db.update(table, id, data);
    }

    delete(table, id) {
        return this.db.delete(table, id);
    }
}

export default new Database(databaseConfig.type);
