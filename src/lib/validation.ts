const MAX_STRING_LENGTH = 10_000
const MAX_BODY_SIZE = 100_000

export class ValidationError extends Error {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = 400
    this.name = "ValidationError"
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function sanitizeString(input: string): string {
  return input.replace(/<[^>]*>/g, "").slice(0, MAX_STRING_LENGTH).trim()
}

interface StringField {
  type: "string"
  required?: boolean
  minLength?: number
  maxLength?: number
  sanitize?: boolean
}

interface NumberField {
  type: "number"
  required?: boolean
  min?: number
  max?: number
}

interface BooleanField {
  type: "boolean"
  required?: boolean
}

interface ArrayField {
  type: "array"
  required?: boolean
  maxLength?: number
}

interface ObjectField {
  type: "object"
  required?: boolean
}

type FieldSchema = StringField | NumberField | BooleanField | ArrayField | ObjectField

interface Schema {
  [key: string]: FieldSchema
  [key: number]: never
}

function validateField(value: unknown, field: FieldSchema, path: string): unknown {
  if (value === undefined || value === null) {
    if (field.required) throw new ValidationError(`${path} is required`)
    return undefined
  }

  switch (field.type) {
    case "string": {
      if (typeof value !== "string") throw new ValidationError(`${path} must be a string`)
      const strField = field as StringField
      if (strField.minLength !== undefined && value.length < strField.minLength) {
        throw new ValidationError(`${path} must be at least ${strField.minLength} characters`)
      }
      if (strField.maxLength !== undefined && value.length > strField.maxLength) {
        throw new ValidationError(`${path} must be at most ${strField.maxLength} characters`)
      }
      return strField.sanitize !== false ? sanitizeString(value) : value
    }

    case "number": {
      if (typeof value !== "number" || isNaN(value)) {
        throw new ValidationError(`${path} must be a number`)
      }
      const numField = field as NumberField
      if (numField.min !== undefined && value < numField.min) {
        throw new ValidationError(`${path} must be at least ${numField.min}`)
      }
      if (numField.max !== undefined && value > numField.max) {
        throw new ValidationError(`${path} must be at most ${numField.max}`)
      }
      return value
    }

    case "boolean":
      if (typeof value !== "boolean") throw new ValidationError(`${path} must be a boolean`)
      return value

    case "array": {
      if (!Array.isArray(value)) throw new ValidationError(`${path} must be an array`)
      const arrField = field as ArrayField
      if (arrField.maxLength !== undefined && value.length > arrField.maxLength) {
        throw new ValidationError(`${path} must have at most ${arrField.maxLength} items`)
      }
      return value
    }

    case "object":
      if (!isPlainObject(value)) throw new ValidationError(`${path} must be an object`)
      return value

    default:
      return value
  }
}

export function validateBody<T extends Record<string, unknown>>(
  body: unknown,
  schema: Schema
): T {
  if (!isPlainObject(body)) {
    throw new ValidationError("Request body must be a JSON object")
  }

  const bodyRecord = body as Record<string, unknown>

  if (JSON.stringify(body).length > MAX_BODY_SIZE) {
    throw new ValidationError("Request body too large")
  }

  const allowedKeys = new Set(Object.keys(schema))
  for (const key of Object.keys(bodyRecord)) {
    if (!allowedKeys.has(key)) {
      throw new ValidationError(`Unexpected field: ${key}`)
    }
  }

  const result: Record<string, unknown> = {}
  for (const [key, field] of Object.entries(schema)) {
    const validated = validateField(bodyRecord[key], field, key)
    if (validated !== undefined) {
      result[key] = validated
    }
  }

  return result as T
}
