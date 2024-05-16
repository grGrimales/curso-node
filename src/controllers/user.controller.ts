import { Request, Response } from "express";
import { User } from "../data/mongo/models/user.models";

import { hashSync, compareSync } from 'bcryptjs';
import { generateJWT } from "../commons/jwt";



export class UserController {

    // ID
    constructor() {

    }


    // REGISTER - LOGIN
    async register(req: Request, res: Response) {

        try {

            // Variables del body
            const { username, email, password } = req.body;


            // Validar que los campos no esten vacios

            const erros = [];
            if (!username) erros.push('username is required');
            if (!email) erros.push('email is required');
            if (!password) erros.push('password is required');

            if (erros.length > 0) {
                return res.status(400).json({
                    ok: false,
                    message: erros
                });
            }

            // Validar que el email sea unico
            const existUser = await User.findOne({ email });
            if (existUser) {
                return res.status(400).json({
                    ok: false,
                    message: 'email already exists'
                });
            }


            // Crear un nuevo usuario
            const user = new User({ username, email, password });

            // Encriptar la contraseña
            user.password = hashSync(password, 10);

            await user.save();

            // Borrar password del user
            const userResponse = {
                email: user.email,
                username: user.username,
                role: user.role,
                password: user.password
            }

            const token = await generateJWT(
                { email: user.email, username: user.username},
                '1h');

            return res.json({
                ok: true,
                message: 'register success',
                user: userResponse,
                token
            });


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'internal server error'
            });

        }
    }


    async login(req: Request, res: Response) {

        // Variables del body
        const { email, password } = req.body;

        // Validar que los campos no esten vacios
        const erros = [];

        if (!email) erros.push('email is required');
        if (!password) erros.push('password is required');


        if (erros.length > 0) {
            return res.status(400).json({
                ok: false,
                message: erros
            });
        }


        // Buscamos el usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'email or password incorrect #### EMAIL'
            });
        }

        // Validar la contraseña
        if (!compareSync(password, user.password) ) {
            return res.status(400).json({
                ok: false,
                message: 'email or password incorrect #### PASSWORD'
            });
        }


        // Borrar password del user
        const userResponse = {
            email: user.email,
            username: user.username,
            role: user.role
        }

        const token = await generateJWT(
            { email: user.email, username: user.username},
            '1h');


        return res.json({
            ok: true,
            message: 'login success',
            user: userResponse,
            token
        });

    }



}