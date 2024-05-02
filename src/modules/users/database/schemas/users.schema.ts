import * as mongoose from 'mongoose';
import { User } from '../entities';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

const UserSchema = new mongoose.Schema<User>({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    country: { type: String }
}, {
    _id: true,
    collection: 'users',
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});


UserSchema.loadClass(User);

export {
    UserSchema
};
