///<reference path="../interface.d.ts" />

import * as Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Dispatcher from 'data/dispatcher';
import Types from 'data/types';
import Tracker from 'data/tracker';
import FluxMethods from 'util/fluxmethods';
import {Session} from 'com/Session';

export class Store extends ReduceStore<any, any>{
  session:Session;
  lastAction:any;

  constructor() {
    super(Dispatcher);
    this.session = new Session();
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  getState () {
    return this.session.retrieve('state');
  }

  getLastAction = () => {
    return this.lastAction;
  }

  reduce(state, action) {

    console.log(state);
    console.log(action);
    let reduced = false;

    switch(action.type){
      case Types.RESET_TRACKING:

        if(state.type == Types.SESSION_TRACKING)
          state.data = {};

        return state;
      case Types.GET_DATA:
        this.session.add('state', {[action.type]:action} );
        Tracker.buildProductList();
        return action;
      case Types.SESSION_TRACKING:
      case Types.SET_VIEWED:
        reduced = true;
        break;
    }

    this.lastAction = action.type;
    if(action) this.session.add('state', {[action.type]:action} );

    return reduced ? action : state;
  }

}
export default new Store;
