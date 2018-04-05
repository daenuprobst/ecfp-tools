/**
 * A class containing functions for different distance measures on binary arrays.
 */
class Similarities {

  /**
   * Calculates the Jaccard distance (1 - similarity) between two binary vectors.
   * @param {Number[] | Uint8Array} a A binary vector.
   * @param {Number[] | Uint8Array} b A binary vector.
   * 
   * @returns {Number} The Jaccard distance.
   */
  static jaccard (a, b) {
    let p = 0
    let s = 0

    for (var i = 0; i < a.length; i++) {
      if (a[i] === 1 && b[i] === 1) {
        p++
      } else if (!(a[i] === 0 && b[i] === 0)) {
        s++
      }
    }
    
    return p / (p + s)
  }
}

module.exports = Similarities