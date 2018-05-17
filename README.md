# Project Title
> CSS Basics for SASS and Typescript
* gulp 4: to lean forward and embrace the new
  - requires some gulp 4 environmental stuff which may change soon ( gulp 4 is still in Alpha so keep you eyes open 8^)
  - gulp 4 still has babel dependencies: I will be exploring whether this can be replaced with typescript as I find that to be cleaner
* typescript implementaion:  
  - this provides very bare bones setup for lib that does nothing much
* webpack:  is included and it works in gulp tasks: the base webpack.config needs work

## Getting Started
- Follow gulp4 setup: [Gulp 4 setup may change](https://www.npmjs.com/package/gulp4)
- may I suggest Node Version Management [npm nvm](https://github.com/creationix/nvm) | [npm nvm-windows](https://github.com/coreybutler/nvm-windows) if you have not done so yet
- install and setup typescript [ts](https://www.npmjs.com/package/typescript)
- run all tasks within bin/

...
mkdir myWebProject
cd myWebProject/bin
npm install


### Goals
To provide the basics for:
- Sass
- typescript
- webpack (* Known Issues below)

. Sass provides a basic grid, variables, and mix-ins
. Typescript is just the setup for getting started
. Webpak is just there for now

### Sass Files
- _main.scss:_ gathers the files used in compiling and provides the basic grid setup
- _partials/\_grid:_ is just that
- _partials/\_main:_ is start of project / namespaced styles for your project and can | should be replaced
- _vars/\_var:_ hold the grid setup, you may want to clean this to support your color theming scheme
- _vars/\_mixes:_ some sample mix-ins are provided

###Command lines
  - tsc (if you set up typescript global)
  - gulp css (generates and drops css into public/css)
  - gulp js (transcribes ts to js and moves result to public/js)  

###Known Issues and Future
  - npm audit discoveries are now being worked through.
    - Gulp-sass has known security dependencies: exploring use of npm-sas or other options that do not insert these dependencies
  - exploring removal of babel dependencies for implementing a cleaner es6+ implementation
  - Make the installation work both for tsc and webpack at the command line. The first iteration was providing a new gulp implementation the following will be next
    - Current webpack.config.js has issues that are being worked on..
    - Current tsconfig.json still needs a round of proofing
