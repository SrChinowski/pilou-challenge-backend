import { BadRequestException, Body, Controller, Get, Logger, Param, Post } from "@nestjs/common";
import { FindUserDto } from "./dto/find-user.dto";
import { UserI } from "src/schemas/user.schema";
import { UserService } from "./user.service";
import { newUserDto } from "./dto/new-user.dto";

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Get()
    getHello(): string {
        Logger.log("here")
        console.log("here")
      return this.userService.getHello();
    }

    // @Post(':id')
    // async findOne(@Param('id') id: string ): Promise<UserI> {
    //     const user = this.userService.findOne(id);

    //     if(user) return user;
    //     else return null; 
    // }

    @Post('/new')
    async newUser(@Body("user") userDto: newUserDto): Promise<UserI> {
        try {
            const user = await this.userService.createUser(userDto);
            if (user) {
                return user;
            } else {
                throw new BadRequestException('No se pudo crear el usuario');
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}