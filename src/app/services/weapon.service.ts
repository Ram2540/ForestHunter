import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Weapon } from '../classes/weapon';
import { ConvertDataService } from '../database/convert-data.service';
import { FirestoreDBService } from '../database/firestore-db.service';
import { WeapondDatabaseData } from '../databaseSharedData/weaponsData';
import * as fromAppStore from '../store/app-store';
import { ControllerActions } from '../store/controller/controller.actions';
import { DownloadService } from './download.service';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  private currentWeaponVersion = -1;
  private weaponList: WeapondDatabaseData[] = [];
  private nextWeaponId = 0;

  constructor(
    private store: Store<fromAppStore.AppState>,
    private downloadService: DownloadService,
    private convertDataService: ConvertDataService,
    private firestoreDBService: FirestoreDBService,
    private controllerActions: ControllerActions
  ) {
    this.store.select('weaponsState').subscribe((weaponsState) => {
      if (weaponsState.weaponDatabaseList) {
        this.weaponList = [...weaponsState.weaponDatabaseList];
      }
    });

    this.firestoreDBService.loadAllWeaponCollections();
  }




  getWeaponByIDandLevel(id: number, level: number): Weapon {
    let weapon: Weapon;
    let loadingData = false;
    while (weapon === undefined && !loadingData) {
      const index = this.weaponList.findIndex((w) => w.id === id);
      if (index < 0) {
        if (!loadingData) {
          loadingData = true;
          this.downloadService.downloadWeaponIDs$.next([id]); // send to download if there is not such id
        }
      } else {
        weapon = this.convertDataService.convertDBToWeaponByLevel(this.weaponList[index], level);
      }
    }
    return weapon;
  }

}
