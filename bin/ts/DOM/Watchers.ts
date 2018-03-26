

export class DOMWatchers{

  public construtor(){

  }

  public resize( selector: string){
    let text  = document.querySelectorAll(selector);
    console.log(text);
    window.addEventListener('resize', function(event){
      for(let index in text){
        let el    = <HTMLElement>text[index];
        let child = <HTMLElement>el.firstElementChild;
        let parent= <HTMLElement>el.parentNode;
        console.log(el);
        console.log(child);
        console.log(parent);
      }
    });
  }
}
