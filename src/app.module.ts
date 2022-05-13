import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormConfig from './ormconfig';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './common/upload/upload.module';
import { SettingModule } from './setting/setting.module';
import { SeedModule } from './common/seed/seed.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ScheduleModule.forRoot(),
    AuthModule,
    UploadModule,
    SettingModule,
    SeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
