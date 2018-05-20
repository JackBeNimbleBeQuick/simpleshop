# Project Title
> Typescript, SASS, Webpack kick starter, providing the TUC pattern
* gulp 4: we might as well start using this stuff now ... right?
  - requires some gulp 4 environmental stuff which may change soon ( gulp 4 is still in Alpha so keep you eyes open 8^)
  - gulp 4 es6 still has babel dependencies: I will be exploring whether this can be replaced with typescript as I find that to be cleaner

* responsive sass build that supports custom grid settings
* typescript implementation:  
  - this provides very bare bones setup for lib that does nothing much
* webpack:  

## Getting Started
- Follow gulp4 setup: <a href="https://www.npmjs.com/package/gulp4" target="_blank" >Gulp 4 setup may change</a>
- may I suggest Node Version Management <a href="https://github.com/creationix/nvm" target="_blank" >npm nvm</a> | <a href="https://github.com/coreybutler/nvm-windows" target="_blank" >npm nvm-windows</a>
 if you have not done so yet
  - this package assembled with npm v8.9.4
- install and setup typescript <a href="https://www.npmjs.com/package/typescript" target="_blank" >ts</a>
- run all tasks within bin/

...
- mkdir myWebProject
- git clone ...this_url_may_change.git
- cd into_name_of_this_thing/bin
- npm install

### Goals
To provide the basics for:
- sass
  - sass provides a basic grid, variables, and mix-ins
- typescript
  - typescript is just the setup for getting started
- webpack
  - webpak provide a typescript to js rule

### Sass Files
- _main.scss:_ gathers the files used in compiling and provides the basic grid setup
- _partials/\_grid:_ is just that
- _partials/\_main:_ is start of project / namespaced styles for your project and can | should be replaced
- _vars/\_var:\_ hold the grid setup, you may want to clean this to support your color theming scheme
- _vars/\_mixes:\_ some sample mix-ins are provided

### Command lines
  - tsc (if you set up typescript global)
  - gulp css (generates and drops css into public/css)
  - gulp js (transcribes ts to js and moves result to public/js)  

### Known Issues and Future
  - npm audit discoveries are now being worked through.
    - gulp-sass has known security dependencies:
      - <a href="https://nodesecurity.io/advisories/664" target="_blank">stringstream</a>
      - <a href="https://nodesecurity.io/advisories/566" target="_blank">hoek</a>
      - <a href="https://nodesecurity.io/advisories/598" target="_blank">tunnel-agent</a>
      - <a href="https://nodesecurity.io/advisories/577" target="_blank">lodash</a>
  - exploring removal of babel dependencies for implementing a cleaner es6+ implementation


#### Thanks for playing, do not forget your bobble heads as you head for the gates
  - It does amaze me that even in a little ditty such as this ... how much node from all sorts of mostly unknown sources gets inserted to the mix... 8^) breath deep and enjoy the view... and do not step on the snakes.... they really for some reason do not like that...
