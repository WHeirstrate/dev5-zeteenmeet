const PG = require("../config/postgress");

/**
 * GET
 *
 * Fetch all organisations from the 'organisations' table.
 * @returns {Object} - A JSON-object with all organisations will be returned.
 */
const getAllOrganisations = (req, res) => {
  PG.select()
    .from("organisations")
    .then((data) => {
      return res.status(200).json(data);
    });
};

module.exports = {
  getAllOrganisations,
};
