import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email?: string;

  @Prop({ required: false, unique: false })
  username?: string;

  @Prop({
    required: function () {
      return this.username ? true : false;
    },
  })
  password?: string;

  @Prop({
    required: function () {
      return this.username ? true : false;
    },
  })
  name?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
