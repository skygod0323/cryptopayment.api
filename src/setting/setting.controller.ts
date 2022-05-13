import {
    Body,
    Controller, Get, Param, Put, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { SettingService } from './setting.service';

@Controller('api/setting')
@ApiTags('Setting')
export class SettingController {
    constructor(
        private readonly settingService: SettingService,
        
    ) {}

    @Get('')
    @ApiOkResponse({})
    async getSetting(
        @Body() body: any
    ) {
        const settings  = await this.settingService.getSetting();
        
        let result = {}
        if (settings) {
            settings.forEach(setting => {
                result[setting['name']] = setting['value'];
            })
        }
        return {success: true, data: result}
    }

    @Put('')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({})
    async saveSetting(
        @Body() body: any
    ) {
        const result  = await this.settingService.saveSetting(body);
        return {success: true}
    }
}