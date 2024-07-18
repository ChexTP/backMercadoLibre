import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {createAccesToken} from '../lib/jwt.js'
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

dotenv.config()

const TOKEN_SECRET = process.env.TOKEN_SECRET

export const register = async (req,res)=> {

    const {
        name,
        document,
        password,
        email,
        birthday,
        gender,
        phone,
    }=req.body

    console.log(name,document,password,email,birthday,gender,phone);

    const image = req.file ? req.file.path : null;

    try {

        const passwordHash = await bcrypt.hash(password, 10)
        
        const newUser = new User({
            name,
            document,
            password:passwordHash,
            email,
            birthday,
            gender,
            phone,
            image
        })

        const userSaved=await newUser.save()

        const token= await createAccesToken({id:userSaved._id})
        res.cookie("token",token)

        res.json({
            id:userSaved._id,
            name:userSaved.name,
            document:userSaved.document,
            email:userSaved.email,
            birthday:userSaved.birthday,
            gender:userSaved.gender,
            phone:userSaved.phone,
            image:userSaved.image
        })

    } catch (error) {
        res.status(500).json({message:error.message})
    }


}

export const login = async (req,res)=> {
     
    // traer los datos desde el body de la peticion
    const {email,password} = req.body

    try {
        //buscar el ususario por email
        const userFound = await User.findOne({email})

        //verificar si el ususario existe o no en la DB
        if(!userFound) return res.status(400).json({message:"User not found"})

        //comparar contraseña de userFound con la ingresada
        const isMatch = await bcrypt.compare(password,userFound.password)

        if(!isMatch) return res.status(400).json({message:"Incorrect Password"})

        //creacion del token 
        const token= await createAccesToken({
            id:userFound._id,
        })
        res.cookie("token",token)
        
        // envio del json al cliente con los datos de ususario
        res.json({
            id:userFound._id,
            name:userFound.name,
            document:userFound.document,
            email:userFound.email,
            birthday:userFound.birthday,
            gender:userFound.gender,
            phone:userFound.phone,
            image:userFound.image


        })

    } catch (error) {
        res.status(500).json({message:error.message})
    }
        
    
}

export const logout =(req,res)=>{
    res.cookie("token","",{
        expires: new Date(0),
    })
    return res.sendStatus(200)
}   

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);
  
      return res.json({
        id:userFound._id,
        name:userFound.name,
        document:userFound.document,
        email:userFound.email,
        birthday:userFound.birthday,
        gender:userFound.gender,
        phone:userFound.phone,
        image:userFound.image
      });
    });
  };
  