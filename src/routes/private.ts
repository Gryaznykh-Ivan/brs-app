import Router from 'koa-router'
import adminController from '../controllers/admin'
import groupController from '../controllers/group'
import subjectController from '../controllers/subject'
import roleFilter from '../middlewares/roleFilter';
import { UserRoles } from '../types/requestTypes';

const router = new Router();

// users page routes
router.put("/createUser", roleFilter([UserRoles.ADMIN]), adminController.createUser);
router.post("/changeUserSettings/:id", roleFilter([UserRoles.ADMIN]), adminController.changeUserSettings);
router.delete("/removeUser/:id", roleFilter([UserRoles.ADMIN]), adminController.removeUser);

// group page routes
router.get("/group/search", roleFilter([UserRoles.ADMIN]), groupController.getGroupsBySearch);
router.put("/group/create", roleFilter([UserRoles.ADMIN]), groupController.createGroup)
router.get("/group/:id", groupController.getGroupById);
router.post("/group/:id/addStudentToGroup", roleFilter([UserRoles.HEADMAN, UserRoles.ADMIN]), groupController.addStudentToGroup);
router.post("/group/:id/removeStudentFromGroup", roleFilter([UserRoles.HEADMAN, UserRoles.ADMIN]), groupController.removeStudentFromGroup);
router.post("/group/:id/change", roleFilter([UserRoles.ADMIN]), groupController.changeGroupSettings);
router.delete("/group/:id/remove", roleFilter([UserRoles.ADMIN]), groupController.removeGroup);

// subject page routes
router.get("/subject/search", roleFilter([UserRoles.ADMIN]), subjectController.getSubjectBySearch)
router.put("/subject/create", roleFilter([UserRoles.ADMIN]), subjectController.createSubject)
router.get("/subject/:id", roleFilter([UserRoles.ADMIN]), subjectController.getSubjectById)
router.post("/subject/:id/addGroupToSubject", roleFilter([UserRoles.ADMIN]), subjectController.addGroupToSubject)
router.post("/subject/:id/removeGroupFromSubject", roleFilter([UserRoles.ADMIN]), subjectController.removeGroupFromSubject)
router.post("/subject/:id/change", roleFilter([UserRoles.ADMIN]), subjectController.changeSubjectSettings)
router.delete("/subject/:id/remove", roleFilter([UserRoles.ADMIN]), subjectController.removeSubject)

export default router.routes();