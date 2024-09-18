/* eslint-env mocha */

const net = require('net')
const squid = require('reinarpg-server')

const settings = require('../config/default-settings')

const { firstVersion, lastVersion } = require('./common/parallel')

squid.supportedVersions.forEach((supportedVersion, i) => {
  if (!(i >= firstVersion && i <= lastVersion)) {
    return
  }

  const mcData = require('reinarpg-data')(supportedVersion)
  const version = mcData.version

  describe(`simple server  ${version.minecraftVersion}`, () => {
    let serv

    before(done => {
      const options = settings
      options['online-mode'] = false
      options.port = 0
      options['view-distance'] = 2
      options.worldFolder = undefined
      options.logging = false
      options.version = version.minecraftVersion
      serv = squid.createMCServer(options)

      serv.on('listening', () => {
        done()
      })
    })

    after(done => {
      serv._server.close()
      serv._server.on('close', () => {
        done()
      })
    })

    it('is running', done => {
      const client = net.Socket()
      client.connect(serv._server.socketServer.address().port, '127.0.0.1', done)
      client.on('error', done)
    })
  })
})
