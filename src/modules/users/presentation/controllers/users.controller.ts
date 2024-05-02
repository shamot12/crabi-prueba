import { CreateUserUseCase, GetUserUseCase } from '@modules/users/domain/useCases';
import { Body, Controller, HttpCode, HttpStatus, Post, Request, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiSecurity } from '@nestjs/swagger';
import { CreateUserDto, GetUserDto } from '@modules/users/presentation/dtos';
import { CreateUserSerializer, GetUserSerializer } from '@modules/users/presentation/serializers';

@ApiTags('Users')
@Controller({
    version: '1'
})
export class UsersController {
    constructor( private createUserUseCase: CreateUserUseCase,
                private getUserUseCase: GetUserUseCase ) { }

    @Post('users')
    @ApiOperation({
        summary: 'Creates the register of an user after validating the data on the PLD service.',
        description: 'Creates the register of an user after validating the data on the PLD service.'
    })
    @ApiOkResponse({
        description: 'User created',
        type: CreateUserSerializer
    })
    @ApiBadRequestResponse({
        description: 'User was found on the PLD search'
    })
    @HttpCode(HttpStatus.CREATED)
    async create( @Body() dto: CreateUserDto, @Request() request ): Promise<CreateUserSerializer> {
        return await this.createUserUseCase.handle(dto);
    }

    @Get('users')
    @ApiOperation({
        summary: 'Retrieves the user data',
        description: 'Retrieves the user data'
    })
    @ApiOkResponse({
        description: 'User created',
        type: GetUserSerializer
    })
    @ApiBadRequestResponse({
        description: 'User was found on the pld search'
    })
    @ApiSecurity('token')
    @HttpCode(HttpStatus.OK)
    async getUserData( @Body() dto: GetUserDto, @Request() request ): Promise<GetUserSerializer> {
        return await this.getUserUseCase.handle(dto, request.headers['token']);
    }
}
