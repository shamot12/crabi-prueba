import { ApiProperty } from '@nestjs/swagger';
import { LoginStatesEnum } from '../../domain/enum/login-states.enum';

export class LoginSerializer {
    @ApiProperty({
        description: 'Boolean if login was successful',
        example: true
    })
    status: boolean;

    @ApiProperty({
        description: 'Message from login attempt',
        example: 'Login successful'
    })
    message: string;

    @ApiProperty({
        description: 'JWT if login was successful',
        example: 'JWTString'
    })
    jwt: string;

    constructor(status: LoginStatesEnum, jwt: string = ''){
        if(status === LoginStatesEnum.LOGIN_SUCCESSFUL){
            this.status = true;
            this.jwt = jwt
        } else{
            this.status = false;
        }
        this.message = status;
    }
}

