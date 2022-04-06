import { createContext, useContext } from 'react';

export type CanvasState = {
  offset: {
    x: number;
    y: number;
  };
  scale: number;
};

export const CanvasContext = createContext<CanvasState>({
  offset: {
    x: 0,
    y: 0,
  },
  scale: 1,
});

const Canvas = () => {
  const { scale } = useContext(CanvasContext);

  return <>The desired user zoom level is {scale}.</>;
};

export default Canvas;
