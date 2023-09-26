import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import User, { IUser } from "../models/auth";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring"

export const register = async(req: Request, res: Response) =>{
    const {nombre, email, password, rol }: IUser = req.body

    const user = new User({nombre, email, password})

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