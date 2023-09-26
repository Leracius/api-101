import { model, Model, Schema } from "mongoose"
import { ROLES } from "../helpers/constants";

export interface IUser {
    nombre: string,
    email: string,
    password: string,
    rol?: string,
    code?: string,
    verified?: boolean
};

const UserScheema = new Schema<IUser>({
    nombre: {
        type: String,
        required: [true, "El nombre es obligario"]
    },
    email: {
        type: String,
        required: [true, "El email es obligario"]
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio"]
    },
    rol: {
        type: String,
        default: ROLES.user
    },
    code: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
});

UserScheema.methods.toJSON = function(){
    const{__V, password, _id, code, ...usuario} = this.toObject()
    return usuario
}

const User: Model<IUser> = model<IUser>("User", UserScheema);

export default User