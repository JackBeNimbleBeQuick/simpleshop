//interfaces are the functions and class structures of the persistent layer
//use data_types for data types used as parameters to the interfaces


/* __ JSON Support __*/
// declare module "*.json" {
//     const value: any;
//     export default value;
// }

// @NOTE there may be a new base
// Identifier string that would then not make this necessary
/* __ Primative __*/
interface indexed_number{
  [key:string]:number
}

interface indexed_string{
  [key:string]:string
}

/* __AJAX Communication __*/
interface postage {
  url: string,
  type: string,
  data?: Object|null,
  header_type?: string, //cors,form,json
  wait?: number,
  debug?: Boolean
}

interface serviceClass {
  getServices():services
}

interface services{
  server_port: number,
  env: string,
  params: service
}

interface service{
  base: string,
  login: string,
  login_success: Object,
  uri: string
}

interface request{
  type:string,
  uri:string,
  action:string,
  data?:any
}

interface loginResponse{
  status?:string
}

interface comState{
  [Identifier:number]: comStateItem
}

interface comStateItem{
  key: string,
  explained: string,
}

/*______*/

interface Session {
  data:SessionData,
  permitted(): boolean,
  loggedIn():boolean,
}

interface SessionData{
  logged_in: boolean,
  pid:string,
  name: string,
  key: string,
  permits:Permits,
}

interface Permits{
  zones:Zones,
}

interface Zones{
  appointments:boolean
}

interface connectStatData{
  [Identifier:string]: connectStatItem
}

interface connectStatItem{
  [Identifier:string]: connectStatistics
}

interface connectStatistics{
  [Identifier:string]: number ,
}

/* __ Filters ___ */
interface filterInterface {
  filter(value:any):any
}

/* __ Validators ___ */
interface validatorInterface {
  isValid(value:any):Boolean
}

/* Storage */

interface performance{
  call: string,
  ms: number
}

interface liveData{
  exchangeUsed: string, //i.e. Zelle, Transfers, PayBill, RDC, WU
  call: string,
  performance: performance,
  data_type: string,
  data: string | Object
}
