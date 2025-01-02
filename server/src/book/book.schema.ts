import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../user/user.schema";
import { Document, Types } from "mongoose";

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    user: User;
};

export const BookSchema = SchemaFactory.createForClass(Book);