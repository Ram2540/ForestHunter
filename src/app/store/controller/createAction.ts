import {Action} from '@ngrx/store';
import { appActions } from '../app-store';

export function createAction(type, payload?): appActions {
  return { type, payload };
}