import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto.email, dto.password)
    }
}
