
const Aes = require('aes-js')
const crypto = require('crypto')
const qs = require('querystring')

const padding = (str) => {
  var len = str.length
  var pad = 32 - (len % 32)
  str += String.fromCharCode(pad).repeat(pad)
  return str
}

const strip_padding = (str) => {
  var pad_check = new RegExp(str.slice(-1) + '{' + str.slice(-1).charCodeAt() + '}')
  if (str.match(pad_check)) {
    return str.replace(pad_check, '')
  } else {
    return str
  }
}

const aes_encrypt = (key, iv, payload) => {
  var cbc = new Aes.ModeOfOperation.cbc(Buffer.from(key), Buffer.from(iv))
  return Aes.utils.hex.fromBytes(cbc.encrypt(Aes.utils.utf8.toBytes(padding(payload))))
}

module.exports = spgateway = function (opts) {
  if (typeof opts !== 'object') {
    throw new Error('Missing parameter.')
  }

  if (!opts.hasOwnProperty('key') || !opts.key) {
    throw new Error('Missing parameter. key is required.')
  }

  if (!opts.hasOwnProperty('iv') || !opts.iv) {
    throw new Error('Missing parameter. iv is required.')
  }

  this.key = opts.key
  this.iv = opts.iv
}

spgateway.prototype = {
  postdata: function (payload) {
    return spgateway.postdata(this.key, this.iv, payload)
  },
  checkvalue: function (payload) {
    return spgateway.checkvalue(this.key, this.iv, payload)
  },
  checkcode: function (payload) {
    return spgateway.checkcode(this.key, this.iv, payload)
  }
}

/**
 * Alias aes_encrypt function for mapping parameter of newebpay.
 */
spgateway.postdata = (key, iv, payload) => {
  return aes_encrypt(key, iv, payload)
}

spgateway.checkvalue_query = (key, iv, payload) => {
  return crypto.createHash('sha256').update(qs.stringify(Object.assign({ IV: iv }, Object.keys(payload).sort().reduce((r, k) => (r[k] = payload[k], r), {}), { Key: key })).replace(/%20/g, '+')).digest('hex').toUpperCase()
}

spgateway.checkvalue = (key, iv, payload) => {
  return crypto.createHash('sha256').update(qs.stringify(Object.assign({ HashKey: key }, Object.keys(payload).sort().reduce((r, k) => (r[k] = payload[k], r), {}), { HashIV: iv })).replace(/%20/g, '+')).digest('hex').toUpperCase()
}

spgateway.checkcode = (key, iv, payload) => {
  return crypto.createHash('sha256').update(qs.stringify(Object.assign({ HashIV: iv }, Object.keys(payload).sort().reduce((r, k) => (r[k] = payload[k], r), {}), { HashKey: key })).replace(/%20/g, '+')).digest('hex').toUpperCase()
}

spgateway.TradeSha = (key, iv, aes_str) => {
  return crypto.createHash('sha256').update(`HashKey=${key}&${aes_str}&HashIV=${iv}`).digest('hex').toUpperCase()
}

/**
 * Alias aes_encrypt function for mapping parameter of newebpay.
 */
spgateway.TradeInfo = (key, iv, payload) => {
  return aes_encrypt(key, iv, payload)
}

spgateway.DecryptTradeInfo = (key, iv, aes_str) => {
  var cbc = new Aes.ModeOfOperation.cbc(Buffer.from(key), Buffer.from(iv))
  var decryptedBytes = cbc.decrypt(Aes.utils.hex.toBytes(aes_str))
  return strip_padding(Aes.utils.utf8.fromBytes(decryptedBytes))
}