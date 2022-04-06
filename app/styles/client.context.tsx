import { createContext } from 'react';

export type ClientStyleContextData = {
  reset: () => void;
};

const ClientStyleContext = createContext<ClientStyleContextData>({
  reset: () => {
    //
  },
});

export default ClientStyleContext;
