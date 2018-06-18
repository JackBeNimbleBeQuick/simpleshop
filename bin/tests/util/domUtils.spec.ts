

import DomUtils from '../../ts/util/dom';


/**
 * lanscape aspect ratios
 * portrait = 1/ aspect_landscape
 */
const dims = {
  iphone678: 0.5622188905547226,
  iphone678Plus: 0.5625,
  iphone5se: 0.5633802816901409,
}

const proofs = [
  {
    string: '0.75',
    margin:  .001,
    number: 0.75,
  },
  {
    string: '75%',
    margin:  .001,
    number: 0.75,
  },
  {
    string: '1',
    margin:  .001,
    number: 1,
  },
  {
    string: '100%',
    margin:  .001,
    number: 1,
  },
]


let roundDown = (value: number, factor:number, precision: number) => {
  return  Math.floor( factor * value * precision) / precision;
}

describe('dom utils test',()=>{


  it('rebox test for return of css object',()=>{
    for(let i in dims){

      console.log(`device: ${i}`);

      let ratio = dims[i];

      for(let p in proofs){

        let pr = proofs[p];

        let width = pr.number * ratio;
        let r_width = roundDown(width, 100, 1000);

        let sides =  (1 - (width + pr.margin) ) / 2;
        let r_side = roundDown(sides, 100, 1000);
        // console.log(`sides: ${sides} margin: ${pr.margin} = ${sides + pr.margin}`)

        let result = DomUtils.rebox(pr.string, pr.margin, dims[i])

        expect(result.width).toEqual(r_width+'%');
        expect(result.marginRight).toEqual(r_side+'%');
        expect(result.marginLeft).toEqual(r_side+'%');
        console.log(`w: ${r_width} s: ${r_side}`);
        // console.log(result);

      }

    }

  })

});
