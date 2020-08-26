import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit, OnDestroy {
  openUserStatistics = false;
  userName: string;
  private authStateSubscription: Subscription;
  constructor(private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.authStateSubscription = this.store.select('userDataInfoState').subscribe((userDataInfoState) => {
      this.userName = userDataInfoState.userDataInfo.userName;
    }); 
  }

  onOpenUserStatistics(): void {
    this.openUserStatistics = !this.openUserStatistics;
  }

  ngOnDestroy() {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }
}
