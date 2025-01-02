import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { CreateBookDTO, EditBookDTO } from "./book.dto";
import { Book, BookDocument } from "./book.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

@Injectable()
export class BookService {

    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) { };

    async getBooks(userId: string) {

        if (!Types.ObjectId.isValid(userId)) {

            throw new BadRequestException("Invalid User ID");

        }

        return this.bookModel.find({ user: new Types.ObjectId(userId) });

    };

    async getBookById(userId: string, bookId: string) {

        if (!Types.ObjectId.isValid(userId)) {

            throw new BadRequestException("Invalid User ID");

        }

        if (!Types.ObjectId.isValid(bookId)) {

            throw new BadRequestException("Invalid Book ID");

        }

        const book = await this.bookModel.findOne({
            _id: new Types.ObjectId(bookId),
            user: new Types.ObjectId(userId),
        });

        if (!book) {

            throw new ForbiddenException("Book Not Found Or Access Denied");

        }

        return book;

    };

    async createBook(userId: string, dto: CreateBookDTO) {

        if (!Types.ObjectId.isValid(userId)) {

            throw new BadRequestException("Invalid User ID");

        }

        const newBook = new this.bookModel({
            ...dto,
            user: new Types.ObjectId(userId)
        });

        return newBook.save();

    };

    async editBook(userId: string, bookId: string, dto: EditBookDTO) {

        if (!Types.ObjectId.isValid(userId)) {

            throw new BadRequestException("Invalid User ID");

        }

        if (!Types.ObjectId.isValid(bookId)) {

            throw new BadRequestException("Invalid Book ID");

        }

        const book = await this.bookModel.findOneAndUpdate(
            { _id: new Types.ObjectId(bookId), user: new Types.ObjectId(userId) },
            dto, { new: true }
        );

        if (!book) {

            throw new ForbiddenException("Access To Resource Denied Or Book Not Found");

        }

        return book;

    };

    async deleteBook(userId: string, bookId: string) {

        if (!Types.ObjectId.isValid(userId)) {

            throw new BadRequestException("Invalid User ID");

        }

        if (!Types.ObjectId.isValid(bookId)) {

            throw new BadRequestException("Invalid Book ID");

        }

        const book = await this.bookModel.findOne({
            _id: new Types.ObjectId(bookId),
            user: new Types.ObjectId(userId)
        });

        if (!book) {

            throw new ForbiddenException("Access To Resource Denied Or Book Not Found");

        }

        await this.bookModel.deleteOne({ _id: new Types.ObjectId(bookId), user: new Types.ObjectId(userId) });

    };

};