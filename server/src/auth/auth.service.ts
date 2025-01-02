import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { User, UserDocument } from "../user/user.schema";
import { AuthDTO, LoginAuthDTO } from "./auth.dto";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Model, Types } from "mongoose";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwt: JwtService,
        private config: ConfigService
    ) { };

    async signup(dto: AuthDTO) {

        const { firstName, lastName, email, password } = dto;

        const existingUser = await this.userModel.findOne({ email });

        if (existingUser) {

            throw new BadRequestException("User Already Exists");

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new this.userModel({
            _id: new Types.ObjectId(),
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();

        return user;

    };

    async signToken(userId: string, email: string): Promise<{ access_token: string }> {

        const payload = {
            sub: userId,
            email
        };

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "6d",
            secret: this.config.get("JWT_SECRET")
        });

        return {
            access_token: token
        };

    };

    async signin(dto: LoginAuthDTO) {

        const { email, password } = dto;

        const user = await this.userModel.findOne({ email });

        if (!user) {

            throw new UnauthorizedException("Invalid Email!");

        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {

            throw new UnauthorizedException("Invalid Password!");

        }

        return this.signToken(user._id.toString(), user.email);

    }

};