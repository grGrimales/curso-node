import jwt from 'jsonwebtoken';



export const generateJWT = async (payload: any, duration: string = '1h') => {
   
    return new Promise((resolve) => {

        jwt.sign(payload, "my_secret", {expiresIn: duration}, (error, token) => {

            if (error) {
                console.log(error);
                resolve(null);
            }
            resolve(token);
        } )
    });
}