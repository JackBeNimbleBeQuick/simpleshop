

import Types from 'data/types';
import Dispatcher from 'data/dispatcher';

const Actions = {

  sessionTracking: (data) =>{
    Dispatcher.dispatch({
      type: Types.SESSION_TRACKING,
      data,
    });
  },

  updatePage: (data) =>{
    Dispatcher.dispatch({
      type: Types.GET_DATA,
      data,
    });
  },

  setViewd: (data) =>{
    Dispatcher.dispatch({
      type: Types.SET_VIEWED,
      data,
    });
  },

  reset: (data) => {
    Dispatcher.dispatch({
      type: Types.RESET_TRACKING,
      data,
    });
  }

}
export default Actions;
