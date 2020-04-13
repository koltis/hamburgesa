import React, { useRef } from 'react';
import * as CS from './App.style';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './utils/items';

export const Burger = ({
  ingredient,
  handleDelete,
  index,
  moveIngredients,
}) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.PART,
      id: ingredient.id,
      index: index,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: ItemTypes.PART,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (item.id == ingredient.id) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredients(dragIndex, hoverIndex);
      // Time to actually perform the action
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  drag(drop(ref));
  return (
    <CS.Burger ref={ref}>
      <p style={{ background: 'white' }}>{ingredient.name}</p>
      <button
        type="button"
        onClick={() => {
          handleDelete(ingredient);
        }}
      >
        x
      </button>
    </CS.Burger>
  );
};
