import { buildRoutePath } from "./buildRoutePath.mjs";

class Router {
    routes = [];
    #methods = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        PATCH: 'PATCH',
    }

    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async use(pathname, routes) {
       const newRoutes = routes.map(route => {
            if(route.path !== '/') {
                route.pathname = buildRoutePath(`/${pathname}${route.path}`)
                route.path = `/${pathname}${route.path}`
            }
            if(route.path === '/') {
                route.pathname = buildRoutePath(`/${pathname}`)
                route.path = `/${pathname}`
            }
            return route;
        });
        this.routes = [...this.routes, ...newRoutes];
    }

    async get(pathname, callback) {
        this.routes.push({
            method: this.#methods.GET,
            pathname: buildRoutePath(pathname),
            path: pathname,
            handler: callback
        });
    }
    
    async post(pathname, callback) {
        this.routes.push({
            method: this.#methods.POST,
            pathname: buildRoutePath(pathname),
            path: pathname,
            handler: callback
        });
    }

    async put(pathname, callback) {
        this.routes.push({
            method: this.#methods.PUT,
            pathname: buildRoutePath(pathname),
            path: pathname,
            handler: callback
        });
    }

    async delete(pathname, callback) {
        this.routes.push({
            method: this.#methods.DELETE,
            pathname: buildRoutePath(pathname),
            path: pathname,
            handler: callback
        });
    }

    
    async patch(pathname, callback) {
        this.routes.push({
            method: this.#methods.PATCH,
            pathname: buildRoutePath(pathname),
            path: pathname,
            handler: callback
        });
    }
}

export default Router