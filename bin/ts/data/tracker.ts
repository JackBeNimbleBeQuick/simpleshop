///<reference path="../interface.d.ts" />
import {Session} from 'com/Session';
import FluxMethods from 'util/fluxmethods';
import Types from 'data/types';
import Actions from 'data/actions';

export class Tracker{

  private session:Session;

  private visits: Array<product>;

  private views: Array<groups>;

  private cart: Array<product>;

  constructor(){
    this.session = new Session();
  }

  public viewedItem = (visited:product) => {
    this.add(Types.SESSION_TRACKING, visited);
  }

  public addToCart = (selected:product) => {
    this.add('cart', selected);
  }

  /**
   * Builds productList
   * called as part of store.reduce when service was called
   * @param {null}
   * @return {void}
   */
  public buildProductList = () => {
    let state = this.session.retrieve('state');
    if( state[Types.GET_DATA] ){
      let prodArray = state[Types.GET_DATA].data.groups;
      let products = {};
      prodArray.map((prod:product,i)=>{
        let key = FluxMethods.productKey(prod);
        if(key && prod) products[key] = prod;
      });
      this.session.store(Types.PRODUCTS, products);
    }
  }

  /**
   * Returns the product of key or null
   * @param  {id:string}
   * @return {product:null}
   */
  public findProduct = (id:string) => {
    let products = this.session.retrieve(Types.PRODUCTS);
    if( products && products[id] ){
      return products[id];
    }
    return null;
  }

  public remove = (type:string ,id:string) => {
    let items:any|null = this.session.retrieve(type);

    //if tracking exists
    if(items[type]){
      let item = items[id];

      //& item in tracking exists delete it and store tracking
      item[id] ? delete items[type][id] : null;
      this.session.trackItem(type,items);
    }
  }

  //picking store product points
  private add = (key:string, ref:product) => {

    //if not of right type just return
    if( !ref || !ref.name || ! ref.id  ) return;

    //if we cannot create product then just return
    let id = FluxMethods.productKey(ref);
    if(!id) return;

    let item:productPoint = {
      name: ref.name,
      product_id: id,
      count: 1
    }

    //store with out action call on type
    // this.session.store(Types.CURRENT_ITEM,ref);
    Actions['setViewed'](ref);

    //store with action call on type
    // this.session.trackItem(key,{[id]:item});
    Actions['sessionTracking']({[id]:item});


  }
}
export default new Tracker();
