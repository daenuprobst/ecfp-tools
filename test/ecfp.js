const expect = require('chai').expect
const Ecfp = require('../src/ecfp')

let ecfp = new Ecfp()

it('Random fingerprint of a given length', function () { // eslint-disable-line no-undef
  expect(ecfp.random(2048)).to.have.lengthOf(2048)
})