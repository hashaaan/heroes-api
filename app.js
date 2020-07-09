const express = require('express');
const { request } = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let heroesArray = [
    { id: 1, name: 'Captain America' },
    { id: 2, name: 'Iron Man' },
    { id: 3, name: 'Black Widow' }
];

app.get('/', (req,res) => {
    res.send("<h1 style='margin-top: 40px;'>Avengers Assemble!</h1>");
})

app.get('/api/heroes', (req,res) => {
    res.send(heroesArray);
})

app.get('/api/heroes/:heroId', (req,res) => {
    let heroId = parseInt(req.params.heroId); //request params
    //let optionalValue = req.query.showMore; // query params
    let hero = heroesArray.find(hero => hero.id === heroId);
    if(!hero) {
        res.status(404).send("The given id does not exist on our server");
    }
    res.send(hero);
})

app.post('/api/heroes', (req,res) => {
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
})

app.put('/api/heroes/:heroId', (req,res) => {
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
})

app.delete('/api/heroes/:heroId', (req,res) => {
    let heroId = parseInt(req.params.heroId);
    let heroIndex = heroesArray.findIndex(hero => hero.id === heroId);

    if(!heroIndex) {
        res.status(404).send("The given id does not exist on our server");
    }

    heroesArray.splice(heroIndex,1); // param1: index param2: no of nodes

    console.log(heroesArray);

    res.send(heroesArray);
})

app.listen(PORT, () => {
    console.log("Listning on Port : " + PORT);
});