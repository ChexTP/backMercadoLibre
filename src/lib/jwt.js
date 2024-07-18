import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const TOKEN=process.env.TOKEN_SECRET


export function createAccesToken(payload){

    return new Promise((resolve,reject)=>{
        jwt.sign(
            payload,
            TOKEN,
            {
                expiresIn:"1h"
            },
            (err,token)=>{
                if (err) reject(err)
                resolve(token)
            }
        )
    })

}