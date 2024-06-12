"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StopwatchIcon, PersonIcon } from "@radix-ui/react-icons";

type Recipe = {
  _id: string;
  name: string;
  imageUri: string;
  time: number;
  difficulty: string;
  servings: number;
  ingredients: string[];
  steps: string[];
  author: {
    _id: string;
    username: string;
    name: string;
    surname: string;
    email: string;
    gender: string;
  };
};

export default function Page({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-[#00ff00]';
      case 'Medium':
        return 'text-[#FFA70B]';
      case 'Hard':
        return 'text-[#FF0000]';
      default:
        return 'text-white';
    }
  };

  useEffect(() => {
    axios.get<Recipe>(`http://localhost:5000/recipes/${params.id}`)
      .then((response) => {
        setRecipe(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);

  if (!recipe) {
    return (
      <div className='grid place-items-center h-[calc(100vh-200px)] w-full'>
        <h1>Recipe could not found</h1>
      </div>
    );
  }

  return (
    <div className='px-[25%] pb-20'>
      <img
        src={recipe.imageUri}
        alt={recipe.name}
        className='w-full'
      />
      <h1 className='text-center mt-3 font-semibold text-[50px]'>{recipe.name}</h1>

      <div className='flex flex-col items-end text-sm'>
        <p className='flex items-center gap-1'><span><StopwatchIcon /></span> {recipe.time} minutes</p>
        <p className={`${difficultyColor(recipe.difficulty)}`}>{recipe.difficulty}</p>
        <p className='flex items-center gap-1'>{recipe.servings} <PersonIcon /></p>
      </div>

      <div>
        <h3 className='text-2xl'>Ingerdients: </h3>
        <ul className='pl-[30px] flex flex-col gap-3 py-3 list-disc'>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className='text-2xl'>Steps: </h3>
        <ol className='pl-[30px] flex flex-col gap-3 py-3 list-decimal'>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <p className='text-end text-sm mt-2'>Author: {recipe.author.name} {recipe.author.surname}</p>
    </div>
  );
}
