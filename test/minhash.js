const expect = require('chai').expect
const Minhash = require('../src/minhash')
const Ecfp = require('../src/ecfp')
const Similarities = require('../src/similarities')

let mh1 = new Minhash(128, 42)
let mh2 = new Minhash(128, 42)
let mh3 = new Minhash(128, 42)

mh1.hash([1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0])
mh2.hash([1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0])
mh3.hash([0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1])

it('Jaccard similarity estimations', function () { // eslint-disable-line no-undef
  expect(mh1.jaccard(mh2)).to.equal(0.796875)
  expect(mh1.jaccard(mh3)).to.equal(0.1484375)
})

let h1 = mh1.createHash([1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0])
let h2 = mh1.createHash([1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0])
let h3 = mh1.createHash([0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1])

it('Jaccard similarity estimations using createHash', function () { // eslint-disable-line no-undef
  expect(Minhash.jaccard(h1, h2)).to.equal(0.796875)
  expect(Minhash.jaccard(h1, h3)).to.equal(0.1484375)
})

let ecfp = new Ecfp()
let minhash = new Minhash()
let refFp = ecfp.random()
let refHash = minhash.createHash(refFp)
let diffs = new Array(500)

for (var i = 0; i < 500; i++) {
  let fp = ecfp.random()
  let hash = minhash.createHash(fp)
  diffs[i] = Math.abs(Minhash.jaccard(hash, refHash) - Similarities.jaccard(fp, refFp))
}

it('Average absolute difference between estimated Jaccard and actual Jaccard similarity', function() { // eslint-disable-line no-undef
  expect(diffs.reduce((a, c) => a + c) / diffs.length).to.equal(0.03334140790846902)
})