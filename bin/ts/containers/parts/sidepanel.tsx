
///<reference path="../../interface.d.ts" />

import * as React from 'react';
import ShopperFrame from 'containers/parts/shopperframe';
import Image from 'component/image';
import FluxMethods from 'util/fluxmethods';
import Tracker from 'data/tracker';
import Types from 'data/types';
import Store from 'data/store';
import {Session} from 'com/Session';

export class SidePanel extends React.Component<any,any>{

  static defaultProps = {
    label: 'sidebar',
    history: {},
    history_name: 'history:',
    last_seen: null,
  }

  submit = (e:any) =>{
    console.log(e);
  }

  constructor(props:any){
    super(props);
    this.state = {
      history: this.props.history,
      last_seen: this.props.last_seen,
      opened:false,
      session: new Session()
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
  componentDidMount(){
    console.log('SidePanel did mount:');
    //@NOTE using a single method for accessing values from
    // data store listeners...
    FluxMethods.catchStoreChanges({
      store_key: Types.SESSION_TRACKING,
      callback: (prods:products) => {
        if(!prods) return false;
        this.filterProdListAndSetState(prods);
      }
    });

    FluxMethods.catchStoreChanges({
      store_key: Types.CURRENT_ITEM,
      callback: (prod:product) => {
        if(!prod) return false;
        this.setLastViewed(prod);
      }
    });

    window.addEventListener('resize', (e)=>{
      this.setState({aspect: window.outerWidth/window.outerHeight});
    });

    console.log('SidePanel getting initial state');
    console.log(FluxMethods.getState(Types.SESSION_TRACKING));

    this.filterProdListAndSetState(FluxMethods.getState(Types.SESSION_TRACKING));
    this.setLastViewed(FluxMethods.getState(Types.CURRENT_ITEM));

  }

  setLastViewed = (prod:product) => {
    if(prod && prod.id)
      this.setState({last_seen: prod});
  }

  /**
   * Provides clean history for both init state and changes on state
   * @param  {products} prods
   * @return {stateChange}
   */
  filterProdListAndSetState = (prods:products) => {

    return this.setState({
      // last_seen: this.state.session.retrieve(Types.CURRENT_ITEM),
      history:  prods ? prods : {}
    });

  }

  /**
   * Open state of tab / panel
   * @param  {any} e really not used in this context
   * @return {void}
   * results in toggling the open state of panel
   */
  open = (e:any) => {
    console.log(e);
    this.setState({
      opened: this.state.opened ? false : true
    });
  }

  /** Stubs for future functionality START**/
  search = (e:any) => {
    e.preventDefault();
    console.log(e);
  }

  selectLast = (e:any) => {
    console.log(e);
  }

  selectFromHistory = (e:any) => {
    console.log(e);
  }

  selectFromShoping = (e:any) => {
    console.log(e);
  }
  /** Stubs for future functionality END**/

  clearHistory = (e:any) => {
    // console.log(e);
    //@NOTE clears the data store that then provides the
    //@NOTE Reset action for ReduceStore for app state
    this.state.session.clearTracking();

    this.setState({
      history: {},
    });
  }

  renderHistory = () => {
    // console.log(this.state.history);
    let prodKeys = this.state.history ? Object.keys(this.state.history) : [];
    if(prodKeys.length){
      let history = prodKeys.map((index, i)=>{
        
        //@TODO create Actions.findProduct with FIND_PRODUCT type and move to Store/Reduce
        let prod = Tracker.findProduct(index);
        return (
          <ul className="row product" key={i}>
            <li className="image">
              <Image
                handler = {this.selectFromHistory}
                alt = {prod.name}
                image = {prod.thumbnail}
              />
            </li>
            <li className="text">
              {prod.name}
            </li>
          </ul>
        );

      });
      return (
        <div className="history">
          <button className="button left" onClick={e=>this.clearHistory(e)} >
            clear
          </button>
          <h4> {this.props.history_name}</h4>
          <div className="list">
            {history}
          </div>
        </div>
      );
    }
    return null;
  }

  renderLastSeen = () => {

    if(this.state.last_seen){
      return(
        <div className="last-seen">
          <ShopperFrame
            heading= "last seen:"
            expander={(e) => this.selectLast(e)}
            product= {this.state.last_seen}
          />
        </div>
      );
    }
    return null;
  }

  render(){
    let tab = ['sidepanel', this.state.opened ? 'open' :null]

    return(
      <div className={tab.join(" ")}>
        <span className="tab" onClick={e => this.open(e)}>
          {this.props.label}
        </span>
        <div className="view">
          <div className="heading">
            <form onSubmit={e=>{this.search(e)}}>
              <label className="search">
                <input type="text" name="search" placeholder="find stuff"/>
              </label>
              <input type="submit" value="find"/>
            </form>
          </div>
            {this.renderLastSeen()}
            {this.renderHistory()}
        </div>
      </div>
    );
  }
}

export default SidePanel;
