

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

  setViewed: (data) =>{
    Dispatcher.dispatch({
      type: Types.CURRENT_ITEM,
      data,
    });
  },

  addToCart: (data) =>{
    Dispatcher.dispatch({
      type: Types.PURCHASE_CART,
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
