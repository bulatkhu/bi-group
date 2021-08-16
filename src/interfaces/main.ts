export interface IImage {
  pk: number
  name: string
  year: number
  month: number
  confidence: null | true | false
}

export interface ICatalogOfImages {
  count: number
  next: string
  previous: string
  results: IImage[]
}
