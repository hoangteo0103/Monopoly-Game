import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

// This should be a real class/interface representing a user entity
export type Usert = any;

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    //return this.userModel.findOne({ email }).exec();
    const data = await this.userModel
      .aggregate([{ $match: { email: email } }])
      .exec();
    return data[0];
  }

  async findOne(username: string): Promise<Usert | undefined> {
    return this.users.find(user => user.username === username);
  }
}