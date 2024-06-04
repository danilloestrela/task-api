import http from 'node:http'
import { bodyToJson } from './middlewares/bodyToJsonMiddleware.mjs';
import { extractQueryParams } from './utils/extractQueryParams.mjs';
import routes from './routes/index.mjs';
class App {
    #middlewares = []
    constructor() {
        this.server = http.createServer(this.#handleCreateServer.bind(this))
        this.use(bodyToJson);
    }

    use(middleware) {
        this.#middlewares.push(middleware);
    }

    async #handleCreateServer(req, res) {
        const { method } = req
    
        for (const middleware of this.#middlewares) {
            await middleware(req, res);
        }

        const route = routes.find(route => {
            return route.method === method && route.pathname.test(req.url)
        })

    
        if(route) {
            const routeParams = req.url.match(route.pathname)
            
            const { query, ...params } = routeParams?.groups
            req.params = params ? params : {}
            req.query = query ? extractQueryParams(query) : {}
            
            return route.handler(req, res);
        }
        
        return res.writeHead(404).end()
    }
}

export default new App();