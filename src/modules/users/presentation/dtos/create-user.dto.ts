import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'First name from client',
        example: 'Samuel'
    })
    @IsNotEmpty()
    first_name: string;
    
    @ApiProperty({
        description: 'Last name from client',
        example: 'Hernández'
    })
    @IsNotEmpty()
    last_name: string;
    
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
    
    @ApiProperty({
        description: 'Country from client',
        example: 'Mexico'
    })
    @IsNotEmpty()
    country: string;
}

