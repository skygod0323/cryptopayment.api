import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/common/constants/secret.constant';
import { LocalStrategy } from 'src/common/guards/local.strategy';
import { JwtStrategy } from 'src/common/guards/jwt.strategy';
import { UploadModule } from 'src/common/upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: jwtConstant.expiresIn },
    }),
    UploadModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService],
})
export class AuthModule {}
