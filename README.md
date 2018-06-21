# Project Title
> Simple Shopping App ...

* Responsive sass build that supports custom grid settings
* typescript implementation:  
* Webpack used in development:  
* React:  
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
- gulp build

### Goals
To provide the basics for:
- Simple shop view select frames, with simple sessionStorage tracking mechanism
- Flux data and event flow
- sass
  - sass provides a basic grid, variables, and mix-ins
  - this is used to create a stable responsive UI
- typescript
  - provides strong typing and interfaces
  - shopping data structure have been typed in the root interface.d
- webpack
  - webpack provides a typescript to js rule
  - webpack-server is used to run the local site

### Sass Files
- _main.scss:_ gathers the files used in compiling and provides the basic grid setup
- _common/\_grid:_ is just that
- _component/\_main:_ is start of project / name-spaced styles for your project and can | should be replaced
  - component styles are maintain in /sass for faster dev at any time they can be moved into the component to support reuse
- _vars/\_var:\_ hold the grid setup, you may want to clean this to support your color theming scheme
- _vars/\_mixes:\_ some sample mix-ins are provided

### Command lines
  - gulp build
  - read gulpfile for other tasks

### Known Issues and Future
  - npm audit discoveries are now being worked through.
    - gulp-sass has known security dependencies
      - [stringstream](https://nodesecurity.io/advisories/664)
      - [hoek](https://nodesecurity.io/advisories/566)
      - [tunnel-agent](https://nodesecurity.io/advisories/598)
      - [lodash](https://nodesecurity.io/advisories/577)
  - exploring removal of babel dependencies for implementing a cleaner es6+ implementation

### Other considerations
  - jest has been setup for building main library validations some example test have been created
  - jest with puppet can be implemented for UI testing with jest-image-snapshot for UI validations
    - in examining these: snapshots / chromium browser automations can be very build environment specific
    :. those are not provided in this repo and left to the actual build / test continuous build environments
  - typescript provides incremental improvements in code stability, with each refinement of the interfaces, things become harder to break with each dev cycle, which is one of the main reasons this repo start to establish and es6+ dev approach
  - next steps would include finishing out the unit tests setups and implementing a full solution for submission of work as stories in a continuous build context
  - other visited items review is implemented lightly to explore Session base interactions can be store at local client side
  - it would be appropriate to add hand jesture based zooming in the expanded view
