import mongoose, { Model, Schema } from 'mongoose';

/**
 * Registers a Mongoose model in a way that survives a dev hot-reload.
 *
 * `src/lib/mongodb.ts` caches the mongoose instance on `global`, so `mongoose.models`
 * outlives a Turbopack module re-evaluation. The usual `mongoose.models.X || model(...)`
 * idiom therefore keeps serving the schema that was compiled *before* the edit — and
 * because `strict: true` silently drops unknown paths from an update, a newly added field
 * simply never saves while the request still reports success. That is exactly how the
 * comment `status` and blog `publishedAt` writes went missing.
 *
 * Re-registering in dev makes a schema change take effect on save. Production keeps the
 * plain lookup: the module is evaluated once there, so there is nothing stale to replace.
 */
export function registerModel<T>(name: string, schema: Schema<T>): Model<T> {
  if (process.env.NODE_ENV !== 'production' && mongoose.models[name]) {
    mongoose.deleteModel(name);
  }

  return (mongoose.models[name] as Model<T>) ?? mongoose.model<T>(name, schema);
}
