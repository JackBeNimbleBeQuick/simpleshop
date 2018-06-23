
//<reference path="../../ts/interface.d" />
import Store from '../../ts/data/store';
import Types from '../../ts/data/types';

const callbacks:Array<flux_store> = [
  {
    id: 'cb1',
    store_key: Types.GET_DATA,
    callback: (data)=>{console.log('CALLBACK # 1'); console.log(data); return 'result_1';}
  },
  {
    id: 'cb2',
    store_key: Types.SESSION_TRACKING,
    callback: (data)=>{console.log('CALLBACK # 2'); console.log(data); return 'result_2';}
  },

];

describe('Set and remove listeners ',()=>{
  callbacks.map( (cb,i) => {
    Store.catchStoreChanges(cb);
  });
  console.log(Store.listeners);

  let i = callbacks.length;
  for(let cb in callbacks){
    let flx_str = callbacks[cb];
    let listener = Store.listeners[flx_str.id];
    let type = typeof listener;

    it(`checking listener for: ${flx_str.id}`, ()=>{
      expect(type).toEqual('function');
    });

    it(`removing event listeners for: ${flx_str.id} `, ()=>{
      Store.releaseStoreChange(flx_str.id);i--;
      let remains = Object.keys(Store.listeners).length;
      console.log(`remain: ${remains} i: ${i} eq: ${remains===i}`);
      expect(remains).toEqual(i);
    });
  }

});
