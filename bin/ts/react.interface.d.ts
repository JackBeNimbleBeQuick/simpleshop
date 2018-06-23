//missing types for tsc
interface shoppingProps{
 categories: Array<string>,
 groups: Array<products>,
 id: string,
 name: string,
 totalPages:number
}

interface shoppingState{
  type: HTMLElement,
  any: any
}

interface ReactElement{
  any:any,
}

interface scrollTops{
  el?:HTMLElement,
  top?:number,
}

interface DisplayBox{
  state?:shoppingProps,
  shoppingProps?:shoppingProps,
}

interface Shopping{
  props:any,
  state:any,
}

interface SidePanel{
  state:any,
}

interface ShopperFrame{
  state:any,
}

interface FluxMethods{
  catchStoreChanges(flux_stroe): Function
  productKey: string
  getState(string): Object

}
