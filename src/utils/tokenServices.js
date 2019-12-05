const jwtdecode = require('jwt-decode');
/**
 * Gets the token from local storage and decodes the information needed
 */
function getToken() {
  const token = localStorage.getItem('app-token');
  if(!token){
    return null;  
  }
  const results = jwtdecode(token);
  return {id: results.id}
}
/**
 * Removes token from local storage ie: logout
 */
function removeToken() {
  localStorage.removeItem('app-token');
}

module.exports = {
  getToken,
  removeToken,
}