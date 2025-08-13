import mongoose from "mongoose";

const Schema = mongoose.Schema

const blogsSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    categories: {
        type: [String],
        enum:[
            "Technology", "Science", "Health", "Education", "Business", "Lifestyle", "Entertainment", "Sports", "Travel", "Food", "Performance", "Innovation", "Design", "Accessibility", "Frontend"
        ],
        validate: {
            validator: function(value) {
                return value.length <= 3;
            },
            message: "A blog post can have a maximum of 3 categories."
        },
        required: true,
    },
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "BlogComment",
    //     default: [],
    // }]
}, {timestamps: true})

blogsSchema.index({ author: 1 });

blogsSchema.virtual('commentCount').get(function () {
  return this.comments?.length || 0;
});

blogsSchema.virtual('comments', {
  ref: 'BlogComment',
  localField: '_id',
  foreignField: 'blog'
})

blogsSchema.set('toObject', { virtuals: true });
blogsSchema.set('toJSON', { virtuals: true });

blogsSchema.pre('findOneAndDelete', async function (next) {
  const blog = await this.model.findOne(this.getFilter());
  if (blog) {
    await mongoose.model('BlogComment').deleteMany({ blog: blog._id });
  }
  next();
});

export default mongoose.model('Blog', blogsSchema)