
import React, { useEffect, useReducer } from 'react';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { getAll } from '../../services/foodService';


const initialState = { foods: [] };

const reducer = (state, action) => { //changes the initial stage to the action that we waanna do
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    default:
      return state;
    }
  };

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods } = state;

  useEffect(() => {
    getAll().then(tags => dispatch({ type: 'FOODS_LOADED', payload: foods }));//as the type is FOODS_LOADED it will go to the reducer perform it's task
  },[]);
    return <>
      <Thumbnails foods={foods}/>
    </>
  
}