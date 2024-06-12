"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {};

const Page = (props: Props) => {
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);
  const { toast } = useToast();

  const user = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Check if all inputs are filled
    if (
      !formData.get('title') ||
      !formData.get('imageUrl') ||
      !formData.get('preparationTime') ||
      !formData.get('difficulty') ||
      !formData.get('servings') ||
      ingredients.some(ingredient => ingredient.trim() === '') ||
      steps.some(step => step.trim() === '')
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all the inputs.",
      });
      return;
    }

    const data = {
      authorId: user.user?._id,
      name: formData.get('title'),
      imageUri: formData.get('imageUrl'),
      time: formData.get('preparationTime'),
      difficulty: formData.get('difficulty'),
      servings: formData.get('servings'),
      ingredients: formData.getAll('ingredients'),
      steps: formData.getAll('steps'),
    };

    console.log(data);

    try {
      await axios.post('http://localhost:5000/recipes', data);
      toast({
        title: "Done!",
        description: "Recipe added successfully!",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error('Error adding recipe:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleAddInput = (type: 'ingredients' | 'steps') => {
    if (type === 'ingredients') {
      if (ingredients[ingredients.length - 1].trim() !== '') {
        setIngredients([...ingredients, '']);
      }
    } else {
      if (steps[steps.length - 1].trim() !== '') {
        setSteps([...steps, '']);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, type: 'ingredients' | 'steps') => {
    const value = event.target.value;
    if (type === 'ingredients') {
      const newIngredients = [...ingredients];
      newIngredients[index] = value;
      setIngredients(newIngredients);
    } else {
      const newSteps = [...steps];
      newSteps[index] = value;
      setSteps(newSteps);
    }
  };

  return (
    <div className='px-[35%]'>
      <h1 className='text-center text-[65px]'>Add Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3'>
          <Label>Recipe Title: </Label>
          <Input className='w-full' name='title' />
        </div>
        <div className='flex flex-col gap-3 mt-10'>
          <Label>Recipe Image URL: </Label>
          <Input className='w-full' name='imageUrl' />
        </div>
        <div className='flex flex-col gap-3 mt-10'>
          <Label>Preparation Time (minutes): </Label>
          <Input type='number' className='w-full' name='preparationTime' />
        </div>
        <div className='flex flex-col gap-3 mt-10'>
          <Label>Difficulty: </Label>
          <Select name='difficulty'>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col gap-3 mt-10'>
          <Label>Servings: </Label>
          <Input type='number' className='w-full' name='servings' />
        </div>
        <div className='flex flex-col gap-3 mt-10'>
          <Label>Ingredients: </Label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className='flex flex-col gap-3'>
              <Input
                className='w-full'
                name='ingredients'
                value={ingredient}
                onChange={(e) => handleChange(e, index, 'ingredients')}
              />
              {index === ingredients.length - 1 && (
                <button type='button' onClick={() => handleAddInput('ingredients')} className='border border-dashed py-2 rounded-lg'>+</button>
              )}
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-3 mt-10'>
          <Label>Steps: </Label>
          {steps.map((step, index) => (
            <div key={index} className='flex flex-col gap-3'>
              <Input
                className='w-full'
                name='steps'
                value={step}
                onChange={(e) => handleChange(e, index, 'steps')}
              />
              {index === steps.length - 1 && (
                <button type='button' onClick={() => handleAddInput('steps')} className='border border-dashed py-2 rounded-lg'>+</button>
              )}
            </div>
          ))}
        </div>
        <div className='flex justify-center mt-10'>
          <Button type='submit'>Submit Recipe</Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
