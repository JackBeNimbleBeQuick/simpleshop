import {DOMWatchers} from './DOM/Watchers';
document.addEventListener('DOMContentLoaded', function(event){
  let dom = new DOMWatchers();
  dom.resize('span.right');
});
