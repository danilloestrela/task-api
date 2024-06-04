import { randomUUID } from 'node:crypto'
import Database from '../database/index.mjs';

class TaskController {
    #tableName = 'tasks'

    constructor() {
        this.createTask = this.createTask.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
    }
    
    async createTask(req, res) {
        const { title, description } = req.body

        if(!title || !description) return res.writeHead(400).end(JSON.stringify({ message: 'Title and Description must be provided'}));
        
        const task = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            updated_at: null,
            created_at: new Date().toISOString()
        }
        
        Database.insert(this.#tableName, task)
        
        return res.writeHead(201).end()
    }

    async getTasks(req, res) {
        const { title, description } = req.query

        const searchQuery = {
            title: title ?? null,
            description: description ?? null
        }

        const tasks = Database.select(this.#tableName, searchQuery);
        
        // early return strategy
        return res.end(JSON.stringify(tasks))
    }

    async updateTask(req, res) {
        const { id } = req.params
        const { title, description } = req.body
        if(!id) return res.writeHead(400).end(JSON.stringify({ message: 'You need to specify the task to be able to update.' }))
        if(!title && !description) return res.writeHead(400).end(JSON.stringify({ message: 'Title or Description must be provided.'}));
        
        const hasResults = Database.select(this.#tableName, { id });
        if(hasResults.length <= 0) return res.writeHead(400).end(JSON.stringify({ message: 'Task not found'}))
        Database.update(this.#tableName, id, { ...req.body, updated_at: new Date().toISOString() });
        
        return res.writeHead(204).end()
    }

    async deleteTask(req, res) {
        const { id } = req.params
        if(!id) return res.writeHead(400).end(JSON.stringify({ message: 'You need to specify the task to be able to delete.' }))
        
        const hasResults = Database.select(this.#tableName, { id });
        if(hasResults.length <= 0) return res.writeHead(400).end(JSON.stringify({ message: 'Task not found'})) 
                
        Database.delete(this.#tableName, id);
        return res.writeHead(204).end()
    }

    async completeTask(req, res) {
        const { id } = req.params
        console.log(id)
        if(!id) return res.writeHead(400).end(JSON.stringify({ message: 'You need to specify the task to be able to update.' }))
        
        const hasResults = Database.select(this.#tableName, { id });
        if(hasResults.length <= 0) return res.writeHead(400).end(JSON.stringify({ message: 'Task not found'})) 
        
        Database.update(this.#tableName, id, { updated_at: new Date().toISOString(), completed_at: new Date().toISOString()  });
        return res.writeHead(204).end()
    }

}

export default new TaskController()