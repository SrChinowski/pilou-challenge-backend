import { BloodTypes } from "src/schemas/user.schema";

export class newUserDto {
    username: String;
    name: String;
    last_name: String;
    emergency_contact: {
        name: String;
        phone: String
    };
    blood_type?: BloodTypes;
    password: String;
}