import React, { useState, useCallback } from 'react';
import uniqid from 'uniqid';
import { Burger } from './Burger';
import * as CS from './Burger.style';
import * as CSS from './ingredient.style';
import { Ingredient } from './ingredient';
import { css } from 'styled-components';
export const DraggableComponent = () => {
  const [burger, setBurger] = useState([
    { name: 'CloseBread', id: uniqid() },
    { name: 'Chess', id: uniqid() },
    { name: 'Beacon', id: uniqid() },
    { name: 'Mead', id: uniqid() },
    { name: 'OpenBread', id: uniqid() },
  ]);
  const [ingredients, setIngredients] = useState([
    { name: 'CloseBread', id: 0 },
    { name: 'Beacon', id: 1 },
    { name: 'Chess', id: 2 },
    { name: 'Mead', id: 3 },
    { name: 'OpenBread', id: 4 },
  ]);
  const handleAdd = (index, name) => {
    console.log(name);
    setBurger((prevBurger) => {
      console.log(index);
      const clonePrevBurger = [...prevBurger];
      clonePrevBurger.splice(index, 0, { name: name, id: uniqid() });
      return clonePrevBurger;
    });
  };

  const handleDelete = (ingredient) => {
    setBurger((prevBurger) =>
      prevBurger.filter((i) => {
        return i.id !== ingredient.id;
      })
    );
  };

  const moveIngredients = useCallback((dragIndex, dropIndex) => {
    setBurger((prevBurger) => {
      const clonedPrevState = [...prevBurger];
      [clonedPrevState[dragIndex], clonedPrevState[dropIndex]] = [
        clonedPrevState[dropIndex],
        clonedPrevState[dragIndex],
      ];

      return clonedPrevState;
    });
  });
  return (
    <CS.draggableComponent>
      <div>
        <h1>Generador de hamburgesas :V</h1>
      </div>
      <div className="burger">
        {burger.map((ingredient, index) => {
          return (
            <Burger
              key={ingredient.id}
              ingredient={ingredient}
              index={index}
              handleDelete={handleDelete}
              moveIngredients={moveIngredients}
              handleAdd={handleAdd}
            ></Burger>
          );
        })}
      </div>
      <CSS.Burger>
        {ingredients.map((ingredient) => {
          return (
            <Ingredient
              key={ingredient.id}
              ingredient={ingredient}
            ></Ingredient>
          );
        })}
      </CSS.Burger>
    </CS.draggableComponent>
  );
};
