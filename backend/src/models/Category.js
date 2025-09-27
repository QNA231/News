import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    parentId: {
        type: String,
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
    visible: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true // auto add createdAt and updateAt
});

const Category = mongoose.model("Category", categorySchema);
export default Category;