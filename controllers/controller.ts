import { Request, Response } from "express";

export const gethome = async(req : Request, res: Response) =>{
    const data = req.body 
    res.json({
        msg : "holis",
        data
    });
}