import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Raw, Repository } from 'typeorm';

import { getFromDto } from '../common/utils/repository.util';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async addPrice(payload: any, throwError = true) {
    const found = await this.findPriceByName(payload.name);
    if (found) {
      if (throwError) {
        throw new BadRequestException('The price already added');
      } else {
        return found;
      }
    }
    const price: Setting = getFromDto(payload, new Setting());
    await this.settingRepository.save(price);

    return await this.findPriceByName(payload.name);
  }

  async findPriceByName(name: string): Promise<Setting> {
    return this.settingRepository.findOne({
      where: { name: name },
    });
  }

  async getPrice(name: string): Promise<any> {
    const price = await this.settingRepository.findOne({
        where: { name: name },
    });  
    if (price) return price.value;
    return 0
  }

  async setPrice(name: string, price: any): Promise<any> {
    let priceItem = await this.settingRepository.findOne({
        where: { name: name },
    }); 
    if (!priceItem) priceItem = new Setting(); 
    priceItem.name = name;
    priceItem.value = price;
    await this.settingRepository.save(priceItem);
    return priceItem;
  }

  async getPrices(names: []): Promise<Setting[]> {
    return this.settingRepository.find({
        where: { name: name },
    });  
  }

  async saveSetting(settings: any): Promise<any> {
    for (const key in settings) {
      console.log(key, ': ', settings[key])

      let settingItem = await this.settingRepository.findOne({
        where: { name: key },
      }); 
      if (!settingItem) settingItem = new Setting(); 
      settingItem.name = key;
      settingItem.value = settings[key];
      await this.settingRepository.save(settingItem);
    }
    return true;
  }

  async getSetting(): Promise<any> {
    const settings = await this.settingRepository.find();
    return settings;
  }
  
}