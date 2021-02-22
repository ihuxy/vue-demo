import {useState,useRef,useMemo,useEffect} from 'react';
export function useStateBasedOnProps(propValue) {
  const [, update] = useState(false);
  const [state, setState] = useMemo(() => {
    const state = {};
    return [
      state,
      (value) => {
        if (value instanceof Function) {
          state.value = value(state.value);
        } else {
          state.value = value;
        }
        update((tick) => !tick);
      },
    ];
  }, [update]);

  if (state.prevPropValue !== propValue) {
    state.prevPropValue = propValue;
    state.value = propValue;
  }

  return [state.value, setState];
}


const usePrevious=value=>{
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useTraceableState = initialValue => {
  const [value, setValue] = useState(initialValue);
  const prevValue = usePrevious(value);
  return [prevValue, value, setValue];
};








