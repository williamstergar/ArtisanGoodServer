let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-jwt");
const { ItemModel } = require("../models");

// CREATE ARTISAN ITEM //
router.post('/create', validateSession, async (req, res) => { //works
    const {name, price, description, availability, photoURL} = req.body;
    const { id } = req.user;
    const itemEntry = {
        name,
        price,
        description,
        availability,
        photoURL,
        owner_id: id
    }
    try {
        const newItem = await ItemModel.create(itemEntry);
        res.status(200).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/", async (req, res) => { //works
    try {
      const items = await ItemModel.findAll();
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({error: err});
    }
  });
  router.get("/mine", validateSession, async (req, res) => { //works
    let {id} = req.user;
    try {
      const userItems = await ItemModel.findAll({
        where: {
          owner_id: id
        }
      });
      res.status(200).json(userItems);
    }catch (err) {
      res.status(500).json({ error: err});
    }
});
router.get("/:name", async (req, res) => { //works
    const {name} = req.params;
    try {
      const results = await ItemModel.findAll({
        where: {name: name}
      });
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: err});
    }
  });
  router.put("/update/:entryId", validateSession, async (req, res) => {
    const {name, price, description, availability, photoURL} = req.body.artisanItem;
    const itemId = req.params.entryId;
    const userId = req.user.id;
    const query = {
      where: {
        id: itemId,
        owner_id: userId
      }
    };
    const updatedItem = {
      name: name,
      price: price,
      description: description,
      availability: availability,
      photoURL: photoURL,
    }
    try {
      const update = await ItemModel.update(updatedItem, query);
      res.status(200).json(update);
    } catch (err) {
      res.status(500).json({ error: err});
    }
  });


  // DELETE ARTISAN ITEM //
router.delete('/delete/:id', validateSession, async (req, res) => {
    const userId = req.user.id;
    const itemId = req.params.id

    try {
        const query = {
            where: {
                id: itemId,
                owner_id: userId
            }
        }
        await ItemModel.destroy(query)
        res.status(200).json({ message: 'Item has successfully been deleted' })
    } catch (err) {
        res.status(500).json({
            message: 'Failed to delete item'
        })
    }
})
module.exports = router;