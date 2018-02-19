export default function SampleReducer(state = {}, action) {

  switch (action.type) {
    case 'DUMMY':
      return state;
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
