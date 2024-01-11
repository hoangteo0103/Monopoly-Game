import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SkinService {
    constructor(private usersService: UsersService) {}
    async findAll(userID: string) : Promise<String[]> {
        const user = await this.usersService.findById(userID);
        return user.skins;
    }

    async buy(userID: string, skinID: string) : Promise<String[]> {
        const user = await this.usersService.findById(userID);
        if(user.skins.includes(skinID)) {
            return user.skins;
        } else if(user.coins >= 100) {
            user.skins.push(skinID);
            user.coins -= 100;
            await user.save();
            return user.skins;
        }
    }
}
