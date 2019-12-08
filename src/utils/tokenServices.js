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
  return {id: results._id}
}
/**
 * Removes token from local storage ie: logout
 */
function removeToken() {
  localStorage.removeItem('app-token');
}
/**
 * Gets the whole token
 */
function getWholeToken(){
  const token = localStorage.getItem('app-token');
  if(!token){
    return null;  
  }
  return token;
}

module.exports = {
  getToken,
  getWholeToken,
  removeToken,
}