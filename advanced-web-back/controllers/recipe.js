import Recipe from '../models/Recipe.js';
import User from '../models/User.js';

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        const recipesWithUser = await Promise.all(recipes.map(async (recipe) => {
            const user = await User.findById(recipe.authorId);
            return {
                ...recipe.toObject(),
                author: user ? user.toObject() : null
            };
        }));
        res.status(200).json(recipesWithUser);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

export const getRecipe = async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        const user = await User.findById(recipe.authorId);
        const recipeWithUser = {
            ...recipe.toObject(),
            author: user ? user.toObject() : null
        };

        res.status(200).json(recipeWithUser);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

export const createRecipe = async (req, res) => {
    const { name, authorId, ingredients, steps, difficulty, time, servings, imageUri } = req.body;

    try {
        const newRecipe = new Recipe({ name, authorId, ingredients, steps, difficulty, time, servings, imageUri });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

export const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    const { authorId } = req.body;

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        if (recipe.authorId !== authorId) {
            return res.status(403).json({ message: "You are not authorized to delete this recipe" });
        }

        await Recipe.findByIdAndRemove(id);
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

export const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, authorId, ingredients, steps, difficulty, time, servings, imageUri } = req.body;

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        if (recipe.authorId !== authorId) {
            return res.status(403).json({ message: "You are not authorized to update this recipe" });
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, { name, authorId, ingredients, steps, difficulty, time, servings, imageUri }, { new: true });
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}
