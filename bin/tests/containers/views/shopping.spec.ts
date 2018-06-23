
///<reference path="../../../ts/interface.d.ts" />
///<reference path="../../../ts/react.interface.d.ts" />
import * as  React from 'react';
import * as  ReactDom from 'react-dom';

// import * as TestUtils from "react-addons-test-utils";

import Shallow from 'react-test-renderer/shallow';
import Shopping from '../../../ts/containers/views/shopping';
import Image from '../../../ts/component/image';
import Mock from '../../../ts/com/mock_data';

import Store from '../../../ts/data/store';
import {Fluxcom} from '../../../ts/com/Fluxcom';

import Types from '../../../ts/data/types';

import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

// console.log(ReactDom.render(<Image />));

describe('Shopping unit tests', ()=>{

  /*
  .componentDidMount
  .service call
  .FluxMethods listen to changes
  .Fluxcom service calls
  */

  it('defaultProps: test for props being complete and not ',()=>{});

  it('componentDidMount: fluxmethods change listener',()=>{});

  it('componentDidMount: fluxcom service ',()=>{});

  it('select():   ',()=>{});

  it('view():  ',()=>{});

  it('expand():  ',()=>{});

  it('renderList():  ',()=>{});

  it('render():  ',()=>{});

  it('Loading: when didLoad is false',()=>{
    let shopping = new Shopping({
      // type: 'ReactElement',
      state: {},
      props: {type: 'ReactElement'},
      didLoad: false
    });

    shopping.componentDidMount();
    expect(shopping.state.didLoad).toEqual(false);
    shopping.componentWillUnmount();
    console.log(shopping.state.didLoad);
  });

});



const testPage = '<div id="root" class="container"><div class="page"><div class="shopping"></div><div class="sidepanel "><span class="tab">sidebar</span><div class="view"><div class="heading"><form><label class="search"><input type="text" name="search" placeholder="find stuff"></label><input type="submit" value="find"></form></div><div class="last-seen"><div class="frame col-lg-4 col-sm-12"><h4>last seen:</h4><div class="panel left"><span class="image-wrap"><img alt="Organic Deco Quilt + Shams - Rosette" class="NameMe" src="https://www.westelm.com/weimgs/ab/images/wcm/products/201820/0034/organic-deco-quilt-shams-rosette-1-m.jpg"></span></div><div class="panel right"><h2>Organic Deco Quilt + Shams - Rosette</h2><div class="flags"><span class="flag-newcore rank-3">new</span><span class="flag-organic rank-7">Organic</span></div><div class="price-range"><span class="price"><span class="currency">$</span>29</span><span class="symbol dash"></span><span class="price"><span class="currency">$</span>129</span></div></div></div></div><div class="history"><button class="button left">clear</button><h4> history:</h4><div class="list"><ul class="row product"><li class="image"><span class="image-wrap"><img alt="Organic Deco Quilt + Shams - Blue Teal" class="NameMe" src="https://www.westelm.com/weimgs/ab/images/wcm/products/201820/0034/deco-quilt-shams-m.jpg"></span></li><li class="text">Organic Deco Quilt + Shams - Blue Teal</li></ul><ul class="row product"><li class="image"><span class="image-wrap"><img alt="Organic Abstract Petals Duvet Cover + Shams" class="NameMe" src="https://www.westelm.com/weimgs/ab/images/wcm/products/201820/0034/organic-abstract-petals-duvet-cover-shams-1-m.jpg"></span></li><li class="text">Organic Abstract Petals Duvet Cover + Shams</li></ul><ul class="row product"><li class="image"><span class="image-wrap"><img alt="Organic Bold Stripes Duvet Cover + Shams" class="NameMe" src="https://www.westelm.com/weimgs/ab/images/wcm/products/201820/0035/organic-bold-stripes-duvet-cover-shams-m.jpg"></span></li><li class="text">Organic Bold Stripes Duvet Cover + Shams</li></ul><ul class="row product"><li class="image"><span class="image-wrap"><img alt="Organic Deco Quilt + Shams - Pewter" class="NameMe" src="https://www.westelm.com/weimgs/ab/images/wcm/products/201820/0034/organic-deco-quilt-shams-pewter-2-m.jpg"></span></li><li class="text">Organic Deco Quilt + Shams - Pewter</li></ul><ul class="row product"><li class="image"><span class="image-wrap"><img alt="Organic Pebble Dots Duvet Cover + Shams" class="NameMe" src="https://www.westelm.com/weimgs/ab/images/wcm/products/201818/0043/organic-pebble-dots-duvet-cover-shams-m.jpg"></span></li><li class="text">Organic Pebble Dots Duvet Cover + Shams</li></ul><ul class="row product"><li class="image"><span class="image-wrap"><img alt="Organic Deco Quilt + Shams - Rosette" class="NameMe" src="https://www.westelm.com/weimgs/ab/images/wcm/products/201820/0034/organic-deco-quilt-shams-rosette-1-m.jpg"></span></li><li class="text">Organic Deco Quilt + Shams - Rosette</li></ul></div></div></div></div></div></div>';
