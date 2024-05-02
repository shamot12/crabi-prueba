import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { DBUsersConnectionParameters } from '@src/shared/database';

@Injectable()
export class UserRepository {

    constructor( @InjectModel(User.name, DBUsersConnectionParameters.DBConnectionName) private readonly model: Model<User> ) { }

    async save(entity: User): Promise<User> {
        return await this.model.create(entity);
    }

    async findById(id: string): Promise<User> {
        const entity = await this.model.findOne({ _id: id } as mongoose.FilterQuery<User>);

        return entity;
    }

    async findByEmail(email: string): Promise<User> {
        const entity = await this.model.findOne({ email } as mongoose.FilterQuery<User>);

        return entity;
    }
}
