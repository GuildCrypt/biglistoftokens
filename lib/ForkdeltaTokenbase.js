const fs = require('mz/fs')
const amorphHex = require('amorph-hex')
const ForkDeltaTokenbaseInfo = require('./ForkDeltaTokenbaseInfo')

module.exports = class ForkDeltaTokenbase {
  constructor(address) {
    this.address = address
  }

  getYamlPath() {
    if (this.yamlPath) {
      return this.yamlPath
    }
    this.yamlPath = `${__dirname}/../submodules/forkDelta-tokenbase/tokens/${this.address.to(amorphHex.prefixed)}.yaml`
    return this.yamlPath
  }

  async fetchYaml() {
    if (this.yaml) {
      return this.yaml
    }
    this.yaml = await fs.readFile(this.getYamlPath(), 'utf8').catch((error) => {
      return null
    })
    return this.yaml
  }

  async fetchInfo() {
    if (this.info) {
      return this.info
    }
    const yaml = await this.fetchYaml()
    this.info = ForkDeltaTokenbaseInfo.fromYaml(yaml)
    return this.info
  }
}
