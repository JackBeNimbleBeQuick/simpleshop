///<reference path="../dom.interface.d.ts" />

export class DomUtils{

  public static isBrowser = ! document == false;


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


}
export default DomUtils;
