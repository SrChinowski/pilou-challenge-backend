import { Schema } from "mongoose";

export interface AuthI extends Document {
    readonly user: Schema.Types.ObjectId; // Referencia al id de usuario
    readonly hash: string; // Contraseña encriptada con SHA256
    readonly created_at?: Date; 
    readonly metadata?: Record<string, any>; // Objeto para almacenar metadatos adicionales con estructura flexible
}

export const AuthSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true, '[ AuthSchema ] - user is required'],
        ref: 'User', // Referencia al modelo UserSchema
    },
    hash: {
        type: String,
        required: [true, '[ AuthSchema ] - hash is required'],
    },
    created_at: {
        default: Date.now,
        type: Schema.Types.Date,
        required: true,
    }, 
    metadata : {
        type: Schema.Types.Mixed, 
        default: { },
    }
})