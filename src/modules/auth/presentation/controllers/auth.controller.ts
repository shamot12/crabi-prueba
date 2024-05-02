import { LoginUseCase } from '@modules/auth/domain/useCases';
import { Body, Controller, HttpCode, HttpStatus, Post, Request} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { LoginDto } from '@modules/auth/presentation/dtos';
import { LoginSerializer } from '@modules/auth/presentation/serializers';

@ApiTags('Authentication')
@Controller({
    version: '1'
})
export class AuthController {
    constructor(private loginUseCase: LoginUseCase) { }

    @Post('login')
    @ApiOperation({
        summary: 'Attempt to login with email and password',
        description: 'Attempt to login with email and password'
    })
    @ApiOkResponse({
        description: 'Login successful',
        type: LoginSerializer
    })
    @ApiBadRequestResponse({
        description: 'Wrong credentials'
    })
    @HttpCode(HttpStatus.OK)
    async login( @Body() dto: LoginDto, @Request() request ): Promise<LoginSerializer> {
        return await this.loginUseCase.handle(dto);
    }
}
