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

function checkName(name) {
  if (!name || !name.length) return false;
  return true;
}

function checkEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function checkPassword(pass) {
  if (!pass || !pass.length) return false;
  return true;
}

function userExists(PG, id) {
  PG("users").where("id", id);
}

module.exports = {
  checkAddUserBody,
  checkName,
  checkEmail,
  checkPassword,
  userExists,
};
