const Amorph = require('amorph')
const Mewel = require('./lib/Mewel')

class InvalidAddressError extends Error {}
class InvalidNetworkIdError extends Error {}

module.exports = class Token {
  constructor(networkId, address) {
    if (
      (address instanceof Amorph) === false
      || address.uint8Array.length !== 20
    ) {
      throw new InvalidAddressError
    }

    this.networkId = networkId
    this.address = address
  }

  getMewel() {
    if (this.networkId !== 1) {
      throw new InvalidNetworkIdError()
    }
    if (this.mewel) {
      return this.mewel
    }
    this.mewel = new Mewel(this.address)
    return this.mewel
  }
}
