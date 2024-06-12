import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    steps: {
        type: [String],
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    imageUri: {
        type: String,
        required: true
    }
});

export default mongoose.model('Recipe', recipeSchema);