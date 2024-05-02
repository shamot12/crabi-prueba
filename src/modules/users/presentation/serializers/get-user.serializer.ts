import { ApiProperty } from '@nestjs/swagger';

export class GetUserSerializer {
    @ApiProperty({
        description: 'First name from client',
        example: 'Samuel'
    })
    first_name: string;
    
    @ApiProperty({
        description: 'Last name from client',
        example: 'Hernández'
    })
    last_name: string;
    
    @ApiProperty({
        description: 'Email from client',
        example: 'email@domain.com'
    })
    email: string;
    
    @ApiProperty({
        description: 'Country from client',
        example: 'Mexico'
    })
    country: string;
}

