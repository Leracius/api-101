import { Request, Response } from "express";

export const gethome = async(req : Request, res: Response) =>{
    const data = req.body 
    res.json({
        msg : "Home de api 101",
        timestamp: new Date().toLocaleString(),
        data
    });
}