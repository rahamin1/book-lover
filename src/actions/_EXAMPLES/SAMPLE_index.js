export const ADD_TO_CART = 'ADD_TO_CART';
export const CHECKOUT = 'CHECKOUT';

export function selectBook(book) {
  console.log("in the selectBook action", book);
  return {
    type: 'BOOK_SELECTED',
    payload: book
  };
}
