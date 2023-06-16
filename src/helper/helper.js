const Response = (message, data) => ({
  status: 200,
  message,
  result: data,
});

function validateUsername(username) {
  // Regular expression pattern for username validation
  var pattern = /^[a-zA-Z0-9._ ]{3,20}$/;

  // Check if the username matches the pattern
  if (pattern.test(username)) {
    return true; // Username is valid
  } else {
    return false; // Username is invalid
  }
}

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

module.exports = {
  Response,
  validateUsername,
  getKeyByValue,
};
