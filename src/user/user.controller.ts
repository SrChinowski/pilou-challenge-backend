import { BadRequestException, Body, Controller, Get, Logger, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { FindUserDto } from "./dto/find-user.dto";
import { UserI } from "src/schemas/user.schema";
import { UserService } from "./user.service";
import { newUserDto } from "./dto/new-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { updateUserDto } from "./dto/update-user";

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @Get()
    getHello(): string {
      return this.userService.getHello();
    }

    @UseGuards(AuthGuard("jwt"))
    @Post('/new')
    async newUser(@Body("user") userDto: newUserDto): Promise<UserI> {
        Logger.log(JSON.stringify(userDto), 'AppController')
        try {
            const user = await this.userService.createUser(userDto);
            if (user) {
                const auth = await this.userService.createHash(
                    user._id,
                    userDto.password
                );
                if (auth)
                    return user;
                else {
                    throw new BadRequestException('No se pudo crear el usuario');
                }
            } else {
                throw new BadRequestException('No se pudo crear el usuario');
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @Get('/find/:username')
    async findUser(@Param() params: FindUserDto): Promise<UserI> {
        Logger.log(JSON.stringify(params), 'UserController')
        try {
            const user = await this.userService.findOne(params.username);
            if (user) 
                return user;
            else 
                throw new BadRequestException('No se pudo encontrar el usuario');
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @Get('/users')
    async findAll(): Promise<UserI[]> {
        try {
            const users = await this.userService.findAll();
            if (users) 
                return users;
            else 
                throw new BadRequestException('Error al consultar bd');
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

    @UseGuards(AuthGuard("jwt"))
    @Patch('/update')
    async updateUser(@Body("user") userDto: updateUserDto): Promise<UserI> {
        Logger.log(JSON.stringify(userDto), 'UserController')
        try {
            const user = await this.userService.updateUser(userDto);
            if (user) 
                return user;
            else 
                throw new BadRequestException('No se pudo encontrar el usuario');
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}