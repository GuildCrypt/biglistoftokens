const chai = require('chai')
chai.use(require('chai-as-promised'))

const Amorph = require('amorph')
const amorphHex = require('amorph-hex')
const Token = require('../')

describe('TokenInfos', () => {
  testToken(1, '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359')
})

function testToken(networkId, addressesHexPrefixed) {
  describe(`Token ${networkId} ${addressesHexPrefixed}`, () => {
    const address = Amorph.from(amorphHex.prefixed, '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359')
    let token
    it('should create token', () => {
      token = new Token(networkId, address)
    })
    it('should get mewel info', async () => {
      const info = await token.getMewel().fetchInfo()
      console.log(info)
    })
  })
}
