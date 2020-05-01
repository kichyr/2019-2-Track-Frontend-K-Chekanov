import data from './world-110.json'

export interface ICOVIDStatistic {
  Global: {
    NewConfirmed: number
    TotalConfirmed: number
    NewDeaths: number
    TotalDeaths: number
    NewRecovered: number
    TotalRecovered: number
  }
  Countries: ICOVDCountryInfo[]
}

export interface ICOVDCountryInfo {
  Country: string
  CountryCode: string
  Slug: string
  NewConfirmed: number
  TotalConfirmed: number
  NewDeaths: number
  TotalDeaths: number
  NewRecovered: number
  TotalRecovered: number
  Date: string
}

export interface GeoJson {
  type: string
  features: GeoJsonCountry[]
}

export interface GeoJsonCountry {
  type: string
  properties: { name: string }
  geometry: {
    type: string
    coordinates: number[][][] | number[][][][]
  }
}

export function getGeojson(): GeoJson {
  return data
}

export async function getCOVIDStatistic(): Promise<ICOVIDStatistic> {
  const response = await fetch('https://api.covid19api.com/summary')
  return await response.json()
}
