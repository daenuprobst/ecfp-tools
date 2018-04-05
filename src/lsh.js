class LSH {
  constructor (nPermutations = 128, nPrefixTrees = 8) {
    this.nPermutations = nPermutations
    this.nPrefixTrees = nPrefixTrees
    this.maxTreeDepth = nPermutations / nPrefixTrees

    var i = 0
    
    this.hashtables = new Array(nPrefixTrees)
    for (i = 0; i < nPrefixTrees; i++) {
      this.hashtables[i] = []
    }

    this.hashranges = new Array(nPrefixTrees)
    for (i = 0; i < nPrefixTrees; i++) {
      this.hashranges[i] = [ i * this.maxTreeDepth, (i + 1) * this.maxTreeDepth ]
    }
    
    this.keys = {}
    
    this.sortedHashtables = []
    for (i = 0; i < nPrefixTrees; i++) {
      this.sortedHashtables[i] = []
    }
  }
}

module.exports = LSH