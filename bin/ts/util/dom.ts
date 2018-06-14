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



  //*** ITS A DRAG ***
  //*** Reference
  //***
  /*
  public setDraggable = (el:HTMLElement) => {


    /* events fired on the draggable target
    document.addEventListener("drag", ( event:MouseEvent ) => {

    }, false);

    document.addEventListener("dragstart", ()=>( event:MouseEvent, callback:Function  ) {
        if(event.target.style )
        callback(event.target);
    }, false);

    document.addEventListener("dragend", function( event ) {
        event.target.style.opacity = "";
    }, false);

    document.addEventListener("dragover", function( event ) {
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", function( event ) {
        if ( event.target.className == "dropzone" ) {
            event.target.style.background = "purple";
        }

    }, false);

    document.addEventListener("dragleave", function( event ) {
        if ( event.target.className == "dropzone" ) {
            event.target.style.background = "";
        }

    }, false);

    document.addEventListener("drop", function( event ) {
        event.preventDefault();
        if ( event.target.className == "dropzone" ) {
            event.target.style.background = "";
            dragged.parentNode.removeChild( dragged );
            event.target.appendChild( dragged );
        }

    }, false);

  }
    */
}
export default DomUtils;
