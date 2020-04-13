import React, { useState } from 'react';
import uniqid from 'uniqid';
import { Burger } from './Burger';
import { useDrop } from 'react-dnd';

import { ItemTypes } from './utils/items';
import { Ingredient } from './ingredient';
export const DraggableComponent = () => {
  const [burger, setBurger] = useState([
    { name: 'Bread', id: uniqid() },
    { name: 'Chess', id: uniqid() },
    { name: 'Beacon', id: uniqid() },
    { name: 'Mead', id: uniqid() },
    { name: 'Bread', id: uniqid() },
  ]);
  const [ingredients, setIngredients] = useState([
    { name: 'Chess', id: 0 },
    { name: 'Meat', id: 1 },
    { name: 'Bread', id: 2 },
    { name: 'Beacon', id: 3 },
  ]);
  const handleAdd = (i) => {
    console.log([{ name: i, id: uniqid() }, ...burger]);
    setBurger((prevBurger) => {
      return [{ name: i, id: uniqid() }, ...prevBurger];
    });
  };

  const handleDelete = (ingredient) => {
    setBurger((prevBurger) =>
      prevBurger.filter((i) => {
        return i.id !== ingredient.id;
      })
    );
  };

  const moveIngredients = (dragIndex, dropIndex) => {
    setBurger((prevBurger) => {
      const clonedPrevState = [...prevBurger];
      [clonedPrevState[dragIndex], clonedPrevState[dropIndex]] = [
        clonedPrevState[dropIndex],
        clonedPrevState[dragIndex],
      ];

      return clonedPrevState;
    });
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INGREDIENT,
    drop: (item, monitor) => {
      if (item.type === ItemTypes.INGREDIENT) {
        handleAdd(item.name);
      }
    },
    collect: (monitor) => ({}),
  });
  return (
    <>
      <div>
        <h1>Generador de amburgesas :V</h1>
      </div>
      <div className="burger" ref={drop} style={{ background: 'red' }}>
        {burger.map((ingredient, index) => {
          return (
            <Burger
              key={ingredient.id}
              ingredient={ingredient}
              index={index}
              handleDelete={handleDelete}
              moveIngredients={moveIngredients}
            ></Burger>
          );
        })}
      </div>
      {ingredients.map((ingredient) => {
        return (
          <Ingredient key={ingredient.id} ingredient={ingredient}></Ingredient>
        );
      })}
    </>
  );
};
