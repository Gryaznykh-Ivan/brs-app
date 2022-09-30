import Router from 'koa-router'
import adminController from '../controllers/admin'
import groupController from '../controllers/group'
import roleFilter from '../middlewares/roleFilter';
import { UserRoles } from '../types/requestTypes';

const router = new Router();

// users page routes
router.put("/createUser", roleFilter([UserRoles.ADMIN]), adminController.createUser);
router.post("/changeUserSettings/:id", roleFilter([UserRoles.ADMIN]), adminController.changeUserSettings);
router.delete("/removeUser/:id", roleFilter([UserRoles.ADMIN]), adminController.removeUser);

// group page routes
router.get("/group/search", roleFilter([UserRoles.ADMIN]), groupController.getGroupsBySearch);
router.put("/group/:id/addStudentToGroup", roleFilter([UserRoles.HEADMAN, UserRoles.ADMIN]), groupController.addStudentToGroup);
router.get("/group/:id/removeStudentFromGroup", roleFilter([UserRoles.HEADMAN, UserRoles.ADMIN]), groupController.removeStudentFromGroup);
router.get("/group/:id/change", roleFilter([UserRoles.ADMIN]), groupController.changeGroupSettings);
router.delete("/group/:id/remove", roleFilter([UserRoles.ADMIN]), groupController.removeGroup);

export default router.routes();