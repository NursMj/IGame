import crypto from 'crypto'

export default class KeyAndHMACGenerator {
  generateKey(keyLength) {
    return crypto.randomBytes(keyLength)
  }
  calculateHMAC(move, key) {
    return crypto.createHmac('sha256', key).update(move).digest('hex')
  }
}
