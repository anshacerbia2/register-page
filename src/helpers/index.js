const phoneNumberFormater = (val) => {
  const v = val
    .replace(/[^0-9,.]+/gi, "")
    .substr(0, 11);

  const parts = [];

  if (val.trim().length) {
    parts.push(v.substr(0, 3));
    for (let i = 3; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }
  }
  // console.log(parts);
  return parts.length > 0 ? '+62 ' + parts.join("-") : val;
}

const companyNameFormater = (val) => {
  const v = val
    .replace(/[^A-Za-z0-9]+/gi, "")
  return v.trim();
}

export { phoneNumberFormater, companyNameFormater };