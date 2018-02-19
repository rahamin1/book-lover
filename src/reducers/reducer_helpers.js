export function getBookDetails(result) {
  const book = result.GoodreadsResponse.book[0];
  const desc = book.description[0];
  const id = book.id[0];

  if (!desc || desc.length === 0) {

    //console.warn(`* In getBookDetails. No description exists in Goodreads for book Id ${id}`);
  }
  return { id: id, desc: desc };
}

export function printActionError(reducer, type, action) {
  console.warn(`* In printActionError/${reducer}/${type}: ` +
    `action.error = ${action.error}`);
}

export function printPayloadError(reducer, type, action) {
  if (!action.payload) {
    console.warn(`* In printPayloadError/${reducer}/${type}: ` +
    ` action.payload is undefined. action = ${action}`);
    console.warn(action);
  } else {
    console.warn(`* In printPayloadError/${reducer}/${type}: ` +
    `action[.payload].result or ` +
    `action.payload.[result.]data is undefined. action.payload = ${action.payload}`);
  }
}

export function printParseError(reducer, type, err) {
  console.warn(`* In printParseError/${reducer}/${type}: ` +
    `Error from parseString: ${err}`);
}
