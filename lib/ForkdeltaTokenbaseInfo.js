const yamljs = require('yaml')
const Amorph = require('amorph')
const amorphHex = require('amorph-hex')

class ForkDeltaTokenbaseInfo {
  constructor(address, decimals, description, links, name, symbol) {
    this.address = address
    this.decimals = decimals
    this.description = description
    this.links = links
    this.name = name
    this.symbol = symbol
  }
}

ForkDeltaTokenbaseInfo.fromYaml = function fromYaml(yaml) {
  const parsed = yamljs.parse(yaml)
  return new ForkDeltaTokenbaseInfo(
    Amorph.from(amorphHex.prefixed, parsed.addr),
    parsed.decimals,
    parsed.description,
    parsed.links,
    parsed.name ? parsed.name : null,
    parsed.symbol
  )
}

module.exports = ForkDeltaTokenbaseInfo
