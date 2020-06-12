import mongoose, { Schema } from 'mongoose'

export interface BaseModel extends mongoose.Document{
   _id: Schema.Types.ObjectId
}