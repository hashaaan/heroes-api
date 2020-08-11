const express = require("express");
const Hero = require("../model/hero");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Hero.find({ deceased: true });
    // Hero.find().skip(10).limit(20);
    // Hero.find().sort({name:'desc'})
    // Hero.find({ likeCount: { $nin: [3000, 10000] } })
    // Hero.find().or([{ likeCount: 3000 }, { likeCount: 5000 }]) // should likeCount 3000 or 5000
    let heroes = await Hero.find()
      //.or([{ likeCount: 3000 }, { likeCount: 5000 }])
      .sort({ name: "asc" });
    //.select({ name: 1, deceased: 1, likeCount: 1 })
    //.countDocuments();
    res.send(heroes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("/:heroId", async (req, res) => {
  let heroId = req.params.heroId;

  try {
    let hero = await Hero.findById(heroId);
    res.send(hero);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post("/", async (req, res) => {
  if (!req.body.heroName) {
    return res.status(400).send("Not all mandatory values have been set!");
  }

  try {
    let heroToBeAddedToDb = new Hero({
      name: req.body.heroName,
      birthname: req.body.birthName,
      movies: req.body.movies,
      likeCount: req.body.likeCount,
      imgUrl: req.body.imgUrl,
      deceased: req.body.deceased,
    });

    heroToBeAddedToDb = await heroToBeAddedToDb.save();
    res.send(heroToBeAddedToDb);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

/*
router.put('/:heroId', async (req,res) => {

    let heroId = req.params.heroId;

    try {
        let hero = await Hero.findById(heroId);
        hero.set({ name: req.body.heroName });
        hero = await hero.save();
        res.send(hero);
    } catch(e) {
        return res.status(500).send(e.message); 
    }

});
*/

router.put("/:heroId", async (req, res) => {
  try {
    let hero = await Hero.findByIdAndUpdate(
      { _id: req.params.heroId },
      { $set: { likeCount: req.body.likeCount } },
      { new: true, useFindAndModify: false }
    );
    res.send(hero);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete("/:heroId", async (req, res) => {
  try {
    let hero = await Hero.findByIdAndDelete({ _id: req.params.heroId });
    res.send(hero);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
