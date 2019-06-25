export function parsePhoneNumber(str) {
  // helper function
  // INPUT: "(503) 123-4567"
  // RETURN: "5031234567"
  const phoneArr = str.split('');
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
  // INPUT: "(503)123 4567"
  // OUTPUT: "+15031234567"
  const phoneArr = str.split('');
  const targetArr = [];
  phoneArr.forEach(char => {
    if (parseInt(char) || char == "0") {
      targetArr.push(char);
    }
  })
  if (targetArr.length === 10) {
    targetArr.unshift(1);
  } else if (targetArr.length !== 11) {return 'what is the deal with this phone number?'}
  return `+` + targetArr.join('');
}
