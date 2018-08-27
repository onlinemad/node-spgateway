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
  suite('checkvalue_query', () => {
    test('should generate checkvalue', () => {
      let key = 'abcdefg'
      let iv = '1234567'
      let payload = {
        MerchantOrderNo: '840f022',
        MerchantID: '1422967',
        Amt: 100
      }
      assert.equal(Spgateway.checkvalue_query(key, iv, payload), '379BF1DB8948EE79D8ED77A1EBCB2F57B0FD45D0376B6DA9CF85F539CEF1C127')
    })
  })
  suite('checkvalue', () => {
    test('should generate checkvalue', () => {
      let key = '1A3S21DAS3D1AS65D1'
      let iv = '1AS56D1AS24D'
      let payload = {
        MerchantOrderNo: '20140901001',
        MerchantID: '123456',
        Amt: 200,
        TimeStamp: 1403243286,
        Version: '1.1'
      }
      assert.equal(Spgateway.checkvalue(key, iv, payload), '841F57D750FB4B04B62DDC3ECDC26F1F4028410927DD28BD5B2E34791CC434D2')
    })
  })
  suite('checkcode', () => {
    test('should generate checkcode', () => {
      let key = 'abcdefg'
      let iv = '1234567'
      let payload = {
        MerchantOrderNo: '840f022',
        MerchantID: '1422967',
        Amt: 100,
        TradeNo: '14061313541640927'
      }
      assert.equal(Spgateway.checkcode(key, iv, payload), '62C687AF6409E46E79769FAF54F54FE7E75AAE50BAF0767752A5C337670B8EDB')
    })
    test('should generate checkcode - application/x-www-form-urlencoded encoding case', () => {
      let key = 'abcdefg'
      let iv = '1234567'
      let payload = {
        MerchantID: 'ABC1422967',
        Date: '2015-01-01 00:00:00',
        UseInfo: 'ON',
        CreditInst: 'ON',
        CreditRed: 'ON'
      }
      assert.equal(Spgateway.checkcode(key, iv, payload), '77A1EF8F23C94CB63A60A7EDF99AC3E0F4688D96AF6D4B34370D306ABD33D0F6')
    })
  })
})
