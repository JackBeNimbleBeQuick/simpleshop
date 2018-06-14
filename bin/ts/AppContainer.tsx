///<reference path="interface.d.ts" />

import * as React from 'react';
import Shopping from 'containers/views/shopping'
import DisplayBox from 'containers/parts/displaybox'
import Store from 'data/store'
import {Fluxcom} from 'com/Fluxcom';
import {Container} from 'flux/utils';
import {Tracker} from 'data/tracker';
import DomUtils from 'util/dom';


export let AppContainer = Container.create(class extends React.Component<any, any> {

  static defaultProps = {
    shoppingProps: null
  };

  constructor(props){
    super(props)

    //@NOTE first service call to cause state change
    //.this may need to be in a better place
    new Fluxcom().send({
      type: 'GET',
      action: 'updatePage',
      uri: 'shop/new/all-new',
    });

    this.state = {
      tracker: new Tracker(),
      expanded: false,
      view: null
    }
  }

  static getStores() {
      return [
        Store
      ]
  }

  static calculateState(prevState: any, props: any): any{
    return Store.getState();
  }

  expand = (product:product) => {
    DomUtils.lockScroll();
    this.state.tracker.viewedItem(product);

    this.setState({
      expanded: true,
      view: product
    });
  }


  closeExpander = (e) => {
    DomUtils.unLockScroll();

    this.setState({
      expanded: false,
    });
  }

  /**
   * Provides base properties to shopping view component
   * ? is there a better way to do this ?
   * @return {DOMElement}
   * @NOTE React Redux is a pattern not an implementation
   * .for some reason the docs on Container Components are not so clear
   * .some of this is because it is a component ... but then really not because it
   * .provide properites... 8^)
   */
  render() {
    let sc = Store.getState();
    // console.log(sc);

    let sp:shoppingProps = sc.shoppingProps ? sc.shoppingProps.shoppingProps : {
      categories:[],
      groups: [],
      id: 'Waiting',
      name: 'Updating results',
      totalPages: 0,
    }

    let displayBox:any = null;

    if(this.state.expanded){
      //@NOTE @TODO (move to Util) this is perfect thing to get pushed into a Util
      //.make copy as we want hero on top
      let images = [];
       this.state.view.images.map((image,i)=>{
        images.push(image);
      });
      images.unshift(this.state.view.hero);
      // /@END @NOTE @TODO (move to Util) this is perfect thing to get pushed into a Util


      displayBox =
        <DisplayBox
          closer={this.closeExpander}
          product= {this.state.view}
          images={images}
          alt= {this.state.view.name}
        />

    }

    return (
      <div className="page">
        <Shopping
          expander = {this.expand}
          shoppingProps = {sp}
        />
        {displayBox}
      </div>
    );
  }
}, { withProps: true });

export default AppContainer;
