import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import * as fromAppStore from '../../store/app-store';
import { Store } from '@ngrx/store';
import { Subscription, Subject } from 'rxjs';
import { timeInterval } from 'rxjs/operators';
import { Ratings, RatingsDB } from './ratings.model';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit, OnDestroy, AfterViewInit {
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;


  private ratingSubscription: Subscription;
  ratingsList: RatingsDB[] = [];
  private timeInterval;
  private whereInitdtTrigger = false;  // true - init in ngAfterViewInit false - init in ngOnInit

  constructor(private dataStorageService: DataStorageService,
    private store: Store<fromAppStore.AppState>) {
    this.dtOptions = {
      destroy:true,
      pagingType: 'full_numbers',
      pageLength: 2,
      paging: false,
      lengthChange: false,
      search: false,
      scrollY: '27rem',
      scrollCollapse: true,
      ordering: false,
      searching: false,
      // order: [[ 2, 'asc' ]]
    };
  }

  ngOnInit(): void {
    
    this.ratingSubscription = this.store.select('ratingsState').subscribe(r => {
      if (r.globalRatings.length > 0) {
        this.ratingsList = r.globalRatings.slice();
        if (!this.whereInitdtTrigger) {
          this.dtTrigger.next();
          this.whereInitdtTrigger = true;
        }
      }
    });
    // try to get Ratings until they appear
    this.timeInterval = setInterval(() => {
      this.dataStorageService.getAllRatings();
      if (this.ratingsList.length > 0) {
        this.whereInitdtTrigger = true;
        clearInterval(this.timeInterval);
      }
    }
      , 250);
  }

  ngAfterViewInit() {
    if (this.whereInitdtTrigger) {
      this.dtTrigger.next();
    }
   }

  sortByMaxLevel() {
    this.ratingsList = this.ratingsList.sort((r, r1) => r1.maxLevel - r.maxLevel);
  }
  sortByMaxDPS() {
    this.ratingsList = this.ratingsList.sort((r, r1) => r1.maxDPS - r.maxDPS);
  }

  sortByMaxGold() {
    this.ratingsList = this.ratingsList.sort((r, r1) => r1.maxGold - r.maxGold);
  }

  sortByDailyPoints() {
    this.ratingsList = this.ratingsList.sort((r, r1) => r1.toDayPoints - r.toDayPoints);
  }

//   private rerender(): void {
//     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
//         dtInstance.destroy();
//         this.dtTrigger.next();
//     });
// }
  ngOnDestroy() {
    if (this.ratingSubscription) {
      this.ratingSubscription.unsubscribe();
    }
    this.dtTrigger.unsubscribe();
    this.ratingsList = [];
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
  });
  }

}
