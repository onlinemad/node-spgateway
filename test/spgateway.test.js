/* eslint-env mocha */

const assert = require('chai').assert
const Spgateway = require('../index')

suite('spgateway', () => {
  suite('#postdata()', () => {
    test('should generate postdata', () => {
      let spgateway = new Spgateway({
        key: '12345678901234567890123456789012',
        iv: '1234567890123456'
      })
      let payload = 'abcdefghijklmnop'
      assert.equal(spgateway.postdata(payload), 'b91d3ece42c203729b38ae004e96efb9b64c41eeb074cad7ebafa3973181d233')
    })
  })
  suite('postdata', () => {
    test('should generate postdata', () => {
      let key = '12345678901234567890123456789012'
      let iv = '1234567890123456'
      let payload = 'abcdefghijklmnop'
      assert.equal(Spgateway.postdata(key, iv, payload), 'b91d3ece42c203729b38ae004e96efb9b64c41eeb074cad7ebafa3973181d233')
    })
  })
  suite('checkvalue', () => {
    test('should generate checkvalue', () => {
      let key = 'abcdefg'
      let iv = '1234567'
      let payload = {
        MerchantOrderNo: '840f022',
        MerchantID: '1422967',
        Amt: 100
      }
      assert.equal(Spgateway.checkvalue(key, iv, payload), '379BF1DB8948EE79D8ED77A1EBCB2F57B0FD45D0376B6DA9CF85F539CEF1C127')
    })
  })
})
