///<reference path="../dom.interface.d.ts" />

/**
 * Provides central set of methods for dom based activities
 * so as to keep things DRY and reusable over time
 * @param  DomUtils.isBrowser
 * @return
 */
export class DomUtils{

  //@NOTE good idea but does not work in unit test... yet 8^)
  public static isBrowser = window && typeof window.document === 'object';


  public static lockScroll = () => {
    if(DomUtils.isBrowser){
      document.querySelector('body').style.overflow = 'hidden';
    }
  }


  public static unLockScroll = (st?:scrollTops) => {
    if(DomUtils.isBrowser){
      document.querySelector('body').style.overflow = 'inherit';
    }
  }

  public static rebox = (box_size: string, margin:number, input_ratio?:number) => {

    let roundDown = (value: number, factor:number, precision: number) => {
      return  Math.floor( factor * value * precision) / precision;
    }

    let ratio = input_ratio;

    if( ! input_ratio ){
      ratio = window.outerHeight/window.outerWidth;
    }

    let percent = box_size.match(/\d+\%/);
    let isPercent = percent != null  &&  percent.length>0 && percent[0]  == box_size;


    let box_s =  parseFloat(box_size);
    if(isPercent || box_s > 1 ){
      box_s = box_s / 100;
    }
    // console.log(`aspect: ${ratio} bs: ${box_s}`);

    if(ratio < 1){

      let width = ratio * box_s;
      let r_width = roundDown(width, 100, 1000);

      let sides   = (1 - (width + margin) ) / 2;
      let r_sides = roundDown(sides, 100, 1000);

      return{
        width: `${r_width}%`,
        marginLeft: `${r_sides}%`,
        marginRight: `${r_sides}%`,
      }
    }
    return null;
  }


}
export default DomUtils;
