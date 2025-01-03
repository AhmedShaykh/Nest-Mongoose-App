import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/jwt.guard";
import { GetUser } from "../user.decorator";
import { EditUserDTO } from "./user.dto";
import { User } from "./user.schema";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {

    constructor(private userService: UserService) { };

    @Get("me")
    getUser(@GetUser() user: User) {

        return user;

    };

    @Put()
    editUser(@GetUser("id") userId: string, @Body() dto: EditUserDTO) {

        return this.userService.editUser(userId, dto);

    };

};