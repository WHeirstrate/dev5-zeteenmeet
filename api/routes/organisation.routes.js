const { organisationExists } = require("../helpers/helper");
const PG = require("../config/postgress");
const EXPRESS = require("express");
const ORGANISATIONROUTER = EXPRESS.Router();

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

/**
 * POST
 *
 * Add a new organisation to the 'organisations' table. Every request should
 * contain certain params, and some are optional that default to 0.5.
 *
 * @param name The name of the new organisation that will be added.
 * @param rate (optional) rate (in euros) that will be charged when a new
 * consumption has been added. Defaults to 0.50 (euro).
 * @returns {JSON} The user that has been added. If this was unsuccesful, a
 * statuscode 401 will be returned.
 */
const addOrganisation = (req, res) => {
  PG("organisations")
    .insert({
      name: req.body.name,
      rate: req.body.rate || 0.5,
    })
    .returning("*")
    .then((data) => {
      return res.status(200).send(data);
    });

  //PG("organisations").insert({});
};

/**
 * PUT
 *
 * Update an organisation by id (passed in the uri) with the parameters that get passed
 * in the body.
 * @param rate The rate at which a consumption will be charged.
 * @returns {JSON} The user that was updated. If the user was unable to be
 * updated, a status 401 is returned. if the wrong params were passed, a status
 * 400 will be returned.
 */
const updateOrganisation = (req, res) => {
  if (req.body.rate) {
    try {
      PG("organisations")
        .where("id", req.params.id)
        .update({
          rate: req.body.rate,
        })
        .returning("*")
        .then((data) => {
          return res.status(200).json(data);
        });
    } catch (err) {
      return res.status(401).send("There is no organisation with this id");
    }
  } else {
    return res.status(400).send("Invalid data");
  }
};

/**
 * DELETE
 *
 * Delete an organistion with the specified id (in the uri).
 * @param id - must be added in the request uri
 * @returns {StatusCode} 200 when the user has succesfully been removed, 400 when
 * the user could not be deleted.
 */
const deleteOrganisation = (req, res) => {
  if (!organisationExists(PG, req.params.id))
    return res.status(401).send("There is no organisation with this id");
  try {
    PG("organisations")
      .where("id", req.params.id)
      .del()
      .then(() => {
        return res.status(200).send("Organisation deleted succesfully");
      });
  } catch (err) {
    return res.status(400).send("Something went wrong", err);
  }
};

ORGANISATIONROUTER.route("/")
  .get((req, res) => getAllOrganisations(req, res))
  .post((req, res) => addOrganisation(req, res));
ORGANISATIONROUTER.route("/:id")
  .put((req, res) => updateOrganisation(req, res))
  .delete((req, res) => deleteOrganisation(req, res));

module.exports = ORGANISATIONROUTER;
