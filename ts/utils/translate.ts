const fetch = require('node-fetch')
import * as T from './types'

let cache: T.Cache = {}
const API = 'https://translate.yandex.net/api/v1.5/tr.json/translate'

function generate_url(text: string, api_key: string, lang: string): URL {
  var url = new URL(API)
  url.searchParams.append('key', api_key)
  url.searchParams.append('lang', lang)
  url.searchParams.append('text', text)
  return url
}

// const someFunction = () => {};
export function translate(
  text: string,
  api_key: string,
  lang: string, // translation direction
): Promise<T.ITranslateAPIResponse | T.IAPIResponseError> {
  if (cache[`${text}::::${lang}`]) {
    return new Promise((resolve, reject) => resolve(cache[`${text}::::${lang}`] as T.ITranslateAPIResponse))
  }

  return fetch(generate_url(text, api_key, lang).toString())
    .then((response: any) => response.json())
    .then((data: T.ITranslateAPIResponse) => {
      cache[`${text}::::${lang}`] = data
      return data
    })
    .catch((err: T.IAPIResponseError) => {
      cache[`${text}::::${lang}`] = err
      return err
    })
}

export const getCache = () => cache
