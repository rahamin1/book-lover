import { ADD_TO_CART } from '../actions/index';
import { CHECKOUT } from '../actions/index';

const SampleItem = { id: 0, count: 1 };

const InitialCart = [
  { id: 1, count: 2 },
  { id: 2, count: 3 },
  { id: 3, count: 1 }
];

export default function CartReducer(state = [], action) {

  switch (action.type) {
    case ADD_TO_CART: {
      let product = action.payload;
      let index = state.findIndex((x) => x.id === product.id);
      let newItem = Object.assign({}, SampleItem, { id: product.id });

      if (index === -1) {
        return [...state, newItem];
      } else {
        let newState = Object.assign([], state);
        newItem.count = state[index].count + 1;
        newState[index] = newItem;
        return newState;
      }
      break;
    }

    case CHECKOUT:
      return [];
      break;

    default:
      return state;
  }
}

/*
case 'DUMMY2': {
  const newTodo = {
    id: state.length + 1,
    task: action.payload,
    status: "ACTIVE"
  };
  return [ ...state, Object.assign({}, newTodo) ];
  break;
}

case 'DUMMY3': {
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
