import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { };