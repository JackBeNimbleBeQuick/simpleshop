
///<reference path="../../interface.d.ts" />

import * as React from 'react';
import ShopperFrame from 'containers/parts/shopperframe';
import Image from 'component/image';
import FluxMethods from 'util/fluxmethods';
import Tracker from 'data/tracker';
import Types from 'data/types';
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

    //@NOTE using a single method for accessing values from
    // data store listeners...
    FluxMethods.catchStoreChanges({
      store_key: 'SESSION_TRACKING',
      callback: (prods:products) => {
        if(! prods) return false;
        console.log(prods);
        let last_seen = {};
        if(prods && prods.selected){
          last_seen = prods.selected;
          delete prods.selected;
        }
        this.setState({
          last_seen: last_seen,
          history:  prods ? prods : {}
        });
      }
    });

    window.addEventListener('resize', (e)=>{
      this.setState({aspect: window.outerWidth/window.outerHeight});
    });

  }


  open = (e:any) => {
    console.log(e);
    this.setState({
      opened: this.state.opened ? false : true
    });
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

  clearHistory = (e:any) => {
    console.log(e);
    this.state.session.clearTracking();
    this.setState({
      history: {},
      // last_seen: {},
    });
  }

  renderHistory = () => {
    console.log(this.state.history);
    let prodKeys = this.state.history ? Object.keys(this.state.history) : [];
    if(prodKeys.length){
      let history = prodKeys.map((index, i)=>{
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
            <form>
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
