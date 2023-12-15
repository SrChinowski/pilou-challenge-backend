import { Schema } from "mongoose";

export enum BloodTypes {
    A_POSITIVE = "A+",
    A_NEGATIVE = "A-",
    B_POSITIVE = "B+",
    B_NEGATIVE = "B-",
    AB_POSITIVE = "AB+",
    AB_NEGATIVE = "AB-",
    O_POSITIVE = "O+",
    O_NEGATIVE = "O-"
}

export interface UserI extends Document {
    readonly username: String;
    readonly name: String;
    readonly last_name: String;
    readonly emergency_contact: {
        readonly name: String;
        readonly phone: String
    };
    readonly blood_type?: BloodTypes;
    readonly active: Boolean; 
    readonly created_at?: Date; 
    readonly metadata?: {}
}

export const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, '[ UserSchema ] - username is required'],
    },
    name: {
        type: String,
        required: [true, '[ UserSchema ] - name is required'],
    },
    last_name: {
        type: String,
        required: [true, '[ UserSchema ] - last_name is required'],
    },
    emergency_contact: {
        name: {
            type: String,
            required: [true, '[ UserSchema ] - emergency_contact.name is required'],
        },
        phone: {
            type: String,
            required: [true, '[ UserSchema ] - emergency_contact.phone is required'],
        }
    },
    blood_type: {
        type: String,
        enum: BloodTypes,
        required: false,
    },
    active: {
        type: Boolean,
        default: true,
        required: true,
    }, 
    created_at: {
        default: Date.now,
        type: Schema.Types.Date,
        required: true,
    }, 
    metadata : {
        type: Object, 
        default: { },
    }
});