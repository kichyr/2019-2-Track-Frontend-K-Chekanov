import TranslateUtils from './index'

const API_KEY = 'trnsl.1.1.20200419T183046Z.854d48023a74da23.b94456cd112cae9a9311e51a5d6f83f7c0b72961'

it('should make simple translation', (done) => {
  TranslateUtils.translate('Hello world!', API_KEY, 'en-ru').then((data) => {
    expect(data.text).toStrictEqual(['Всем привет!'])
    done()
  })
  jest.setTimeout(30000)
})

it('should automatically determine lang)', (done) => {
  TranslateUtils.translate('Привет мир!', API_KEY, 'en').then((data) => {
    expect(data.text).toStrictEqual(['Hello world!'])
    done()
  })
})

it('should work with cache)', (done) => {
  TranslateUtils.translate('Привет мир!', API_KEY, 'en').then((data) => {
    expect(data.text).toStrictEqual(['Hello world!'])
    console.log(TranslateUtils.getCache()[`${'Привет мир!'}::::${'en'}`])
    done()
  })
})
