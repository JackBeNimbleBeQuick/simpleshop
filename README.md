# Project Title
> CSS Basics for SASS and Typescript
* gulp 4: to lean forward and embrace the new
  - requires some gulp 4 environmental stuff which may change soon ( gulp 4 is still in Alpha so keep you eyes open 8^)
  - gulp 4 still has babel dependencies
* typescript:  
  - this provide very bare bones setup for lib that does nothing
* webpack:  is included but not fully wire together yet

## Getting Started
- Follow gulp4 setup: [Gulp 4 setup may change](https://www.npmjs.com/package/gulp4)
- may I suggest Node Version Management [npm nvm](https://github.com/creationix/nvm) | [npm nvm-windows](https://github.com/coreybutler/nvm-windows) if you have not done so yet
- install and setup typescript [ts](https://www.npmjs.com/package/typescript)

...
mkdir myWebProject
cd myWebProject
npm install


### Goals
To provide the basics for:
- Sass
- typescript
- webpack * (see above though)

. Sass provides a basic grid, variables, and mix-ins
. Typescript is just the setup for getting started
. Webpak is just there for now

### Sass Files
- _main.scss:_ gathers the files used in compiling and provides the basic grid setup
- _partials/\_grid:_ is just that
- _partials/\_main:_ is start of project / namespaced styles for your project and can | should be replaced
- _vars/\_var:_ hold the grid setup, you may want to clean this to support your color theming scheme
- _vars/\_mixes:_ some sample mix-ins are provided

#Command lines
  - tsc (if you set up typescript global)
  - gulp css (generates and drops css into public/css)
  - gulp js (transcribes ts to js)  
  - gulp moveJs ( applies webpack build and moves result to public/js )  
