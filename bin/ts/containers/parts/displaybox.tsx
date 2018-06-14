import * as React from 'react';
import Closer from 'component/closer';
import Image from 'component/image';

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
      pointer: 0
    }
  }

  changeSlide = (dir) => {
    // console.log(dir);
    let point = this.state.pointer;
    let len   = this.props.images.length;

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

  slideSelect = (slide) => {
    this.setState({pointer:  slide});
  }

  renderImagePanel = () =>{
    let list = this.props.images.map((image,i)=>{

      let classes = ['sidebar', i==this.state.pointer ? 'selected' : ''];

      return(
        <li className={classes.join(' ')} key={i}>
          <Image
            image = {image}
            alt = {this.props.alt}
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

  render() {

    let zone = 'main';

    return(
        <div className="bg-block" >
          <Closer
            open={true}
            handler={this.props.closer}
          />
          <div className="presentation-box">

            <div className="view" >

              <span className="clickbar left" onClick={this.changeSlide.bind(this,'left')} >
                <span className="indicate left" ></span>
              </span>

              <Image
                image = {this.props.images[this.state.pointer]}
                alt = {this.props.product.name}
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
