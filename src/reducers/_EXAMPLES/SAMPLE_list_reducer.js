const initialList = [
  { id: 1, task: "Shopping", status: "ACTIVE" },
  { id: 2, task: "More Shopping", status: "ACTIVE" },
  { id: 3, task: "Finish homework", status: "COMPLETED" },
  { id: 4, task: "Finish studies", status: "COMPLETED" }
];

export default function ListReducer(state = initialList, action) {

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
