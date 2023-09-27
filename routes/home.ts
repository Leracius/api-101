import { Router } from "express";
import { getComments, gethome, postComments } from "../controllers/controller";

const router = Router()

router.get('/', [
    
] ,gethome)

router.post('/comments',[

], postComments)

router.get('/comments',[

], getComments)

export default router