import * as T from './types'
const fetch = require('node-fetch')


let cache: T.Cache = {}
const langLst: T.Cache = {}
const API = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
const API_KEY = 'trnsl.1.1.20200419T183046Z.854d48023a74da23.b94456cd112cae9a9311e51a5d6f83f7c0b72961'


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
  lang: string, // translation direction
): Promise<T.ITranslateAPIResponse | T.IAPIResponseError> {
  const api_key: string = API_KEY;

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

async function getLangList(api_url: string, ui: string): Promise<T.LangListAPIResponse> {
  return fetch(api_url, { method: 'POST' })
    .then((response: any) => response.json())
    .then((data: T.ILangListAPIResponse) => {
      langLst[ui] = data
      return data
    })
    .catch((err: T.IAPIResponseError) => {
      return err
    })
}

export async function getSupportedLangList(ui: string): Promise<T.LangListAPIResponse> {
  let error: T.IAPIResponseError = {
    code: 401,
    message: 'Network problem',
  }

  if (langLst[ui]) {
    return langLst[ui] as T.ILangListAPIResponse
  }

  let api_url = `${API}/getLangs?key=${API_KEY}&ui=${ui}`

  let result: T.LangListAPIResponse = await getLangList(api_url, ui)

  return result
}

export const getCache = () => cache
