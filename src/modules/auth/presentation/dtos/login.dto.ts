import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'Email from client',
        example: 'email@domain.com'
    })
    @IsEmail()
    email: string;
    
    @ApiProperty({
        description: 'Password from client',
        example: 'password'
    })
    @IsNotEmpty()
    password: string;
}

