import jwt from 'jsonwebtoken';

const secret = "my_secret"

export const generateJWT = async (payload: any, duration: string = '1h') => {
   
    return new Promise((resolve) => {

        jwt.sign(payload, secret, {expiresIn: duration}, (error, token) => {

            if (error) {
                console.log(error);
                resolve(null);
            }
            resolve(token);
        } )
    });
}


export const verifyJWT = async (token: string) => {


    return new Promise((resolve) => {

        jwt.verify(token, secret,


            (error, payload) => {
                if (error) {
                    console.log(error);
                    resolve(null);
                }
                resolve(payload);
            }
        )
    }
    )
}