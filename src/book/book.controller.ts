import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateBookDTO, EditBookDTO } from "./book.dto";
import { JwtGuard } from "src/auth/jwt.guard";
import { BookService } from "./book.service";
import { GetUser } from "../user.decorator";

@UseGuards(JwtGuard)
@Controller("books")
export class BookController {

    constructor(private bookService: BookService) { };

    @Get()
    getBooks(@GetUser("id") userId: string) {

        return this.bookService.getBooks(userId);

    };

    @Get(":id")
    getBookById(@GetUser("id") userId: string, @Param("id") bookId: string) {

        return this.bookService.getBookById(userId, bookId);

    };

    @Post()
    createBook(@GetUser("id") userId: string, @Body() dto: CreateBookDTO) {

        return this.bookService.createBook(userId, dto);

    };

    @Put(":id")
    editBookById(@GetUser("id") userId: string, @Param("id") bookId: string, @Body() dto: EditBookDTO) {

        return this.bookService.editBook(userId, bookId, dto);

    };

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    deleteBook(@GetUser("id") userId: string, @Param("id") bookId: string) {

        return this.bookService.deleteBook(userId, bookId);

    };

};