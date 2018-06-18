///<reference path="../interface.d.ts" />
import {Session} from 'com/Session';
import FluxMethods from 'util/fluxmethods';
import Types from 'data/types';

export class Tracker{

  private session:Session;

  private visits: Array<product>;

  private views: Array<groups>;

  private cart: Array<product>;

  constructor(){
    this.session = new Session();
  }

  public viewedItem = (visited:product) => {
    this.add('viewed', visited);
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
   * .if no
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

    //items retrieved
    let items:any|null = this.session.retrieveObject(key);

    //if it has been accessed already increment count of it
    if(items[id]){
      items[id].count += 1;
    }else{
      items[id] = item;
    }

    items['selected'] = ref;

    console.log(items);

    this.session.trackItem(key,items);


  }
}
export default new Tracker();
