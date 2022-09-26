import Router from 'koa-router'
import userController from '../controllers/user'
import roleFilter from '../middlewares/roleFilter';

const router = new Router();

// An instance of using roleFilter on specific route
// router.get("/user/:id", roleFilter("ADMIN"), userController.getById); 

// UserController
router.get("/user/:id", userController.getById);
router.get("/user/search", userController.getByName);



export default router.routes();