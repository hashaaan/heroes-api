const express = require('express');
const router = express.Router();

let heroesArray = [
    { id: 1, name: 'Captain America' },
    { id: 2, name: 'Iron Man' },
    { id: 3, name: 'Black Widow' }
];

router.get('/', (req,res) => {
    res.send(heroesArray);
});

router.get('/:heroId', (req,res) => {
    let heroId = parseInt(req.params.heroId); //request params
    //let optionalValue = req.query.showMore; // query params
    let hero = heroesArray.find(hero => hero.id === heroId);
    if(!hero) {
        res.status(404).send("The given id does not exist on our server");
    }
    res.send(hero);
});

router.post('/', (req,res) => {
    if(!req.body.name) {
        return res.status(400).send("Not all mandatory values have been set!");
    }
    let newHeroObj = {
        id: heroesArray.length + 1,
        name: req.body.name,
        age: req.body.age
    }
    heroesArray.push(newHeroObj);
    res.send(newHeroObj);
});

router.put('/:heroId', (req,res) => {
    let heroId = parseInt(req.params.heroId);
    let hero = heroesArray.find(hero => hero.id === heroId);

    if(!hero) {
        res.status(404).send("The given id does not exist on our server");
    }

    if(!req.body.name) {
        return res.status(400).send("Not all mandatory values have been set!");
    }

    hero.name = req.body.name;

    console.log(heroesArray);

    res.send(hero);
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