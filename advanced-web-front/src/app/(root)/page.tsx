"use client";

import axios from 'axios';
import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";

type Author = {
  _id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  gender: string;
};

type Recipe = {
  _id: string;
  name: string;
  imageUri: string;
  time: number;
  difficulty: string;
  servings: number;
  ingredients: string[];
  steps: string[];
  author: Author;
};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then((res) => {
        setRecipes(res.data);
        console.log("🚀 ~ .then ~ res.data:", res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main>
      <h1 className='text-center text-[60px]'>Recipes</h1>
      <div className="grid grid-cols-3 gap-20 px-[15%] py-5">
        {recipes.map((recipe) => (
          <a
            href={`http://localhost:3000/recipe/${recipe._id}`}
            key={recipe._id}
          >
            <RecipeCard
              title={recipe.name}
              imageUrl={recipe.imageUri}
              time={recipe.time}
              difficulty={recipe.difficulty}
              authorName={`${recipe.author.name} ${recipe.author.surname}`}
              authorGender={recipe.author.gender}
            />
          </a>
        ))}
      </div>
    </main>
  );
}
