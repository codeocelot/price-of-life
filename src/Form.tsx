import React, {useState, useCallback, useMemo} from "react";
import { Space, Form, Input, Button } from "antd";
import InputItem from "./InputItem";

type Props = {};

type State = {
  livesSaved: number;
  priceOfLife: number;
  budget: number;
}

const defaultState: State = {
  livesSaved: 1000000,
  priceOfLife: 6000000,
  budget: 1000000*6000000,
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function (props: Props) {
  const [state, setState] = useState<State>(defaultState);
  const reset = useCallback(() => setState(defaultState), []);
  const setVal = useCallback(
    (field: string, val: any) => {
      let newState= defaultState;
      switch (field) {
        case 'livesSaved':
          debugger;
          newState = {
            ...state,
            livesSaved: val,
            budget: val * state.priceOfLife
          }
          break;
        case 'priceOfLife':
          newState = {
            ...state,
            priceOfLife: val,
            budget: val * state.livesSaved,
          }
          break;
        case 'budget':
          debugger;
          newState = {
            ...state,
            priceOfLife: val / state.livesSaved,
            budget: val,
          }
          break;
        default:
          return;

      }
      setState(newState)
      // setState((_state: State = defaultState) => ({..._state, [field]: val }))
    },
    [state]
  );

  return (
    <Form {...layout}>
      {/* <Space direction="vertical"> */}
        <InputItem
          numberFormat='' 
          label="Number Of Lives Saved" 
          val={state.livesSaved} 
          field="livesSaved" 
          min={0} 
          setVal={setVal} 
          max={10000000}
        />
        <InputItem 
        label="Price Of Human Life" 
        val={state.priceOfLife} 
        field='priceOfLife' 
        setVal={setVal}
        step={100000}
        min={0} 
        max={100000000}
        />
        <InputItem 
          label="Buget for Response" 
          min={0} 
          max={20000000000000} 
          val={state.budget} 
          field='budget' 
          setVal={setVal}
          // marks={{0: 'aoeu', 20000000000: 'US GDP'}}
        />
      {/* </Space> */}
        <Button onClick={reset}>Reset</Button>
    </Form>
  );
}
