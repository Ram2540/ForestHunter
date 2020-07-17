import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SharedDataService } from './databaseSharedData/shared-data.service';
import { DataStorageService } from './services/data-storage/data-storage.service';
import { Hero } from './classes/hero';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forest Hunter';

  constructor(private authService: AuthService, private sharedDataService: SharedDataService, private gameService: GameService)  {
    this.authService.autoLogin();
    // this.sharedDataService.UpdateAllSharedDataToDB();

  }
}
