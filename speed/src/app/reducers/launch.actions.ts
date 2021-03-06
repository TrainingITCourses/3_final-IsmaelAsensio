import { Action } from '@ngrx/store';
import { Launch } from '../store/models/launch';

export enum LaunchActionTypes {
  SearchAgencies = '[Launch] Search Agencies',
  SearchStatus = '[Launch] Search Status',
  SearchMissions = '[Launch] Search Missions',
  ShowDetails = '[Launch] Show Details',
  OrdenarMayor = '[Launch] Ordenar Mayor',
  OrdenarMenor = '[Launch] Ordenar Menor',
  SaveLaunches = '[Launch] Save Launches',
  SavedLaunches = '[Launch] Saved Launches',
  NotSavedLaunches = '[Launch] Not Saved Launches'
}

export class SearchAgencies implements Action {
  readonly type = LaunchActionTypes.SearchAgencies;
  readonly textToSearch;
  constructor (payload?: string) {
    this.textToSearch = payload;
  }
}
export class SearchStatus implements Action {
  readonly type = LaunchActionTypes.SearchStatus;
  readonly id;
  constructor (payload?: string) {
    this.id = payload;
  }
}
export class SearchMissions implements Action {
  readonly type = LaunchActionTypes.SearchMissions;
  readonly textToSearch;
  constructor (payload?: string) {
    this.textToSearch = payload;
  }
}
export class ShowDetails implements Action {
  readonly type = LaunchActionTypes.ShowDetails;
  constructor (readonly payload?: Launch) {}
}
export class OrdenarMayor implements Action {
  readonly type = LaunchActionTypes.OrdenarMayor;
  constructor (readonly payload?: Launch[]) {}
}
export class OrdenarMenor implements Action {
  readonly type = LaunchActionTypes.OrdenarMenor;
  constructor (readonly payload?: Launch[]) {}
}
export class SaveLaunches implements Action {
  readonly type = LaunchActionTypes.SaveLaunches;
  constructor (readonly payload?: any) {}
}
export class SavedLaunches implements Action {
  readonly type = LaunchActionTypes.SavedLaunches;
  constructor (readonly payload?: any) {}
}
export class NotSavedLaunches implements Action {
  readonly type = LaunchActionTypes.NotSavedLaunches;
  constructor(readonly payload?: any) {}
}

export type LaunchActions = SearchAgencies | SearchStatus | SearchMissions | ShowDetails | OrdenarMayor | OrdenarMenor | SaveLaunches | SavedLaunches | NotSavedLaunches;
