import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
//import { GlobalState } from '../reducers/index';
import { SearchAgencies, SearchStatus, ShowDetails, OrdenarMayor, OrdenarMenor, SearchMissions, SaveLaunches } from '../reducers/launch.actions';
import { LaunchState } from '../reducers/launch.reducer';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { Launch } from '../store/models/launch';

@Component({
  selector: 'app-search-container',
  template: `
    <app-search-presenter
      (eventSearchAgencies)="onSearchAgencies($event)"
      (eventSearchStatus)="onSearchStatus($event)"
      (eventSearchMissions)="onSearchMissions($event)"
      (eventSaveLaunches)="onSaveLaunches()"
    >
    </app-search-presenter>
    <app-launches-display [launches]="launchesResult"
    (eventShowDetails)="onShowDetails($event)"
    (eventOrdenarMayor)="onOrdenarMayor($event)"
    (eventOrdenarMenor)="onOrdenarMenor($event)"
    >
    </app-launches-display>
  `
  ,
  styles: []
})

export class ContainerComponent implements OnInit {

  public launchesResult: any[];

  constructor(private store: Store<LaunchState>, swUpdate: SwUpdate) {
    if (swUpdate.isEnabled){
      swUpdate.available.subscribe(
        (event: UpdateAvailableEvent) => {
          const msg =
            'Hay una nueva versión disponible, ¿desea descargarla?';
          if (confirm(msg)) { window.location.reload(); }
        }
      );
    }
  }

  ngOnInit() {
    this.store.select('launch').subscribe(value => (this.launchesResult = value.launches));
  }

  onSearchAgencies(textToSearch: string) {
    this.store.dispatch(new SearchAgencies(textToSearch));
  }

  onSearchStatus(id: string) {
    this.store.dispatch(new SearchStatus(id));
  }

  onShowDetails(launch: Launch) {
    this.store.dispatch(new ShowDetails(launch));
  }

  onOrdenarMayor(launches: Launch[]) {
    this.store.dispatch(new OrdenarMayor(launches));
  }

  onOrdenarMenor(launches: Launch[]) {
    this.store.dispatch(new OrdenarMenor(launches));
  }

  onSearchMissions(textToSearch: string) {
    this.store.dispatch(new SearchMissions(textToSearch));
  }

  onSaveLaunches() {
    this.store.dispatch(new SaveLaunches(this.launchesResult));
  }
}
