const fs = require('mz/fs')
const amorphHex = require('amorph-hex')

const mewelPackageJsonPath = require.resolve('ethereum-lists/package.json')
const mewelPath = mewelPackageJsonPath.substring(0, mewelPackageJsonPath.lastIndexOf('/'))

module.exports = class Mewel {
  constructor(address) {
    this.address = address
  }

  getInfoJsonPath() {
    if (this.infoJsonPath) {
      return this.infoJsonPath
    }
    this.infoJsonPath = `${mewelPath}/src/tokens/eth/${this.address.to(amorphHex.prefixed)}.json`
    return this.infoJsonPath
  }

  async fetchInfoJson() {
    if (this.infoJson) {
      return this.infoJson
    }
    this.infoJson = await fs.readFile(this.getInfoJsonPath(), 'utf8').catch((error) => {
      return null
    })
    return this.infoJson
  }

  async fetchInfo() {
    if (this.info) {
      return this.info
    }
    const infoJson = await this.fetchInfoJson()
    this.info = infoJson === null ? null : JSON.parse(infoJson)
    return this.info
  }
}
