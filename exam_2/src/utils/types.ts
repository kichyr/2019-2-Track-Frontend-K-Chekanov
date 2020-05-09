

export interface IAPIResponseError {
  code: number
  message: string
}

export interface ICacheDict {
  [ind: string]: ITranslateAPIResponse | IAPIResponseError | ILangListAPIResponse
}

export interface ITranslateAPIResponse {
  code: number
  lang: string
  text: string[]
}


export interface ILangListAPIResponse {
  dirs: string[]
  langs: object
}

export type LangListAPIResponse = ILangListAPIResponse | IAPIResponseError

export type Cache = ICacheDict
