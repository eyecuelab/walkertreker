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
