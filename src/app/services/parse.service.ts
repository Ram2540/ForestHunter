import { Injectable } from '@angular/core';
import { Ratings, RatingsDB } from '../components/ratings/ratings.model';
import { ControllerActions } from '../store/controller/controller.actions';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor(private controllerActions: ControllerActions) { }

  parseRatingsToDB(rating: Ratings): RatingsDB {
    return Object.assign({ userName: this.controllerActions.getUserDataInfoState().userDataInfo.userName }, rating);
  }
  parseDBToRatings(ratingsDB: RatingsDB): Ratings {
    const { userName, ...ratings } = ratingsDB;
    return ratings;
  }

}
