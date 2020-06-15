import { config } from './../../config/api-config';
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

// An exemple of a resource of Users.
export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string

}

// A Schema with some basic validations built-in in Mongoose library.
const userSchema: mongoose.Schema = new mongoose.Schema ({
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
        bcrypt: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
    }
})

// A Middleware to encrypt the password of Users by save()
userSchema.pre<User>('save', function(next) {
   
    const user: User = this
    
    if (!user.isModified('password')) {
        next()
    } else {
        bcrypt.hash(user.password, config.security)
            .then(hash => {
                user.password = hash
                next()
            }).catch(next)
    }
})

// A Middleware to encrypt the password of Users by update()
userSchema.pre('findOneAndUpdate', function(next) {
    
    if (!this.getUpdate().password) {
        next()
    } else {
        bcrypt.hash(this.getUpdate().password, config.security)
            .then(hash => {
                this.getUpdate().password = hash
                next()
            }).catch(next)
    
    }
})
    
export const User = mongoose.model<User>('User', userSchema)
