import { ReactNode, createContext, useReducer, useContext, Dispatch } from 'react';

export const MatchContext = createContext("");
export const MatchDispatchContext = createContext({} as Dispatch<{type: string, value: string}>);

const matchReducer = (state: string, action:{type:string, value:string}) => {
  switch (action.type) {
    case 'match': {
      return action.value;
    }
    case 'clear': {
      return "";
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export function MatchProvider({children}:{ children: ReactNode }) {
    const [matchId, dispatch] = useReducer(matchReducer, "");
  
    return (
      <MatchContext.Provider value={matchId}>
        <MatchDispatchContext.Provider value={dispatch}>
          {children}
        </MatchDispatchContext.Provider>
      </MatchContext.Provider>
    );
  }

export function useMatchId() {
  return useContext(MatchContext);
}

export function useMatchIdDispatch() {
  return useContext(MatchDispatchContext);
}