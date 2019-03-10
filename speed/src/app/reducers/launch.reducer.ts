import { Action } from '@ngrx/store';
import { LaunchActions, LaunchActionTypes } from './launch.actions';
import { Launch } from '../store/models/launch';
import launchesJson from '../../assets/data/launches.json';

export interface LaunchState {
  launches: any[];
  _id?: any;
  message?: any;
}

export const initialState: LaunchState = {
  launches: [],
  _id: '',
  message: ''
};

export function reducer(state = initialState, action: LaunchActions): LaunchState {
  switch (action.type) {
    case LaunchActionTypes.SearchAgencies:
      state.launches = [];
      if (action.textToSearch.length) {
        for (let i = 0; i < launchesJson.count; i++) {
          if (launchesJson.launches[i].lsp){
            if (launchesJson.launches[i].lsp.name.toLowerCase().search(action.textToSearch.toLowerCase()) !== -1) {
              state.launches.push(launchesJson.launches[i]);
            }
          }
        }
      }
      return {...state};

    case LaunchActionTypes.SearchStatus:
      state.launches = [];
      let idNum;
      try {
        idNum = parseInt(action.id, 10);

        for (let i = 0; i < launchesJson.count; i++) {
          if (launchesJson.launches[i].status === idNum) {
            state.launches.push(launchesJson.launches[i]);
          }
        }

      } catch {

      } finally {
        return {...state};
      }

    case LaunchActionTypes.SearchMissions:
      state.launches = [];
      if (action.textToSearch.length) {
        for (let i = 0; i < launchesJson.count; i++) {
          if (launchesJson.launches[i].missions){
            for (let x = 0; x < launchesJson.launches[i].missions.length; x++) {
              if ((launchesJson.launches[i].missions[x].name.toLowerCase().search(action.textToSearch.toLowerCase()) !== -1)
              || (launchesJson.launches[i].missions[x].description.toLowerCase().search(action.textToSearch.toLowerCase()) !== -1)){
                state.launches.push(launchesJson.launches[i]);
              }
            }
          }
        }
      }
      return {...state};

    case LaunchActionTypes.ShowDetails:
      state.launches = [];
      for (let i = 0; i < launchesJson.count; i++) {
        if (launchesJson.launches[i].id === action.payload.id) {
          state.launches.push(launchesJson.launches[i]);
        }
      }
      return {...state};

    case LaunchActionTypes.OrdenarMenor:
      state.launches = [];

      for (let i = 0; i < action.payload.length; i++) {
        if (state.launches.length === 0) {
          state.launches.push(action.payload[i]);
        }else{
          for (let j = 0; j < state.launches.length; j++){
            if (action.payload[i].windowstart >= state.launches[j].windowstart) {
              if (j === (state.launches.length-1)) {
                state.launches.push(action.payload[i]);
                j = state.launches.length;
              }
            } else {
                state.launches.splice(j, 0, action.payload[i]);
                j = state.launches.length;
            }
          }
        }
      }
      return {...state};

    case LaunchActionTypes.OrdenarMayor:
      state.launches = [];

      for (let i = 0; i < action.payload.length; i++) {
        if (state.launches.length === 0) {
          state.launches.push(action.payload[i]);
        }else{
          for (let j = 0; j < state.launches.length; j++){
            if (action.payload[i].windowstart <= state.launches[j].windowstart) {
              if (j === (state.launches.length-1)) {
                state.launches.push(action.payload[i]);
                j = state.launches.length;
              }
            } else {
                state.launches.splice(j, 0, action.payload[i]);
                j = state.launches.length;
            }
          }
        }
      }
      return {...state};

    case LaunchActionTypes.SaveLaunches:
      return state;

    case LaunchActionTypes.SavedLaunches:
      return action.payload;

    case LaunchActionTypes.NotSavedLaunches:
      return {...state, message: action.payload };

    default:
      return state;
  }
}
