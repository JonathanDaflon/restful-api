import { BaseModel } from '../generic/model/base-model';
import * as mongoose from 'mongoose'

// An exemple of a resource of Users
export interface IUser extends BaseModel {
    name: string,
    email: string,
    password: string
}

const userSchema: mongoose.Schema = new mongoose.Schema ({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    }
})

export const User = mongoose.model<IUser>('User', userSchema)