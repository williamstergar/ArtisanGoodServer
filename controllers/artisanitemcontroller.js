let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-jwt");
// const artisanItem = require("../db").import("../models/artisanitem");

// CREATE ARTISAN ITEM //
router.post('/create', validateSession, async (req, res) => {
    const artisanItem = {
        name: req.body.artisanItem.name,
        price: req.body.artisanItem.price,
        description: req.body.artisanItem.description,
        availability: req.body.artisanItem.availability,
        photoURL: req.body.artisanItem.photoURL
    }
    artisanItem.create(artisanItemEntry)
        .then((artisanitems) => res.status(200).json(artisanitems))
        .catch((err) => res.status(500).json({ error: err }))
})
router.get("/", (req, res) => {
    artisanItem.findAll()
        .then((artisanitem) => res.status(200).json(artisanitem))
        .catch((err) => res.status(500).json({error: err}));
});
router.get("/owner", validateSession, function (req, res) {
    let userid = req.user.id;
    artisanItem.findAll({
        where: {owner: userid },
    })
        .then((artisanitem) => res.status(200).json(artisanitem))
        .catch((err) => res.status(500).json({err: err}));
});
router.get("/:name", function (req, res) {
    let name = req.params.name;
    artisanItem.findAll({
      where: { name: name },
    })
      .then((artisanitem) => res.status(200).json(artisanitem))
      .catch((err) => res.status(500).json({ error: err }));
  });
  router.put("/edit/:id", validateSession, function (req, res) {
    const updateArtisanItemEntry = {
      name: req.body.artisanItem.name,
      price: req.body.artisanItem.price,
      description: req.body.artisanItem.description,
      availability: req.body.artisanItem.availability,
      photoURL: req.body.artisanItem.photoURL,
    };
    const query = { where: { id: req.params.id, owner: req.user.id } };
    artisanItem.update(updateArtisanItemEntry, query)
      .then((artisanitem) => res.status(200).json(artisanitem))
      .catch((err) => res.status(500).json({ error: err }));
  });
// DELETE ARTISAN ITEM //
router.delete('/delete/:id', validateSession, async (req, res) => {
    const query = { where: { id: req.params.id, owner: req.user.id} }
    artisanItem.destroy(query)
        .then(() => res.status(200).json({ message: 'Artisan Item Removed' }))
        .catch((err) => res.status(500).json({ error: err }))
})
module.exports = router;