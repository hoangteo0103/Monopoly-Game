import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, 
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://hoangteo0103:hoangteo0103@test1.y97bp8x.mongodb.net'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
