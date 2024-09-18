export const player = async function (player: Player, serv: Server) {
  function unhandledRejection (promise) {
    serv.warn('-------------------------------')
    serv.warn('Please report this reinarpg-server! This is bug (mabye)')
    serv.warn('Unhandled rejection warning!')
    serv.warn('Error: ' + promise)
    serv.warn('Report this error here: https://github.com/PrismarineJS/reinarpg-server/issues')
    serv.warn('-------------------------------')
    serv.emit('unhandledRejectionWarning')
  }

  function uncaughtException (err) {
    serv.err('-------------------------------')
    serv.err('Please report this reinarpg-server! This is bug (mabye)')
    serv.err('Something went wrong!')
    serv.err('Error: ' + err.stack)
    serv.err('Report this error here: https://github.com/PrismarineJS/reinarpg-server/issues')
    serv.err('-------------------------------')
    serv.emit('crash')
    serv.quit(`Internal server error. ${err}`)
    process.exit()
  }

  process.on('unhandledRejection', (promise) => { unhandledRejection(promise) })
  process.on('uncaughtException', err => { uncaughtException(err) })
}
declare global {
}
