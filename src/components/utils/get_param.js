// getParam parameters:
// - queryStr: the string starting with '?' in:
//      http://www.aaa.com/book?inLibrary=false&catId=Mann
// - param: parameter for which value is returned
//      'inLibrary' or 'catId'

export function getParam(queryStr, param) {
  const regex = new RegExp(`.*${param}=(\\w+)&?.*$`);
  const value =
    queryStr.replace(regex, '$1');
  return value;
}
