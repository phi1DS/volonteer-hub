export interface User {
  id: number
  name: string
  email: string
}

export interface Task {
  id: number
  subject: string
  message: string
  organisation?: string
  contact_information: string
  date_start: string
  date_end: string
  created_at: string
  active: boolean
  user?: User
}

export interface PaginatedTasks {
  current_page: number
  data: Task[]
  from: number
  last_page: number
  last_page_url: string
  links: PageLink[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string|null
  to: number
  total: number
}

export interface PaginatedModel {
  current_page: number
  data: []
  from: number
  last_page: number
  last_page_url: string
  links: PageLink[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string|null
  to: number
  total: number
}

export interface PageLink {
  active: boolean
  label: string
  page: number
  url: string
}