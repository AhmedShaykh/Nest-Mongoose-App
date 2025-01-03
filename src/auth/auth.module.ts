import { User, UserSchema } from "../user/user.schema";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: "6d"
            },
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy
    ]
})
export class AuthModule { };