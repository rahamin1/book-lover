export const FETCH_POSTS = 'FETCH_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
import axios from 'axios';

const ROOT_URL = "http://reduxblog.herokuapp.com/api/posts";
const API_KEY = "?key=YOSSI_123";
const POSTS_URL = `${ROOT_URL}${API_KEY}`;

export function fetchPosts() {
  const result = axios.get(POSTS_URL);
  return {
    type: FETCH_POSTS,
    payload: result
  };
}

export function addPost(post) {
  const result = axios.post(POSTS_URL, post);
  return {
    type: ADD_POST,
    payload: result
  };
}

export function deletePost(id, history) {
  const url = `${ROOT_URL}/${id}${API_KEY}`;
  axios.delete(url)
    .then(() => loadPosts(history));
  return {
    type: DELETE_POST,
    payload: id
  };
}

function loadPosts(history) {
  history.push('/');
}
