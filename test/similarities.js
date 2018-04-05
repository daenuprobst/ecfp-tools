const expect = require('chai').expect
const Similarities = require('../src/similarities')
const Ecfp =  require('../src/ecfp')

let ecfp = new Ecfp()

let fp1 = ecfp.random()
let fp2 = ecfp.random()

it('Calculate similarity of two binary (ecfp) vectors', function () { // eslint-disable-line no-undef
  expect(Similarities.jaccard(fp1, fp2)).to.equal(0.3094928478543563)
})