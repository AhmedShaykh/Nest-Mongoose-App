import { Injectable, NotFoundException } from "@nestjs/common";
import { User, UserDocument } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { EditUserDTO } from "./user.dto";
import { Model, Types } from "mongoose";

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { };

    async editUser(userId: string, dto: EditUserDTO) {

        if (!Types.ObjectId.isValid(userId)) {

            throw new NotFoundException("Invalid User ID");

        }

        const objectId = new Types.ObjectId(userId);

        const user = await this.userModel.findByIdAndUpdate(objectId, dto, { new: true });

        if (!user) {

            throw new NotFoundException("User Not Found");

        }

        return user;

    };

};