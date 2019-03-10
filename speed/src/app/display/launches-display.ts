import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Launch } from '../store/models/launch';
import { Mission } from '../store/models/mission';

@Component({
  selector: 'app-launches-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './launches-display.html',
  styleUrls: ['./launches-display.css']
})

export class DisplayComponent implements OnInit {

  @Input() public launches: Launch[] = [];
  public missions: Mission[];
  @Output() public eventShowDetails = new EventEmitter();
  @Output() public eventOrdenarMayor = new EventEmitter();
  @Output() public eventOrdenarMenor = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  tieneAgencia(launch: Launch) {
    if (launch.lsp) {
      return true;
    } else {
      return false;
    }
  }

  tieneMisiones(launch: Launch) {
    this.missions = [];

    if (launch.missions.length > 0) {
      this.missions = launch.missions;
      return this.missions;
    } else {
      return false;
    }
  }

  onClickShowDetails(launch: Launch) {
    this.eventShowDetails.next(launch);
  }

  esDetalle() {
    if (this.launches.length === 1) {
      return true;
    } else {
      return false;
    }
  }

  onClickOrdenarMayor(launches: Launch[]) {
    console.log("TAMAÑO array A ENVIAR: "+launches.length);
    this.eventOrdenarMayor.next(launches);
  }

  onClickOrdenarMenor(launches: Launch[]) {
    this.eventOrdenarMenor.next(launches);
  }
}
