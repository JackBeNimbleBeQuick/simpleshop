///<reference path="../interface.d.ts" />

import * as Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Dispatcher from 'data/dispatcher';
import Types from 'data/types';
import Tracker from 'data/tracker';
import {Session} from 'com/Session';
import {EventEmitter} from 'events';


export class Store extends ReduceStore<any, any>{

  //@TODO comment these correctly
  session:Session;
  lastAction:any;
  initReducer:any;
  listeners:listerns = {};
  emitter:EventEmitter;

  constructor() {
    super(Dispatcher);

    //@NOTE in unit tests ReduceStore private __dispatcher
    // .seems to not get set on instantiation

    this.__dispatcher = Dispatcher;
    this.session = new Session();
    this.emitter = new EventEmitter();
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
    this.lastAction = action.type;

    switch(action.type){
      case Types.RESET_TRACKING:

        if(state.type == Types.SESSION_TRACKING){

          //@TODO replace ReduceStore.emitter with this
          //@TODO change these to custom events that are more focused
          this.emitter.emit('change');
          return this.getInitialState();
        }

        return state;

      case Types.GET_DATA:

        this.session.add('state', {[action.type]:action} );
        Tracker.buildProductList();
        //@TODO replace ReduceStore.emitter with this
        //@TODO change these to custom events that are more focused
        this.emitter.emit('change');
        return action;

      case Types.SESSION_TRACKING:

        this.session.trackItem(action.type, action.data);

        //@TODO replace ReduceStore.emitter with this
        //@TODO change these to custom events that are more focused
        this.emitter.emit('change');
        return action;

      case Types.PURCHASE_CART:
      case Types.SET_VIEWED:
        reduced = true;
        break;
    }

    if(action) this.session.add('state', {[action.type]:action} );

    //@TODO replace ReduceStore.emitter with this
    //@TODO change these to custom events that are more focused
    this.emitter.emit('change');
    return reduced ? action : state;
  }

  /**
   * Remove the listener on store and its reference
   * @param  'change' :
   * @param  this.listeners[ref]
   * @return {void}
   */
  public releaseStoreChange = (ref:string) => {
    this.emitter.removeListener('change',this.listeners[ref]);
    delete this.listeners[ref];
  }


  /**
   * Utility method for catching store value changes
   * @param {params: flux_store}
   * @return {Function| void}
   * the flux_store interface is used to clean up the footprint and to provide
   * fallback for when the store_key == value_key
   */
  public catchStoreChanges = ( params:flux_store ) => {

    //@TODO remove this slop with custom events that provide
    //@TODO corrent return values
    let returnValue = ()=>{
      let data = this.getByIndex(params.store_key);
      let last  = this.getLastAction();
      console.log(`catch for; store: ${params.store_key} value: ${params.value_key}`);

      if( last != 'RESET_TRACKING' && data){
        if(params.value_key && data[params.value_key]) data = data[params.value_key];
        console.log(data);
        return params.callback(data);
      }
    }

    this.listeners[params.id] = returnValue;

    return this.emitter.addListener('change',returnValue);
  }


  /**
   * Products can be referennced by their key
   * @param  /[a-z]{1}d{4}/gi
   * @return  {string|null}
   * attempts to return a product key from product.id
   */
  public productKey = (prod:product) => {
    let matches = prod.id.match(/[a-z]{1}\d{4}/gi);
    if(matches[0]) return matches[0];
    return null;
  }

  /**
   * Provide current state by type if that type exists or
   * return the whole state object
   * @return {Store.reduce.state}
   */
  public getByIndex = (type:string) => {
    let state = this.getState();
    return  state[type] && state[type].data ?  state[type].data : {};
  }


}
export default new Store;
