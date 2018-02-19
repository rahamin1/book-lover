import * as actions from '../actions/action_types';

const user1 = { id: 1,
  userName: "Yossi",
  mail: "yossi@mail.com",
  password: "yossi" };

const user2 = { id: 2,
  userName: "Shoshi",
  mail: "shoshi@mail.com",
  password: "shoshi" };

const users = {
  1: user1,
  2: user2
};

export default function UsersReducer(state = users, action) {

  switch (action.type) {
    case 'aaa':
      return state;
      //break;

    default:
      return state;
  }
}
