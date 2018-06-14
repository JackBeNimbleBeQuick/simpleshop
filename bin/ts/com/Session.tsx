/// <reference path="../com.interface.d.ts"/>
import Config from './Coms.config';
import {Connected} from './Connected';

export class Session implements Session{

  private connected:Connected|null = null;
  private config:services |null = null;
  private forward: Function;

  constructor(){
  }

  /**
   * entity / context based permissions support
   * @type {string}
   */
  public permitted = (key:string) => {
    let stored = this.retrieve('login');
    if ( ! stored || ! this.logged(stored) ) return false;
    if(stored.permits && stored.permits.zones[key]) return stored.permits.zones[key];
    return false;
  }

  public login = (data:any, success:Function, error:Function) => {
    this.forward = success;

    let succeeds = (response:any) => {
      //@TODO work this into to validator
      let s_resp =  JSON.parse(response);
      let compare:any  = this.serviceConfig().params.login_success;
      if(s_resp.status && compare.status && s_resp.status === compare.status ){
        //@NOTE stub out for a client Object interface that should get
        // . created to meet your needs
        this.storeSessionData({
          logged_in: true,
          pid: data.username,
          name: "Yosemite Sam",
          key: 'login',
          permits:{ // making things explicit
            zones:{
              appointments: true
            }
          },
        });
        return this.forward(true);
      }
      return error(response)
    }


    this.connect().send(this.loginPostage(data),succeeds, error);
  }

  /**
   * Explains itself
   * @return {string}
   */
  public loginName = () => {
    let login = this.retrieve('login');
    if(login) return login.name;
    return 'Not logged in...';

  }

  /**
   * Explains itself
   * @return {boolean}
   */
  public logout = () => {
    window.sessionStorage
     ? window.sessionStorage.clear()
     : null;
   return true;
  }

  /**
   * push on to stack of items
   * @type {[type]}
   * we always have an array or nothing in this use case
   */
  public pushItem = (key:string, body:any) => {

    let _new     = [];
    let existing = this.retrieve(key);
    existing && existing.length ? existing.push(body) : _new.push(body);

    let value = existing && existing.length ? existing : _new;

    this.storage().setItem(key, JSON.stringify(value));
  }


  /**
   * provides for tracking various arbitrary interactions of a site
   * @param {key:string, body:any}
   * @return {void}
   */
  public trackItem = (key:string, body:any) => {
    let isPrimative = /\b(string|number)\b/.test(typeof body);
    this.storage().setItem(key,
      isPrimative ? body : JSON.stringify(body)
    );
  }

  /**
   * Returns boolean for whether this is a logged in instance
   * .where the most general details live
   * @return {boolean}
   */
  public loggedIn = ():boolean => {
    return this.logged(this.retrieve('login'));
  }

  /**
   * Internal method for loggedIn
   * .where the implementation details live
   * @type {[type]}
   */
  private logged = (session: SessionData) => {
    let login = this.retrieve('login');
    if(login && login.logged_in) return login.logged_in;
    return false;
  }

  /**
   * Hydrate the service config object lazy boy style
   * @return {any}
   */
  public serviceConfig  = ():services=> {
    if(this.config) return this.config;
    this.config = Config.getServices();
    return this.config;
  }

  /**
   * Lazy load for the connection layer /layer's
   * @returns {Function|Class} that implements Connected interface
   */
  private connect = () => {
    if (this.connected) return this.connected;
    this.connected  = new Connected();
    return this.connected;
  }

  /**
   * This packaging for the relevent :Postage for Connected Interface
   * @return {postage}
   */
  private loginPostage = (data:Object) => {
    if( ! this.config) this.config = Config.getServices();
    let service = this.serviceConfig().params;
    return {
        url: service.base + service.login,
        type: 'POST',
        data: JSON.stringify(data),
        header_type: 'form'
    }
  }

  /**
   * Wrapper for login storage
   * @type {SessionData}
   */
  private storeSessionData = (data: SessionData) =>{
    this.storage().setItem(data.key, JSON.stringify(data));
  }

  /**
   * storage handlers which could include DBs with connection
   * credentials delegated to the protected auth mehods
   * @type {StorageInferface|Object}
   */
  private storage = () => {
    if (window.sessionStorage) {
      return window.sessionStorage;
    }
    throw Error('this device / browser is not supportind sessionStorage ~8^[');
  }

  /**
   * always returns the object stored or empty object;
   * @type {Object}
   */
  public retrieveObject = (key:string) => {
    let find = this.retrieve(key);
    return find===null ? {} : find;

  }

  /**
   * Provides access to sessionStorage | boolean | throw fit
   * @return {boolean | SessionData }
   */
  public retrieve = (key:string) => {
    let store = this.storage();
    let  found = store.getItem(key);
    if( typeof found ==='string' && found.length) return JSON.parse(found);
    return null;
  }
}
