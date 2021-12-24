/**
 *
 * @param {*} body The entire body with name, email and password params that
 * will be checked if they meet the requirements
 * @returns
 */
function checkAddUserBody(body) {
  if (!body || !body.name || !body.email || !body.password) return false;
  if (
    !checkName(body.name) ||
    !checkEmail(body.email) ||
    !checkPassword(body.password)
  )
    return false;
  return true;
}

/**
 *
 * @param {*} name The name that is checked for
 * @returns True if the name meets the requirements, false if it it doesn'
 */
function checkName(name) {
  if (!name || !name.length) return false;
  return true;
}

/**
 *
 * @param {*} email The email that is checked for
 * @returns True if the email meets the requirements, false if it it doesn'
 */
function checkEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
 *
 * @param {*} pass The password that is checked for
 * @returns True if the password meets the requirements, false if it it doesn'
 */
function checkPassword(pass) {
  if (!pass || !pass.length) return false;
  return true;
}

/**
 *
 * @param {*} PG The Postgres instance that will be used to search
 * @param {*} id The id of the user that is searched
 *
 * @returns {Boolean} True if the user exists, false if it doesn't exist
 */

function userExists(PG, id) {
  try {
    return PG("users")
      .where("id", id)
      .then((user) => {
        if (!user.length) return false;
        return true;
      });
  } catch (err) {
    console.log("An error occured:", err);
  }
}

/**
 *
 * @param {*} PG The Postgres instance that will be used to search
 * @param {*} id The id of the organisation that is searched
 *
 * @returns {boolean} True if the organisation exists, false if it doesn't exist
 */
function organisationExists(PG, id) {
  try {
    return PG("organisations")
      .where("id", id)
      .then((organisation) => {
        if (!organisation.length) return false;
        return true;
      });
  } catch (err) {
    console.log("An error occured:", err);
  }
}

module.exports = {
  checkAddUserBody,
  checkName,
  checkEmail,
  checkPassword,
  userExists,
  organisationExists,
};
