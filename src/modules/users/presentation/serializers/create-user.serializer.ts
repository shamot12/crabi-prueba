import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSerializer {
    @ApiProperty({
        description: 'Message from user creation attempt',
        example: 'Success'
    })
    message: string;
}

