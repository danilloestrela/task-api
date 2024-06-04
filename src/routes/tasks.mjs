import Router from '../utils/Router.mjs'
import TaskController from '../controllers/TaskController.mjs';


const tasksRoutes = new Router();


tasksRoutes.get('/', TaskController.getTasks);
tasksRoutes.post('/', TaskController.createTask);
tasksRoutes.put('/:id', TaskController.updateTask);
tasksRoutes.delete('/:id', TaskController.deleteTask);
tasksRoutes.patch('/:id/complete', TaskController.completeTask);

export default tasksRoutes.routes;