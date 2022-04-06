import { createContext } from 'react';

export type ServerStyleContextData = {
  key: string;
  ids: Array<string>;
  css: string;
};

const ServerStyleContext = createContext<null | ServerStyleContextData[]>(null);

export default ServerStyleContext;
