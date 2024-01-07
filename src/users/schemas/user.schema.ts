import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example : "taisiu@gmail.com"})
  @Prop({ required: true, unique: true })
  email?: string;

  @ApiProperty({ example : "taisiu0103"})
  @Prop({ required: false, unique: false })
  username?: string;

  @ApiProperty({ example : "secretpassword"})
  @Prop({
    required: function () {
      return this.username ? true : false;
    },
  })
  password?: string;

  @ApiProperty({ example : "Bui Nguyen Hoang"})
  @Prop({
    required: function () {
      return this.username ? true : false;
    },
  })
  name?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
