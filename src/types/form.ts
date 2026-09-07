export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'select'
  | 'checkbox'

export interface FormField {
  type: FieldType
  label: string
  model: string
  required?: boolean
  minLength?: number
  pattern?: string
  options?: string[]
}

export interface FormSchema {
  fields: FormField[]
}