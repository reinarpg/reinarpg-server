function generation ({ version, minY, worldHeight }) {
  const Chunk = require('reinarpg-chunk')(version)
  return () => new Chunk({minY, worldHeight})
}

module.exports = generation
