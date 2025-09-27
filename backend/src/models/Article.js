import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
        uniqueSlug: true
    },
    highlight: {
        type: Boolean,
        default: false
    },
    position: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    metaTitle: {
        type: String,
        trim: true
    },
    metaDescription: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    postedBy: {
        type: String,
        required: true,
        trim: true
    },
    visible: {
        type: Boolean,
        default: true
    }
}, 
{
    timestamps: true,
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
