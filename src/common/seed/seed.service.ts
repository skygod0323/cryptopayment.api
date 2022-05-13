import { Injectable } from '@nestjs/common';
import { SettingService } from 'src/setting/setting.service';

import { settings } from './seed_prices';

@Injectable()
export class SeedService {
  constructor(private readonly settingService: SettingService) {}

  async startDevelopmentSeed() {
    await this.seedPrices();
  }

  async seedPrices() {
    await Promise.all(
      settings.map(async (setting) => {
        await this.settingService.addPrice(setting as any, false);
      }),
    );
  }
}