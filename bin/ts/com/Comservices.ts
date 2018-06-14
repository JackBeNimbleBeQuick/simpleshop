
/// <reference path="../com.interface.d.ts"/>
import {Connected} from 'com/Connected';
import {Session} from 'com/Session';

export class Comservices{

  private services:services;

  private session:Session;

  private connect:Connected;

  private forward:Function;

  constructor(){
    this.session = new Session();
    this.services = this.session.serviceConfig();
    this.connect = new Connected();
  }

  //POST @NOTE Build out others as needed
  /**
   * @TODO Move this to somewhere that makes better sense
   * Get Appointments History
   * @param {Function} success
   * @param  {Function} error
   * @return {void} Connected:sends passes results to the passed in functions
   */
  public post = (post:postage ,success:Function, error:Function ) => {
    let params = this.services.params;
    this.forward = success;
    this.connect.send({
      url: params.base + params.uri,
      type: 'POST',
      data: JSON.stringify(post),
      header_type: 'form',
    },this.packager, error);
  }

  //GET
  /**
   * @TODO Move this to somewhere that makes better sense
   * Get Appointments History
   * @param {Function} success
   * @param  {Function} error
   * @return {void} Connected:sends passes results to the passed in functions
   */
  public get= (success:Function, error:Function ) =>{
    let params = this.services.params;
    this.forward = success;
    this.connect.send({
      url: params.base + params.uri,
      type: 'GET',
      data: null, // 8^) looking into this
      header_type: 'form_ac'
    },this.packager, error);
  }

  //PACKAGE
  /**
   * To handle hydration and any other needs that may be needed
   * as the app layer evolves so as to provide
   * . single simple call signatures at app level
   * . offload and communication details from the app layer
   * . maintain reusability with other communication types
   * @param  data
   * @return
   */
  private packager = (data:any) => {
    // console.log(data);
    let boxed = typeof data === 'object' ? data : JSON.parse(data);
    return this.forward(boxed);
  }


}
