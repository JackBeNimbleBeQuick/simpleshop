///<reference path="../../interface.d.ts" />
import * as React from 'react';
import Closer from 'component/closer';
import Image from 'component/image';
import DomUtils from 'util/dom';
import FluxMethods from 'util/fluxmethods';

class DisplayBox extends React.Component <any, any > {

  static defaultProps = {
    closer: ()=>{alert('DisplayBox saize: we needs closer hanler ! Dude-8^)')},
    product: {},
    images:{
    },
    alt: 'Nice picture of your selection...'
  }

  constructor(props:any){
    super(props);
    this.state = {
      aspect: window.outerWidth / window.outerHeight,
      product: this.props.product,
      images: this.props.images,
      alt: this.props.alt,
      pointer: 0,
      expanded: false
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
      value_key: 'selected',
      callback: (prod:product) => {
        if(! prod) return false;
        this.setState({
          pointer: 0,
          expanded: true,
          product: prod,
          images: this.images(prod),
        });
      }
    });

    window.addEventListener('resize', (e)=>{
      this.setState({aspect: window.outerWidth/window.outerHeight});
    });

  }

  /**
   * Closes out the overlay
   * @return {void}
   */
  closeExpander = () => {
    //util class for DOM related activities
    DomUtils.unLockScroll();

    // re: render with expanded = false will result in
    // .null DisplayBox
    this.setState({
      expanded: false,
    });
  }

  /**
   * Changes current slide based on direction
   * @param  {string} dir
   * @return {void} results in setState() re-render
   */
  changeSlide = (dir) => {
    let point = this.state.pointer;
    let len   = this.state.images.length;

    switch(dir){

      case 'left':
        point = point-1 > -1
          ? point-1 : len-1;
        break;

      case 'right':
      default:
        point = point+1 < len
          ? point+1 : 0;

    }
    this.setState({pointer:  point});
  }

  /**
   * Supports selecting from images marque
   * @param  {number} slide
   *  setState results with re render using new pointer index
   */
  slideSelect = (slide) => {
    this.setState({pointer:  slide});
  }

  /**
   * we need to put hero image on top of marque
   * safest way to do this is to provide new array with it on top
   * @return {[type]} [description]
   */
  images = (prod:product) => {
    //product images we create new Array so as to avoid
    // this.product.images.unshift will polute data that should stay immutable
    let images = [];
    prod.images.map( (image,key)=>{
      images.push(image);
    });
    images.unshift(prod.hero);
    return images;
  }

  /**
   * Render Marque of all images for easy selection
   * @return {[type]} [description]
   */
  renderImagePanel = () =>{
    let list = this.state.images.map((image,i)=>{

      let classes = ['sidebar', i==this.state.pointer ? 'selected' : ''];

      return(
        <li className={classes.join(' ')} key={i}>
          <Image
            image = {image}
            alt = {this.state.product.name}
            handler= { this.slideSelect.bind(this,i)}
          />
        </li>
      );
    });

    return (
      <ul>
        {list}
      </ul>
    );
  }

  /**
   * Render the DisplayBox Sub View
   * . only renders if expand == true
   *
   * @return {HTMLElement|null}
   */
  render() {

    if(! this.state.expanded) return null;

    let style = DomUtils.rebox('75%', .0001);

    return(
        <div className="bg-block" >
          <Closer
            open={true}
            handler={this.closeExpander}
          />
          <div className="presentation-box" style={style} >

            <div className="view" >

              <span className="clickbar left" onClick={this.changeSlide.bind(this,'left')} >
                <span className="indicate left" ></span>
              </span>

              <Image
                image = {this.state.images[this.state.pointer]}
                alt = {this.state.product.name}
                handler = { this.changeSlide.bind(this,'main')}
              />

              <span className="clickbar right" onClick={this.changeSlide.bind(this,'right')} >
                <span className="indicate right" ></span>
              </span>

              <div className="slides" >
                {this.renderImagePanel()}
              </div>
            </div>
          </div>
        </div >
    );
  }
}

export default DisplayBox;
