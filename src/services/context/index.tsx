import { createContext, ReactNode, useReducer } from 'react';
import { Action, State } from './types';

const initialState: State = {
  isLoading: false,
};

type StoreContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const StoreContext = createContext<StoreContextType>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'STATUS_LOADING':
      return {
        ...state,
        isLoading: action.data.isLoading,
      };
    default:
      return state;
  }
};

const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { reducer, StoreContext, StoreProvider };
