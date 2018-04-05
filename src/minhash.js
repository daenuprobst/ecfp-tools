const Random = require('random-js')

/**
 * A class to generate minhashes of binary vectors.
 */
class Minhash {
  /**
   * The constructor for the class Minhash.
   * 
   * @param {Number} [nPermutations=128] The number of permutations to be used. 
   * @param {Number} [seed=42] The seed value used to generate the permutations. 
   */
  constructor(nPermutations = 128, seed = 42) {
    this.nPermutations = nPermutations
    this.seed = seed
    this.permutationsA = new Uint32Array(nPermutations)
    this.permutationsB = new Uint32Array(nPermutations)

    var i = 0

    // Initialize the hash values to the maximum
    this.hashValues = new Uint32Array(this.nPermutations)
    for (i = 0; i < nPermutations; i++) {
      this.hashValues[i] = Minhash.maxHash
    }

    // Initialize the permutation functions
    let rand = Random.engines.mt19937().seed(this.seed)
    let dist = Random.integer(0, Minhash.maxHash)

    // Use the set for a look-up rather than the Uint32Arrays
    // as memory is not an issue and this should be a bit faster
    // (while speed isn't really an issue as well here ...)
    let usedRandomIntegers = new Set()
    for (i = 0; i < nPermutations; i++) {
      let a = dist(rand)
      let b = dist(rand)

      while (usedRandomIntegers.has(a)) {
        a = dist(rand)
      }

      while (usedRandomIntegers.has(b)) {
        b = dist(rand)
      }

      usedRandomIntegers.add(a)
      usedRandomIntegers.add(b)

      this.permutationsA[i] = a
      this.permutationsB[i] = b
    }
  }

  /**
   * Generates the hash for a given binary array.
   * @param {Number[] | Uint8Array} binaryArray A binary array containing the values based on which to generate the hash.
   */
  hash (binaryArray) {
    binaryArray.forEach((element, index) => {
      if (element === 1) {
        for (var i = 0; i < this.nPermutations; i++) {
          let hash = (this.permutationsA[i] * index + this.permutationsB[i]) % Minhash.prime
          
          if (hash < this.hashValues[i]) {
            this.hashValues[i] = hash
          }
        }
      }
    })
  }

  /**
   * Generates the hash for a given binary array and returns it without storing it in the objects hashValues property.
   * 
   * @param {Number[] | Uint8Array} binaryArray A binary array containing the values based on which to generate the hash.
   * 
   * @returns {Uint32Array} The minhash values.
   */
  createHash (binaryArray) {
    // Initialize the hash values to the maximum
    let hashValues = new Uint32Array(this.nPermutations)
    for (var i = 0; i < this.nPermutations; i++) {
      hashValues[i] = Minhash.maxHash
    }

    binaryArray.forEach((element, index) => {
      if (element === 1) {
        for (var i = 0; i < this.nPermutations; i++) {
          let hash = (this.permutationsA[i] * index + this.permutationsB[i]) % Minhash.prime
          
          if (hash < hashValues[i]) {
            hashValues[i] = hash
          }
        }
      }
    })

    return hashValues
  }
  
  /**
   * Calculate the similarity between this Minhash object and another.
   * @param {Minhash} other A Minhash object
   * 
   * @returns {Number} The similarity value.
   */
  jaccard (other) {
    // For the sake of speed it is assumed that both hashes have the same seed and
    // number of permutations
    let common = 0

    for (var i = 0; i < this.nPermutations; i++) {
      if (this.hashValues[i] === other.hashValues[i]) {
        common++
      }
    }

    return common / this.nPermutations
  }

  /**
   * Calculate the similarity between two pre-existing hashes that are assumed to have the 
   * same seed and number of permutations.
   * 
   * @param {Number[] | Uint32Array} a A minhash represented by an array of hash values.
   * @param {Number[] | Uint32Array} b A minhash represented by an array of hash values.
   * 
   * @returns {Number} The similarity value.
   */
  static jaccard (a, b) {
    let common = 0
    for (var i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        common++
      }
    }

    return common / a.length
  }

  /**
   * Returns a string representing this minhash.
   * 
   * @returns {String} The hash values joined by commas.
   */
  toString () {
    return this.hashValues.join(',')
  }
}

Minhash.prime = 4294967311
Minhash.maxHash = Math.pow(2, 32) - 1
Minhash.factor = Math.pow(2, 32) / 2 - 1

module.exports = Minhash