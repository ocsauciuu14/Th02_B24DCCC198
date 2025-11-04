
export interface WttrWeatherDesc { value: string }
export interface WttrCurrentCondition {
  temp_C: string
  weatherDesc: WttrWeatherDesc[]
}
export interface WttrResponse {
  current_condition: WttrCurrentCondition[]
}


export interface Student {
  id: number
  name: string
  email: string
}

export interface NewsArticle {
  id: number
  title: string
  url: string
  image_url: string | null
  summary: string
  published_at: string
}
export interface NewsResponse {
  count: number
  next: string | null
  previous: string | null
  results: NewsArticle[]
}
