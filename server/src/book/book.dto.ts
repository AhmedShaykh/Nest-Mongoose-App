import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
};

export class EditBookDTO {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
};