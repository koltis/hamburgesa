import React, { useRef } from 'react';
import * as CS from './App.style';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './utils/items';
export const Burger = ({
  ingredient,
  handleDelete,
  index,
  moveIngredients,
  handleAdd,
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
  let hoverIndex = 0;
  const [, drop] = useDrop({
    accept: [ItemTypes.PART, ItemTypes.INGREDIENT],
    drop(item, monitor) {
      console.log(item);
      if (item.type === 'part') {
        return;
      }

      handleAdd(hoverIndex, item.name);
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      hoverIndex = index;
      if (item.id === ingredient.id) {
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
      if (item.type === 'part') {
        moveIngredients(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });
  drag(drop(ref));
  return (
    <CS.Burger ref={ref}>
      <div className={ingredient.name}></div>
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
