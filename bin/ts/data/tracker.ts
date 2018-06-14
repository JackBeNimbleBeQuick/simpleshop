///<reference path="../interface.d.ts" />
import {Session} from 'com/Session';

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

    //this item packaged as interface item
    let match =  ref.id.match(/[a-z]{1}\d{4}/gi);
    if(!match) return;
    let id = match[0];

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

    console.log(items);

    this.session.trackItem(key,items);


  }

}
