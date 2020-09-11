import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/app-store';
import { ParseService } from 'src/app/services/parse.service';
import { ControllerActions } from 'src/app/store/controller/controller.actions';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit, OnDestroy {
  @Input() isOpened = true;
  
  userName: string;
  isEditMode = false;
  ratings: { [key: number]: string };
  private previousUserName: string;
  private ratingsStateSubscription: Subscription;
  private userDataInfoStateSubscription: Subscription;

  constructor(private store: Store<fromAppStore.AppState>,
              private parseService: ParseService,
              private controllerActions: ControllerActions,
              private helperService: HelperService) { }

  ngOnInit(): void {
    this.ratingsStateSubscription = this.store.select('ratingsState').subscribe((ratingState) => {
      this.ratings = { ...ratingState.rating };
      const properties = Object.keys(this.ratings);
      for(const r of properties) {
        if(!isNaN(this.ratings[r])) {
          this.ratings[r] = this.helperService.getConvertedNumberToKs(this.ratings[r]);
        }
      }
    });
    this.userDataInfoStateSubscription = this.store.select('userDataInfoState').subscribe((userDataInfoState)=>{
      this.userName = userDataInfoState.userDataInfo.userName;
      this.previousUserName = userDataInfoState.userDataInfo.userName;
    });

  }

  closeUserStatistics() {
    this.isOpened = !this.isOpened;
    this.isEditMode = false;
    this.userName = this.previousUserName;
  }
  onEditMode(){
    this.isEditMode = !this.isEditMode;
    this.userName = this.previousUserName;
  }

  changeUserName() {
    if(this.isEditMode) {
      this.controllerActions.UserChangeName(this.userName);
    }
    this.isEditMode = false;
  }

  ngOnDestroy() {
    if (this.ratingsStateSubscription) {
      this.ratingsStateSubscription.unsubscribe();
    }
    if (this.userDataInfoStateSubscription) {
      this.userDataInfoStateSubscription.unsubscribe();
    }
  }
}
