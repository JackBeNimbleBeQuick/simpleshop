
///<reference path="../com.interface.d.ts" />

import Actions from 'data/actions';
import Types from 'data/Types';
import Config from 'com/Coms.config';
import Mock from 'com/mock_data';

import {Comservices} from 'com/Comservices';

export class Fluxcom{

  private services:Comservices;

  private env:string;

  constructor(){
    this.services  = new Comservices();
    this.env       = Config.getServices().env
  }

  public send = (req:request) => {
    if(this.env === 'dev') return this.act(req,new Mock());

    let success = (response) =>{
      this.act(req, response);
    }

    this.services.post(
      this.postage(req), success, this.errors
    );

  }

  private errors = (response:any) => {
    console.log(response);
  }

  private act = (req:request, response:any) => {
    Actions[req.action](response);
  }

  private postage(req:request):postage{
    let params = Config.getServices().params;

    return {
      url: params.base + req.uri,
      data: req.data,
      type: req.type
    }
  }


}
