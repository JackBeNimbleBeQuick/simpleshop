import {DOMWatchers} from './DOM/Watchers';
document.addEventListener('DOMContentLoaded', function(event){
  let dom = new DOMWatchers('window_stat');
  dom.resize('span.right');
});
