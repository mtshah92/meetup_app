import { createContext, useReducer, useState } from "react";
import { data } from "../db";
import { act } from "react-dom/test-utils";

export const MeetUpContext = createContext();

export const MeetUpProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const initialData = {
    data: data.meetups,
  };
  const handleEvent = (state, action) => {
    switch (action.type) {
      case "submit": {
        return {
          ...state.initialData,
          data: initialData.data.map((item) => {
            if (item.id === action.payload) {
              return {
                ...item,
                paid: !item.paid && true,
              };
            } else return item;
          }),
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(handleEvent, initialData);
  return (
    <MeetUpContext.Provider value={{ state, dispatch, modal, setModal }}>
      {children}
    </MeetUpContext.Provider>
  );
};
