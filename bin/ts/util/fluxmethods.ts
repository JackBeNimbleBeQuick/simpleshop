///<reference path="../interface.d.ts" />
import DomUtils from 'util/dom';
import Store from 'data/store';
import Types from 'data/types';

//@NOTE these interfaces are made explicit here while flushing out
//@NOTE the validity of this approach
interface flux_store{
  store_key:string,
  value_key?:string,
  callback:Function
}

export class FluxMethods{

  /**
   * Utility method for catching store value changes
   * @param {params: flux_store}
   * @return {Function| void}
   * the flux_store interface is used to clean up the footprint and to provide
   * fallback for when the store_key == value_key
   */
  public catchStoreChanges = ( params:flux_store ) => {

    Store.addListener(()=>{
      let store = Store.getState();
      let last  = Store.getLastAction();

      console.log(`catch for; store: ${params.store_key} value: ${params.value_key}`);

      if( last != 'RESET_TRACKING' && store[params.store_key] ){
        let keyStore = store[params.store_key];
        // console.log(keyStore);
        let data = keyStore.data;
        if(data && params.value_key && data[params.value_key]) data = data[params.value_key];
        console.log(data);
        return params.callback(data);
      }
    });
  }

  public productKey = (prod:product) => {
    let matches = prod.id.match(/[a-z]{1}\d{4}/gi);
    if(matches[0]) return matches[0];
    return null;
  }

  /**
   * Provide current state by type is that type exists or
   * return the whole state object
   * @return {Store.reduce.state}
   */
  public getState = (type?:string) => {
    let state = Store.getState();

    /* If there is a Types.type then return that state or empty object*/
    if(Types[type]){
      return  state[type] && state[type].data ?  state[type].data : {};
    }
    return state;
  }

}
export default new FluxMethods();
