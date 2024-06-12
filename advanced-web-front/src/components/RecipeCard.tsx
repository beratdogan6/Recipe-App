import React, { useState } from 'react';
import { StopwatchIcon } from "@radix-ui/react-icons";
import Loader from './Loader';

type Props = {
  title: string;
  imageUrl: string;
  time: number;
  difficulty: string;
  authorName: string;
  authorGender: string;
};

const RecipeCard: React.FC<Props> = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const truncateTitle = (title: string): string => {
    return title.length > 30 ? `${title.substring(0, 30)}...` : title;
  };

  return (
    <div className='w-full h-[300px] border overflow-hidden rounded-lg shadow-lg flex flex-col justify-between'>
      <div className='overflow-hidden'>
        {!imageLoaded && <Loader />}
        <img
          src={props.imageUrl}
          alt={props.title}
          className={`w-full h-[200px] object-cover transition duration-500 ease-in-out ${imageLoaded ? 'hover:scale-110' : 'hidden'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className='w-full px-2 py-3'>
        <div className='flex justify-between'>
          <h2 className='text-lg'>{truncateTitle(props.title)}</h2>
          <p className={`text-sm ${difficultyColor(props.difficulty)}`}>{props.difficulty}</p>
        </div>
        <div className='flex justify-between'>
          <p className='flex gap-2 items-center text-sm'><StopwatchIcon /> {props.time} minutes</p>
          <div className='flex items-center gap-1'>
            <p className='text-sm'>{props.authorName}</p>
            <img
              src={props.authorGender === 'man'
                ? '/assets/images/user_man_icon.png'
                : '/assets/images/user_woman_icon.png'}
              alt=""
              className='w-8 h-8 rounded-full object-cover border-2 border-white hover:scale-110 transition duration-500 ease-in-out cursor-pointer'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
