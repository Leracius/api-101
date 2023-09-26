import mongoose from "mongoose"

export const dbconection = async(): Promise<void> =>{
    try{
        const dbURL = process.env.DB_URL
        if(!dbURL){
            throw new Error("La URL no esta correctamente definida en los .env")
        }
        await mongoose.connect(dbURL)
        console.log("base conectada");
        
    }
    catch(error){
        console.log(error);
        throw new Error("Error a la hora de conectar a la DB")
    }
};