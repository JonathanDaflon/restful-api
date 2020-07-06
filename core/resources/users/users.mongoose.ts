import * as bcrypt from 'bcrypt'
import * as mongoose from 'mongoose'
import { IUser } from './users.model';
import { config } from './../../../config/api-config';

const userSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 3,

    },
    email: {
        type: String,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
    }
})

userSchema.pre<IUser>('save', function (next) {

    const user: IUser = this

    if (!user.isModified('password')) {
        next()
    } else {
        bcrypt.hash(user.password, config.security.rounds)
            .then(hash => {
                user.password = hash
                next()
            }).catch(next)
    }
})

userSchema.pre('findOneAndUpdate', function (next) {

    if (!this.getUpdate().password) {
        next()
    } else {
        bcrypt.hash(this.getUpdate().password, config.security.rounds)
            .then(hash => {
                this.getUpdate().password = hash
                next()
            }).catch(next)

    }
})

export const User = mongoose.model<IUser>('User', userSchema)