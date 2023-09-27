import { model, Model, Schema } from "mongoose"

export interface TComment{
    nombre : string,
    msg: string,
    createdAt: Date,
    mg?: number
}

const ComScheema = new Schema<TComment>({
    nombre: {
        type: String,
        required: [true, "El nombre es obligario"]
    },
    msg: {
        type: String,
        required: [true, "El msg es obligatorio"]
    },
    mg: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Comment: Model<TComment> = model<TComment>("Comments", ComScheema);

export default Comment;