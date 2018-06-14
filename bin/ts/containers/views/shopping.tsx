///<reference path="../../interface.d.ts" />

import * as React from 'react';
import Store from 'data/Store';

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
    expander: ()=>{alert('Shopping saiz expander: Hey do not forget to override me 8^)')},
  }

  constructor(props:any){
    super(props);
  }

  select = (e) => {
    e.preventDefault();
    alert('dropping in cart 8^)');
  }

  view= (e) => {
    e.preventDefault();
    alert('viewing now 8^)');
  }

  renderList = () =>{
    let list;
    if(this.props.shoppingProps){
      list = this.props.shoppingProps.groups.map((product,i)=>{
        return(
          <ShopperFrame
            key= {i}
            product = {product}
            expander = {this.props.expander}
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
