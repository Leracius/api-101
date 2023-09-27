import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import User, { IUser } from "../models/auth";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring"
import { genJWT } from "../helpers/genJWT";

export const register = async(req: Request, res: Response) =>{
    const {nombre, email, password, rol }: IUser = req.body

    const user = new User({nombre, email, password, rol})

    const salt = bcryptjs.genSaltSync()

    user.password = bcryptjs.hashSync(password, salt)

    const adminKey = req.headers["admin-key"]

    
    if(adminKey === process.env.KEY_FOR_ADMIN){
        user.rol = ROLES.admin
    }

    const newCode = randomstring.generate(6)

    user.code = newCode

    await user.save()

    res.status(201).json({ 
        user
    })

}

export const login = async(req: Request, res: Response) =>{
    const {email, password}: IUser = req.body
    
    try {
        const user = await User.findOne({email})

        if(!user){
            res.status(404).json({
                msg: "No se encontro el mail en la bd"
            })
            return
        }
        const validPass = bcryptjs.compareSync(password, user.password)
        if(!validPass){
            res.status(404).json({
                msg: "La contraseña es incorrecta"
            })
        }

        const token = await genJWT(user.id)

        res.status(202).json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        })
        
    }

}