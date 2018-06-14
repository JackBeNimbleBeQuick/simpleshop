

import * as Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Dispatcher from 'data/dispatcher';
import Types from 'data/types';

export class Store extends ReduceStore<any, any>{
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {

    switch(action.type){
      case Types.GET_DATA:
        return {shoppingProps:action};
    }

    return state;
  }

}
export default new Store;
