import fs from 'node:fs/promises'

const databasePath = new URL('../../db.json', import.meta.url)

export class JsonDatabase {
    #database = {}

    constructor () {
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data)
            console.log(this.#database)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        console.log(this.#database)
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, search) {
        let data = this.#database[table] ?? [];
        let canISearch = false;
        if(data.length > 0 && search && Object.entries(search).length > 0) {
            canISearch = Object.entries(search).reduce((acc, searchItem) => {
                if(searchItem[1]) return true;
                return acc
            }, false);
        }
        
        if(canISearch) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    if(value) return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
         }

        return data
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            console.log(table)
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist();

        return data
    }

    
    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);
        if (rowIndex > -1) {
            this.#database[table][rowIndex] = {...this.#database[table][rowIndex], ...data};
            this.#persist();
        } 
        return rowIndex > -1;
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);
        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
        return rowIndex > -1;
    }
}