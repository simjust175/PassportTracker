import RegisterControllers from '../controllers/registerControllers.js';
import express from 'express';

const route = express.Router();

route.post("/post", RegisterControllers.postNewUser);

route.post("/login", RegisterControllers.userLogin);

route.post("/logout/:user_id", RegisterControllers.userLogout);

route.post("/validateToken", RegisterControllers.validateLoggedInController)

export default route;