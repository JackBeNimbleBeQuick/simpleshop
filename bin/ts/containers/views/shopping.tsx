///<reference path="../../interface.d.ts" />

import * as React from 'react';
import Tracker from 'data/tracker';
import DomUtils from 'util/dom';
import Store from 'data/store';
import {Fluxcom} from 'com/Fluxcom';

import ShopperFrame from 'containers/parts/shopperframe';

export default class Shopping extends React.Component<any, any>{


  //making things explicit to assist in implementation
  // static defaultProps = {
  //   // type: 'ReactElement',
  //   didLoad: false,
  //   setList: {},
  //   listerners: false,
  //   shoppingProps:{
  //     categories:[],
  //     groups: [],
  //     id: 'Waiting',
  //     name: 'Updating results',
  //     totalPages: 0,
  //   },
  // }

  constructor(props:any){
    super(props);
    this.state = {
      setList: this.setList.bind(this),
      list:this.props.shoppingProps ? this.props.shoppingProps.groups: {},
      didLoad: false,
      connect: new Fluxcom(),
      storeEvents: {}
    }
  }

  /**
   * By using listener on store, this component becomes stateful
   * this means that we carry any properties from defaultProps to state
   *** Stateful Component means:
   *   a) it is not pure
   *   b) render valuees are now drawn from state instead of props
   *
   * @return {void} there is async method to setState
   */
  componentDidMount () {

    console.log('shopping did mount');

    //@NOTE using a single method for accessing values from
    // data store listeners...
    Store.catchStoreChanges({
      id: 'shopper_list',
      store_key: 'GET_DATA',
      callback: this.setList
    });

    console.log('shopping get data call made');

    //@TODO move into actions context
    this.state.connect.send({
      type: 'GET',
      action: 'updatePage',
      uri: 'shop/new/all-new',
    });
  }

  setList = (value:any) => {
    this.setState({
      didLoad: true,
      list: value
    });
  }

  componentWillUnmount () {
    Store.releaseStoreChange('shopper_list')
  }

  select = (e) => {
    e.preventDefault();
    alert('dropping in cart 8^)');
  }

  view= (e) => {
    e.preventDefault();
    alert('viewing now 8^)');
  }

  expand = (product:product) => {
    DomUtils.lockScroll();

    //@TODO create Actions.setViewd with SET_VIEWED type and move to Store/Reduce
    Tracker.viewedItem(product);

    this.setState({
      expanded: true,
      view: product
    });
  }

  renderList = () =>{
    let list;
    // console.log(this.state);
    if(this.state.list && this.state.didLoad){
      list = this.state.list.groups.map((product,i)=>{
        return(
          <ShopperFrame
            key= {i}
            product = {product}
            expander = {this.expand}
          />
        )
      });
    }
    return list;
  }

  render(){
    return(
      <div className="shopping">
        {this.renderList()}
      </div>
    );
  }
}

// export default Shopping;
