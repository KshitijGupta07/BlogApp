import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true },
    content: { type: String, required: true },
    image:   { type: String },
    // link to your existing users collection
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    author:   { type: String }, // cached display name (optional)
  },
  { timestamps: true, collection: "posts" } // collection will be 'posts'
);

// helpful index for dashboards
PostSchema.index({ createdAt: -1 });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
