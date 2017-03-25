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
})
