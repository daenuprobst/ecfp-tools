const Random = require('random-js')

class Ecfp {
  constructor (seed = 42) {
    this.seed = seed
    this.rand = new Random(Random.engines.mt19937().seed(this.seed))
  }

  /**
   * Returns a random fingerprint with a specified length.
   * 
   * @param {Number} [length=1024] The length of the fingerprint.
   * 
   * @returns {Uint8Array} An array containing the bits of the randomly generated fingerprint.
   */
  random (length = 1024) {    
    let fp = new Uint8Array(length)

    for (var i = 0; i < length; i++) {
      fp[i] = this.rand.bool() ? 1 : 0
    }

    return fp
  }
}

module.exports = Ecfp