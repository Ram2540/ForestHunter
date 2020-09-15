import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FirestoreDBService } from '../database/firestore-db.service';
import * as fromAppStore from '../store/app-store';
import { ControllerActions } from '../store/controller/controller.actions';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  //public weaponsIDAlreadyDownloaded: number[] = [];
  public downloadWeaponIDs$: Subject<number[]> = new Subject<number[]>();  // these IDs of weapon will be downloaded
  

  constructor(
    private store: Store<fromAppStore.AppState>,
    private firestoreDBService: FirestoreDBService) {
    // -------------------------------------weaponsState---------------------------------------------------
    this.downloadWeaponIDs$.subscribe(IDs => {
      IDs.forEach(id => {
        this.firestoreDBService.loadWeaponCollectionByID(id);
        //this.weaponsIDAlreadyDownloaded.push(id);
      });
    });

    // this.store.select('weaponsState').subscribe((weaponsState) => {
    //   this.weaponsIDAlreadyDownloaded = weaponsState.weaponList.map(w => w.id);
    // });
    // -------------------------------------END weaponsState---------------------------------------------------
  }

}
