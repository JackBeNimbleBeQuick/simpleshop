///<reference path="interface.d.ts" />

import * as React from 'react';
import Shopping from 'containers/views/shopping'
import DisplayBox from 'containers/parts/displaybox'
import Store from 'data/store'
import Types from 'data/types'
import SidePanel from 'containers/parts/sidepanel';
import {Container} from 'flux/utils';

/**
 * Redux container consumes React Component and provides basic linkage to
 * the Action -> Dispatch -> ReduceStore cycle
 * @type {React.Component}
 */
export let AppContainer = Container.create(class extends React.Component<any, any> {

  static getStores() {
      return [
        Store
      ]
  }

  //@NOTE Really does nothing at this point other than provides
  //@NOTE example of what withProps.
  static calculateState(prevState: any, props: any): any{
    let sc = Store.getState();

    if(sc){

      let shapes = {}

      if( sc[Types.SESSION_TRACKING])
        shapes['sessionTracking'] = sc[Types.SESSION_TRACKING].data;

      if( sc[Types.GET_DATA])
        shapes['updatePage'] = sc[Types.GET_DATA].data;

      if( sc['viewed'])
        shapes['view'] = sc['viewed'].data;

      console.log(shapes);

      return shapes;
    }

    return sc;
  }

  /**
   * @return {DOMElement} composition
   * each will set listener for store changes in
   * componentDidMount : @NOTE I am still looking for something more elegant for this
   */
  render() {

    return (
      <div className="page">
        <Shopping/>
        <SidePanel/>
        <DisplayBox/>
      </div>
    );

  }


}, { withProps: true });

export default AppContainer;
