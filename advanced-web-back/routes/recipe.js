import express from 'express'
import { getRecipes, getRecipe, createRecipe, deleteRecipe, updateRecipe } from '../controllers/recipe.js'

const router = express.Router()

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/', createRecipe);
router.delete('/:id', deleteRecipe);
router.put('/:id', updateRecipe);

export default router