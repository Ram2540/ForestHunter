import { Data } from '@angular/router';

export class UserDataInfo {
    userName: string[20];
    lastTimeUserLogin: Data;

    constructor(userName = null) {   // 0 - as a default hero
        this.userName = userName;
        this.lastTimeUserLogin = new Date();
    }
}