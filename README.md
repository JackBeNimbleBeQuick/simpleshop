# Project Title
> Simple Shopping App ...

* responsive sass build that supports custom grid settings
* typescript implementation:  
* webpack development:  
* Rreact:  
* Flux: with simple Sessions Handling and Connector Ajax


## Getting Started
- Follow gulp4 setup: [Gulp 4 setup may change](https://www.npmjs.com/package/gulp4)
- may I suggest Node Version Management [npm nvm](https://github.com/creationix/nvm) | [npm nvm-windows](https://github.com/coreybutler/nvm-windows) if you have not done so yet
  - this package assembled with npm v8.9.4
- install and setup typescript [ts](https://www.npmjs.com/package/typescript)
- run all tasks within bin/

...
- mkdir myWebProject
- git clone ...simpleshop.git
- cd simpleshop/bin
- npm install

### Goals
To provide the basics for:
- simple shop view select frames using simple Session tracking
- sass
  - sass provides a basic grid, variables, and mix-ins
  - create stable responsive UI
- typescript
  - provides strong typing and interfaces
  - shopping data structure has been typed in root interface.d
- webpack
  - webpack provide a typescript to js rule
  - webpack-server to assist in fast build

### Sass Files
- _main.scss:_ gathers the files used in compiling and provides the basic grid setup
- _common/\_grid:_ is just that
- _component/\_main:_ is start of project / name-spaced styles for your project and can | should be replaced
  - component styles are maintain in /sass for faster dev at any time they can be moved into the component to support reuse
- _vars/\_var:\_ hold the grid setup, you may want to clean this to support your color theming scheme
- _vars/\_mixes:\_ some sample mix-ins are provided

### Command lines
  - gulp build
    - (generates and drops css into public/css)
  - npm start
  - read gulpfile for other tasks

### Known Issues and Future
  - npm audit discoveries are now being worked through.
    - gulp-sass has known security dependencies:
      - [stringstream](https://nodesecurity.io/advisories/664)
      - [hoek](https://nodesecurity.io/advisories/566)
      - [tunnel-agent](https://nodesecurity.io/advisories/598)
      - [lodash](https://nodesecurity.io/advisories/577)
  - exploring removal of babel dependencies for implementing a cleaner es6+ implementation

### other considerations
  - jest has been setup for building main library validations
  - jest with puppet can be implemented for UI testing, though at this stage that is not yet implemented
  - typescript provide incremental improves in code stability as with each refinement of the interfaces things become harder to break with each dev cycle
  - next steps would include finishing out the unit tests setups and implementing a full solution for submission of work as stories in a continuous build context
