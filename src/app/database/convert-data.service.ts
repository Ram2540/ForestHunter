import { Injectable } from '@angular/core';
import { Weapon } from '../classes/weapon';
import { Ratings, RatingsDB } from '../components/ratings/ratings.model';
import { WeapondDatabaseData } from '../databaseSharedData/weaponsData';
import { ControllerActions } from '../store/controller/controller.actions';
import { FirestoreDBService } from './firestore-db.service';
import * as fromAppStore from '../store/app-store';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ConvertDataService {

  constructor(
    private controllerActions: ControllerActions,
    private firestoreDBService: FirestoreDBService,
    private store: Store<fromAppStore.AppState>) {
  }
  // --------------------------------Ratings----------------------------------------------
  convertRatingsToDB(rating: Ratings): RatingsDB {
    return Object.assign({ userName: this.controllerActions.getUserDataInfoState().userDataInfo.userName }, rating);
  }
  convertDBToRatings(ratingsDB: RatingsDB): Ratings {
    const { userName, ...ratings } = ratingsDB;
    return ratings;
  }
 // --------------------------------Weapons----------------------------------------------
  convertDBToWeaponByLevel(weapondDB: WeapondDatabaseData, level: number): Weapon {
    return new Weapon(weapondDB.id,
      level,
      weapondDB.damageList[level],
      weapondDB.priceList[level],
      weapondDB.attackFrequencyList[level],
      weapondDB.element,
      weapondDB.availability,
      weapondDB.UrlImg,
      weapondDB.adaptationRation
    );
  }

 
}
