const express = require('express');
const Hero = require('../model/hero');
const router = express.Router();

let heroesArray = [
    { id: 1, name: 'Captain America' },
    { id: 2, name: 'Iron Man' },
    { id: 3, name: 'Black Widow' }
];

router.get('/', async (req,res) => {
    try {
        // Hero.find({ deceased: true });
        // Hero.find().skip(10).limit(20);
        // Hero.find().sort({name:'desc'})
        // Hero.find({ likeCount: { $nin: [3000, 10000] } })
        // Hero.find().or([{ likeCount: 3000 }, { likeCount: 5000 }]) // should likeCount 3000 or 5000
        let heroes = await Hero.find()
            .or([{ likeCount: 3000 }, { likeCount: 5000 }])
            .sort({name:'asc'})
            .select({ name: 1, deceased: 1, likeCount: 1 })
            //.countDocuments();
        res.send(heroes);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

router.get('/:heroId', async (req,res) => {

    let heroId = req.params.heroId;

    try {
        let hero = await Hero.findById(heroId);
        res.send(hero);
    } catch(e) {
        return res.status(500).send(e.message); 
    }

});

router.post('/', async (req,res) => {
    if(!req.body.heroName) {
        return res.status(400).send("Not all mandatory values have been set!");
    }

    try {
        let heroToBeAddedToDb = new Hero({
            name: req.body.heroName,
            birthname: req.body.birthName,
            movies: req.body.movies,
            likeCount: req.body.likeCount,
            imgUrl: req.body.imgUrl,
            deceased: req.body.deceased
        })

        heroToBeAddedToDb = await heroToBeAddedToDb.save();
        res.send(heroToBeAddedToDb);
    } catch (e) {
        return res.status(500).send(e.message);
    }

});

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

router.delete('/:heroId', (req,res) => {
    let heroId = parseInt(req.params.heroId);
    let hero = heroesArray.find(hero => hero.id === heroId);

    if(!hero) {
        res.status(404).send("The given id does not exist on our server");
    }

    let heroIndex = heroesArray.indexOf(hero);

    heroesArray.splice(heroIndex,1); // param1: index param2: no of nodes

    console.log(heroesArray);

    res.send(hero);
});

module.exports = router;