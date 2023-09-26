import { Router } from "express";
import { register } from "../controllers/auth";
import { check } from "express-validator"
import { colectErrors } from "../middlewares/colectErrors";

const router = Router()

router.get("/register", (req, res) =>{
    res.json({
        "msg" : "holis"
    })
})


router.post("/register",[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
        min: 6
    }),
    colectErrors
], register)

export default router