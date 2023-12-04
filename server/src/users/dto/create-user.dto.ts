import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {message: "incorrect email"})
    readonly email: string;
    @IsString({message: "password must be string"})
    readonly password: string;
}