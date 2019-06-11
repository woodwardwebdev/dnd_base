// Index, New, Create, Show, Edit, Update, Destroy

const express = require("express");
const router = express.Router();
const Pc = require("../models/pc");
const Item = require("../models/item");
// Index Route
router.get("/", function(req, res) {
  Item.find({}, function(err, founditems) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("items/index", { items: founditems });
    }
  });
});
// New Route
router.get("/new", function(req, res) {
  Pc.find({}, function(err, foundPcs) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("items/new", { Pcs: foundPcs });
    }
  });
});
// Create Route
router.post("/", function(req, res) {
  console.log("created item: " + req.body.armortype);
  let attunement;
  if (req.body.attunement == "on") {
    attunement = true;
  } else {
    attunement = false;
  }
  let owner;
  if (req.body.currentOwner !== "party") {
    owner = req.body.currentOwner;
  } else {
    owner = null;
  }
  Item.create(
    {
      name: req.body.name,
      type: req.body.type,
      armortype: req.body.armortype,
      weapontypemelee: req.body.weapontypemelee,
      weapontyperanged: req.body.weapontyperanged,
      rarity: req.body.rarity,
      attunement: attunement,
      traits: req.body.traits,
      description: req.body.description,
      currentOwner: owner
    },
    function(err, createditem) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        createditem.save();
        if (createditem.currentOwner) {
          Pc.findById(createditem.currentOwner, function(err, foundpc) {
            if (err) {
              console.log(err);
              releaseEvents.redirect("back");
            } else {
              foundpc.items.push(createditem);
              foundpc.save();
              console.log(foundpc);
              Item.find({}, function(err, founditems) {
                if (err) {
                  console.log(err);
                  res.redirect("back");
                } else {
                  req.flash(
                    "success",
                    "Item: " + createditem.name + " Created!"
                  );
                  res.redirect("/items");
                }
              });
            }
          });
        } else {
          Item.find({}, function(err, founditems) {
            if (err) {
              console.log(err);
              res.redirect("back");
            } else {
              req.flash("success", "Item: " + createditem.name + " Created!");
              res.redirect("/items");
            }
          });
        }
      }
    }
  );
});
// Show Route
router.get("/:id", function(req, res) {
  Item.findById(req.params.id, function(err, founditem) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("items/show", { item: founditem });
    }
  });
});
// Edit Route
router.get("/:id/edit", function(req, res) {
  Item.findById(req.params.id, function(err, founditem) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      Pc.find({}, function(err, foundPcs) {
        if (err) {
          confirm.log(err);
          res.redirect("back");
        } else {
          res.render("items/edit", { item: founditem, Pcs: foundPcs });
        }
      });
    }
  });
});

// Update Route

// Destroy Route
router.delete("/:id", function(req, res) {
  Item.findByIdAndDelete(req.params.id, function(err, deleteditem) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      req.flash("success", "Item: " + deleteditem.name + " deleted");
      res.redirect("/items");
    }
  });
});

module.exports = router;
