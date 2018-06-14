

import Types from 'data/types';
import Dispatcher from 'data/dispatcher';

const Actions = {

  updatePage: (data) =>{
    Dispatcher.dispatch({
      type: Types.GET_DATA,
      shoppingProps: data
    });
  }
}
export default Actions;
