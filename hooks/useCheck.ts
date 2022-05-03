import { useReducer } from "react";

type Check = {
  prefCode: number;
  isCheck: boolean;
  label: string;
  data: number[];
  borderColor: string;
};

type InitialState = {
  checkList: Check[];
};

type Payload = {
  prefCode: number;
  isCheck: boolean;
  label: string;
  data: number[];
  borderColor: string;
};

interface CheckAction {
  type: ActionType;
  payload: Payload;
}

enum ActionType {
  ACTION_CHECK_ON = "CHECK_ON",
  ACTION_CHECK_OFF = "CHECK_OFF",
}

const initialState: InitialState = {
  checkList: [],
};

const reducer: React.Reducer<InitialState, CheckAction> = (
  state: InitialState,
  action: CheckAction
) => {
  const checkOnState = () => {
    if (
      [...state.checkList].find((value) => {
        return value.prefCode === action.payload.prefCode;
      })
    ) {
      console.log("on");
      return [...state.checkList].map((value) =>
        value.prefCode === action.payload.prefCode
          ? {
              ...value,
              isCheck: true,
            }
          : value
      );
    }
    return [...state.checkList, action.payload];
  };

  const checkOffState = () => {
    if (
      [...state.checkList].find((value) => {
        return value.prefCode === action.payload.prefCode;
      })
    ) {
      console.log("off");
      return [...state.checkList].map((value) =>
        value.prefCode === action.payload.prefCode
          ? {
              ...value,
              isCheck: false,
            }
          : value
      );
    }
    return [...state.checkList, action.payload];
  };

  switch (action.type) {
    case ActionType.ACTION_CHECK_ON:
      return {
        ...state,
        checkList: checkOnState(),
      };
    case ActionType.ACTION_CHECK_OFF:
      return {
        ...state,
        checkList: checkOffState(),
      };
    default:
      return state;
  }
};

export const useCheck = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkOn = (payload: Payload) =>
    dispatch({
      type: ActionType.ACTION_CHECK_ON,
      payload: payload,
    });
  const checkOff = (payload: Payload) =>
    dispatch({
      type: ActionType.ACTION_CHECK_OFF,
      payload: payload,
    });

  return { state, checkOn, checkOff } as const;
};
