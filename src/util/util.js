export function parsePhoneNumber(str) {
  // helper function
  // INPUT: "(503) 123-4567"
  // RETURN: "5031234567"
  const phoneStr = str;
  const phoneArr = phoneStr.split('');
  const targetArr = [];
  phoneArr.forEach(char => {
    if (parseInt(char) || char == "0") {
      targetArr.push(char);
    }
  })
  return targetArr.join('');
}

export function phoneNumPrettyPrint(str) {
  // inverse of above
  // INPUT: "5031234567"
  // OUTPUT: "(503) 123-4567"
  let arr = str.split('');
  let prefix;
  if (arr.length === 11) {
    prefix = arr.shift();
  } else if (arr.length !== 10) {return 'what is the deal with this phone number?'}
  let segments = [];
  segments[0] = arr.splice(0,3).join('');
  segments[1] = arr.splice(0,3).join('');
  segments[2] = arr.join('');
  return `(${segments[0]}) ${segments[1]}-${segments[2]}`;
}
