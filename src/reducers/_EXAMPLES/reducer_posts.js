import _ from 'lodash';
import { FETCH_POSTS } from '../actions/index';
import { ADD_POST } from '../actions/index';
import { DELETE_POST } from '../actions/index';

const post1 = { id: 7,
  title: "First Post",
  categories: "sport, books",
  content: "Bla Bla" };

const post2 = {
  id: 33,
  title: "Second Post",
  categories: "tech, news",
  content: "Nothing to tell" };

const post3 = {
  id: 222,
  title: "Third Post",
  categories: "movies",
  content: "No no" };

const posts = {
  7: post1,
  33: post2,
  222: post3
};

export default function PostsReducer(state = {}, action) {

  switch (action.type) {
    case FETCH_POSTS:
      if (action.error) {
        console.log("In PostsReducer; the action returned an error");
        return state;
      } else {
        return Object.assign({}, _.mapKeys(action.payload.data, 'id'));
      }
      break;

    case ADD_POST:
      if (action.error) {
        console.log("*** ERROR In PostsReducer/ADD_POST. error:", action.error, "; post: ", action.payload);
      } else {
        const post = action.payload.data;
        //const id = Object.keys(state).length.toString();
        let newPost = { [post.id]: post };
        const newState = { ...state, ...newPost };
        console.log("In PostsReducer/ADD_POST:");
        console.log("state = ", state);
        console.log("newState = ", newState);
        state = newState;
        return state;
      }
      return state;
      break;

    case DELETE_POST:
      if (action.error) {
        console.log("*** ERROR In PostsReducer/DELETE_POST. error:", action.error, "; id: ", action.payload);
      } else {
        const id = action.payload;
        console.log("*** In PostsReducer/DELETE_POST. id:", id);
        let newState = Object.assign({}, state);
        delete newState[id];
        return newState;
      }
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
