///<reference path="../../interface.d.ts" />

import * as React from 'react';
import Tracker from 'data/tracker';
import DomUtils from 'util/dom';
import FluxMethods from 'util/fluxmethods';
import {Fluxcom} from 'com/Fluxcom';

import ShopperFrame from 'containers/parts/shopperframe';

class Shopping extends React.Component<any, any>{

  //making things explicit to assist in implementation
  static defaultProps = {
    shoppingProps:{
      categories:[],
      groups: [],
      id: 'Waiting',
      name: 'Updating results',
      totalPages: 0,
    },
  }

  constructor(props:any){
    super(props);
    this.state = {
      list:this.props.shoppingProps.groups,
      didLoad: false,
      connect: new Fluxcom(),
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
    FluxMethods.catchStoreChanges({
      store_key: 'GET_DATA',
      callback: (value) => {
        this.setState({
          didLoad: true,
          list: value });
      }
    });

    console.log('shopping get data call made');

    this.state.connect.send({
      type: 'GET',
      action: 'updatePage',
      uri: 'shop/new/all-new',
    });
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

export default Shopping;
