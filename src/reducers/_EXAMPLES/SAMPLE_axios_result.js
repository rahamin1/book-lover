import { CITY_SEARCH } from '../actions';

const initialState = [
  { name: "Denver", temp: 30, pressure: 30, humidity: 45 },
  { name: "New York", temp: 25, pressure: 30, humidity: 45 },
  { name: "Tel Aviv", temp: 12, pressure: 30, humidity: 45 }
];

export default function CitiesReducer(state = initialState, action) {
  switch (action.type) {
    case CITY_SEARCH:
      if (action.error) {
        console.log("In CitiesReducer/CITY_SEARCH. error: ", action.error);
        return state;
      } else {
        console.log("In CitiesReducer/CITY_SEARCH. payload: ", action.payload.data);
        return state;
      }
      break;

    default:
      return state;
  }
}

/*
case 'ADD_TODO': {
  const newTodo = {
    id: state.length + 1,
    task: action.payload,
    status: "ACTIVE"
  };
  return [ ...state, Object.assign({}, newTodo) ];
  break;
}

case 'TOGGLE_TODO': {
  let type = "";
  return state.map( (todo) => {
    if (todo.id === action.payload.id) {
      type = (todo.status === 'ACTIVE') ? 'COMPLETED' : 'ACTIVE';
      return Object.assign({}, todo, { status: type } );
    } else {
      return todo;
    }
  });
  break;
}
*/
