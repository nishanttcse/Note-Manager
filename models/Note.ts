import mongoose, { type Document, Schema } from "mongoose"

export interface INote extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const NoteSchema = new Schema<INote>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
NoteSchema.index({ userId: 1, createdAt: -1 })

export default mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema)
