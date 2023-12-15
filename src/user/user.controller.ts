import { BadRequestException, Body, Controller, Get, Logger, Param, Post } from "@nestjs/common";
import { FindUserDto } from "./dto/find-user.dto";
import { UserI } from "src/schemas/user.schema";
import { UserService } from "./user.service";
import { newUserDto } from "./dto/new-user.dto";

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @Get()
    getHello(): string {
      return this.userService.getHello();
    }

    @Post('/new')
    async newUser(@Body("user") userDto: newUserDto): Promise<UserI> {
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

    @Get('/:username')
    async findUser(@Param() params: FindUserDto): Promise<UserI> {
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
    
}