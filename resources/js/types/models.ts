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
