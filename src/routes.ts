import {Router} from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagCrontroller } from "./controllers/CreateTagController";
import { CreateUserCrontroller } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserCrontroller = new CreateUserCrontroller();
const createTagController = new CreateTagCrontroller();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

router.post("/users", createUserCrontroller.handle)

router.post("/tags", ensureAdmin, createTagController.handle) // ("path", middleware(n), controller)

router.post("/session", authenticateUserController.handle)

router.post('/compliments', createComplimentController.handle)

export {router}