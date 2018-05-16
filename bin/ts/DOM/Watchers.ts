

export class DOMWatchers{

  private stat_id:string;

  private watch_list:Object;

  /**
   * @return DOMWatchers
   */
  public constructor(stat_id){
    this.stat_id = stat_id;
    this.resizeEnd();
  }

  /**
   * to get things going we just set up some listener / tracking stuff
   * @param {String} selector
   * @return {Void}
   */
  public resize( selector: string){

    let watcher = this;

    watcher.attachNotice('getting started');

    watcher.setWatchlist(selector);

    window.addEventListener('resize-end', function(event){
      watcher.updateNotice();
    });
  }

  /**
   * create watch list from the selector that was provided
   * @param  string selector
   *
   */
  private setWatchlist(selector: string){

    let dom = document.querySelectorAll(selector);
    for(let index in dom){
      let el    = <HTMLElement>dom[index];
      let child = <HTMLElement>el.firstElementChild;
      let parent= <HTMLElement>el.parentNode;
      if(child && parent){
        console.log(el);
        console.log(child);
        console.log(parent);
      }
    }
  }

  /**
   * attach the initial notice elements
   * @param  'window_stat'
   * @return {Void}
   */
  private attachNotice= ( string:string) =>{

    let status = document.getElementById(this.stat_id);
    let newEl  = document.createElement('div');
    let text   = document.createTextNode(string);

    newEl.setAttribute('id', this.stat_id + '_notice');
    newEl.appendChild(text);
    status.appendChild(newEl);

  }

  /**
   * simple update in notice block
   */
  private updateNotice = () =>{

    let ww = window.outerWidth;
    let wh = window.outerHeight;
    let string = 'width: __w height: __h'.replace('__w',String(ww)).replace('__h',String(wh));

    let sb     = document.getElementById(this.stat_id );
    let status = document.getElementById(this.stat_id + '_notice');
    let text   = document.createTextNode(string);

    status.innerHTML = '';
    status.appendChild(text);
    sb.style.opacity = "1";
    setTimeout(()=>{sb.style.opacity="0";},2000);

  }

  /**
   * Candidate for timers util
   * @return CustomEvent
   */
  private resizeEnd = () =>{
    let resizeTimer;
    window.addEventListener('resize', function(event){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        window.dispatchEvent(new CustomEvent('resize-end',{}));
      }, 500);
    });


  }
}
