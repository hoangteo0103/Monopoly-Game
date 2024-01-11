import { Controller, Get, UseGuards, Request, Res, Param, Post} from '@nestjs/common';
import { SkinService } from './skin.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Skins')
@Controller('skins')
export class SkinController {
    constructor(
        private skinService: SkinService,
      ) {}    

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Get Skin List Successfully',
        type: Array<String>,
      })
    async find(@Request() req, @Res() res, @Param('id') id: string) {
        
        const skins = await this.skinService.findAll(id);
        return res.status(200).json({skins: skins});
    }

    @Post(':id')
    @ApiResponse({
        status: 200,
        description: 'Buy Skin Successfully',
        type: Array<String>,
      })

    async buy(@Request() req, @Res() res, @Param('id') id: string) {
        const skinID = req.body.skinID;
        const skins = await this.skinService.buy(id, skinID);
        return res.status(200).json({skins: skins});
    }
}
