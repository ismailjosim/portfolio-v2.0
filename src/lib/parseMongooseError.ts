import { Error as MongooseError } from 'mongoose'

export function parseMongooseError(err: unknown): Record<string, string> {
    if (err instanceof MongooseError.ValidationError) {
        return Object.fromEntries(
            Object.entries(err.errors).map(([field, e]) => [field, e.message])
        )
    }
    return { general: 'An unexpected error occurred' }
}
