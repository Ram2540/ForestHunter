import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SharedDataService } from './databaseSharedData/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forest Hunter';

  constructor(private authService: AuthService, private sharedDataService: SharedDataService)
  {
    this.authService.autoLogin();
    //this.sharedDataService.UpdateAllSharedData();
  }
}
