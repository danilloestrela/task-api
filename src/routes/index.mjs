import Router from '../utils/Router.mjs';
import taskRoutes from './tasks.mjs';

const router = new Router();

router.use('tasks', taskRoutes);

export default router.routes;
