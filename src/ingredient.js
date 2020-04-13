import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './utils/items';

export const Ingredient = ({ ingredient }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.INGREDIENT,
      id: ingredient.id,
      name: ingredient.name,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return <div ref={drag}>{ingredient.name}</div>;
};
