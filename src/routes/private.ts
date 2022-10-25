import Router from 'koa-router'
import adminController from '../controllers/admin'
import groupController from '../controllers/group'
import subjectController from '../controllers/subject'
import tableController from '../controllers/table'
import roleFilter from '../middlewares/roleFilter';
import { UserRoles } from '../types/requestTypes';

const router = new Router();

// users page routes
router.put("/createUser", roleFilter([UserRoles.ADMIN]), adminController.createUser);
router.post("/changeUserSettings/:id", roleFilter([UserRoles.ADMIN]), adminController.changeUserSettings);
router.delete("/removeUser/:id", roleFilter([UserRoles.ADMIN]), adminController.removeUser);

// group page routes
router.get("/group/search", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), groupController.getGroupsBySearch);
router.get("/group/getUserGroup", groupController.getUserGroup);
router.put("/group/create", roleFilter([UserRoles.ADMIN]), groupController.createGroup)
router.get("/group/:id", groupController.getGroupById);
router.post("/group/:id/addStudentToGroup", roleFilter([UserRoles.HEADMAN, UserRoles.ADMIN, UserRoles.HEADMAN]), groupController.addStudentToGroup);
router.post("/group/:id/removeStudentFromGroup", roleFilter([UserRoles.HEADMAN, UserRoles.ADMIN, UserRoles.HEADMAN]), groupController.removeStudentFromGroup);
router.post("/group/:id/change", roleFilter([UserRoles.ADMIN]), groupController.changeGroupSettings);
router.delete("/group/:id/remove", roleFilter([UserRoles.ADMIN]), groupController.removeGroup);

// subject page routes
router.get("/subject/search", subjectController.getSubjectBySearch)
router.put("/subject/create", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), subjectController.createSubject)
router.get("/subject/:id", subjectController.getSubjectById)
router.post("/subject/:id/addGroupToSubject", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), subjectController.addGroupToSubject)
router.post("/subject/:id/removeGroupFromSubject", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), subjectController.removeGroupFromSubject)
router.post("/subject/:id/change", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), subjectController.changeSubjectSettings)
router.delete("/subject/:id/remove", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), subjectController.removeSubject)

// table page routes
router.put("/table/create", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), tableController.createTable)
router.get("/table/getNames", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), tableController.getTableNames)
router.get("/table/:id", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), tableController.getTableById)
router.put("/table/:id/setMark", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), tableController.setMark)
router.put("/table/:id/addColumn", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), tableController.addColumn)
router.post("/table/:id/changeColumn", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), tableController.changeColumnName)
router.delete("/table/:id/remove", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), tableController.removeTable)
router.delete("/table/:id/removeColumn", roleFilter([UserRoles.ADMIN, UserRoles.TEACHER]), tableController.removeColumn)

export default router.routes();