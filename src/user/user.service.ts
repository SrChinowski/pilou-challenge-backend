import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { UserI } from 'src/schemas/user.schema';
import { FindUserDto } from './dto/find-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { newUserDto } from './dto/new-user.dto';
import { AuthI } from 'src/schemas/auth.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserI>,

        @InjectModel('Auth')
        private readonly authModel: Model<AuthI>,
    ) {}

    // async create(createCatDto: CreateCatDto): Promise<UserI> {
    //     const createdCat = new this.userModel(createCatDto);
    //     return createdCat.save();
    // }
    
    // async findAll(): Promise<UserI[]> {
    //     return this.userModel.find().exec();
    // }

    getHello(): string {
        return 'Hello World from user!';
      }

    async findOne(username: string): Promise<UserI|undefined> {
        Logger.log(`Buscando usuario: ${username}`, 'UserService')
        try {
            const user = await this.userModel.findOne({username});
            return user
        } catch (error) {
            return undefined;
        }
    }

    async createUser(user: newUserDto): Promise<UserI> {
        Logger.debug(user)
        const newUser = new this.userModel(user);
        try {
            await newUser.save();

            Logger.log(`Nuevo usuario creado: ${newUser._id}`, 'UserService');

            return newUser;
        } catch (error) {
            Logger.error(`Error al crear el usuario: ${error.message}`, 'UserService');
            throw new InternalServerErrorException(`Error al crear el usuario: ${error.message}`, 'UserService');
        }

    }

    async createHash(user: ObjectId, hash: String): Promise<AuthI> {
        const newAuth = new this.authModel({user, hash});
        try {

            await newAuth.save();
            Logger.log(`Nuevo usuario creado: ${newAuth._id}`, 'AuthService');
            return newAuth;

        } catch (error) {
            Logger.error(`Error al crear el usuario: ${error.message}`, 'UserService');
            throw new InternalServerErrorException(`Error al crear el usuario: ${error.message}`, 'UserService');
        }

    }
}
