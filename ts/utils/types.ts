export interface ITranslateAPIResponse {
  code: number
  lang: string
  text: string[]
}

export interface IAPIResponseError {
  code: number
  message: string
}

export interface ICacheDict {
  [ind: string]: ITranslateAPIResponse | IAPIResponseError
}

export type Cache = ICacheDict
