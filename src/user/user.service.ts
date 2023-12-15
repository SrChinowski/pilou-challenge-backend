import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserI } from 'src/schemas/user.schema';
import { FindUserDto } from './dto/find-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { newUserDto } from './dto/new-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserI>,
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

    async findOne(userId: string): Promise<UserI|undefined> {
        try {
            const user = await this.userModel.findById(userId);
            return user
        } catch (error) {
            return undefined;
        }
    }

    async getStudent(studentId: string): Promise<UserI> {
        const existingStudent = await this.userModel.findById(studentId).exec();
        if (!existingStudent) {
         throw new NotFoundException(`Student #${studentId} not found`);
        }
        return existingStudent;
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
}
