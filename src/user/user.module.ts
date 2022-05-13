import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Purchase } from './entities/purchase.entity';
import { UserController } from './user.controller';
import { UploadModule } from 'src/common/upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Purchase]),
    UploadModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
