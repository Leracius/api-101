import { Request, Response } from "express";
import Comment, { TComment } from "../models/coment";

export const gethome = async(req : Request, res: Response) =>{
    const data = req.body 
    res.status(200).json({
        msg : "Home de api 101",
        timestamp: new Date().toLocaleString(),
 
    });
}

export const postComments = async(req : Request, res: Response) =>{
    const commentData: TComment = req.body

    const comment = new Comment(commentData)

    await comment.save()
    
    res.status(200).json({
        msg : "Se guardo tu comentario, saludos desde el back!",
        timestamp: new Date().toLocaleString(),
    });
}

export const getComments = async (req: Request, res: Response) => {
    try {
      const comments = await Comment.find({}).select('-_id -__v');
  
      res.json({
        msg: "Estos son los comentarios, saludos desde el back!",
        timestamp: new Date().toLocaleString(),
        comments
      });
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
      res.status(500).json({ error: "Error al obtener los comentarios" });
    }
  };

  export const incrementarMg = async (req: Request, res: Response) => {
    try {
      const { nombre, msg, createdAt } = req.body;
  
      const comentario = await Comment.findOne({ nombre, msg, createdAt });
  
      if (!comentario) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }
  
      if (comentario.mg !== undefined) {
        comentario.mg += 1;
      } else {
        console.error("La propiedad 'mg' no está definida en el comentario:", comentario);
        return res.status(500).json({ error: "Error al incrementar 'mg'" });
      }
  
      await comentario.save();
  
      res.json({
        msg: "Propiedad 'mg' incrementada exitosamente",
        timestamp: new Date().toLocaleString(),
        comentario,
      });
    } catch (error) {
      console.error("Error al incrementar 'mg':", error);
      res.status(500).json({ error: "Error al incrementar 'mg'" });
    }
  };