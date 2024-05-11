import { Router } from "express";
import { UserController } from "../controllers/user.controller";



export class UserRoutes {



    static get rotues() : Router {

        const router = Router();
        const userController = new UserController();
        
        router.post("/register", userController.register );
        router.post("/login", userController.login );


        return router;

    }
}