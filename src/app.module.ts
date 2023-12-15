import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    LoginModule, 
    UserModule, 
    DatabaseModule,
    MongooseModule.forRoot(
      'mongodb+srv://cleonve:fZkkVrFcJP1GXHH5@mystuff.qgcgfp7.mongodb.net/?retryWrites=true&w=majority'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
