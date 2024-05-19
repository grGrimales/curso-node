
import { Request , Response, NextFunction } from 'express';
import { verifyJWT } from '../commons/jwt';
import { User } from "../data/mongo/models/user.models";

export class AuthMiddleware {



    static async validateToken(req:Request, res:Response , next: NextFunction) {


        try {

        const token = req.header("x-token");

        if (!token) {
            return res.status(401).json({
                ok: false,
                message: "x-token is not provided"
            });
        }

        // Validar que el token sea correcto

        const payload: any = await verifyJWT(token);


        if(!payload) {
            return res.status(401).json({
                ok: false,
                message: "x-token is not valid"
            });

        }

        // Validar que el usuario exista
        const user = await User.findOne({email: payload.email});
        if(!user) {
            return res.status(401).json({
                ok: false,
                message: "user not found"
            });
        }
        next();
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: "Internal server error"
            });
            
        }





    }


}