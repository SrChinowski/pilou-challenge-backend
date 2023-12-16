import { ObjectId } from "mongoose";
import { BloodTypes } from "src/schemas/user.schema";

export class updateUserDto {
    _id: ObjectId;
    username: String;
    name?: String;
    last_name?: String;
    emergency_contact?: {
        name: String;
        phone: String
    };
    blood_type?: BloodTypes;
    password?: String;
}