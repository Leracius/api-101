import { Router } from "express";
import { getComments, gethome, incrementarMg, postComments } from "../controllers/controller";

const router = Router()

router.get('/', [
    
] ,gethome)

router.patch('/comments', [
    
] ,incrementarMg);

router.post('/comments',[

], postComments)

router.get('/comments',[

], getComments)

export default router