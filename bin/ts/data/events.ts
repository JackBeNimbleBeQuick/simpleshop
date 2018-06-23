
import {EventEmitter} from 'events';
import Types from 'data/types';

export class Events extends EventEmitter{

  constructor(){
    super();
  }

  public emitChange = (type) => {
    this.emit(type);
  }

  public addEvent = (type:string, callback: any) => {
    this.on(type, callback);
  }

  public removeEvent = (type:string, callback: any) => {
    this.removeListener(type, callback);
  }

}

export default Events;
