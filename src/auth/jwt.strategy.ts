import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User, UserDocument } from "../user/user.schema";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    };

    async validate(payload: { sub: string; email: string }) {

        try {

            const user = await this.userModel.findOne({ _id: new Types.ObjectId(payload.sub) });

            if (!user) {

                console.log(`User With ID ${payload.sub} Not Found`);

                throw new UnauthorizedException("Login First To Access This Endpoint...");

            }

            return user;

        } catch (error) {

            console.error("Error:", error);

            throw new UnauthorizedException("Error Occurred While Fetching User");

        }

    };

};