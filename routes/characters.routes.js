const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

/* GET new character form page */
router.get("/characters/create", (req, res, next) => {
        res.render("characters/create")
    })

   /* GET characters details page */ 
router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


/* GET the characters details page to Update it */ 
   router.get("/characters/:id/edit", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/edit", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

/* POST the updated character */ 
router.post('/characters/:id/edit', async (req, res) => {
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,req.body)
    .then(() => {
        res.redirect("/characters")
    })  
        .catch(err => console.error(err))
});


/* POST new character from Create form page to characters page */ 
router.post("/characters/create", (req, res, next) => {
    console.log(req.body)
    axios.post(`https://ih-crud-api.herokuapp.com/characters`,req.body)
    .then(() => {
        res.redirect("/characters")
})
    .catch(err => console.error(err))
});

/* GET to delete a character from the details-character view  ? */ 
router.get("/characters/:id/delete", (req, res, next) => {
    res.send(`Here we'll delete character with ID ${req.params.id}`);
    const characterId = req.params.id
    axios.deleteCharacter(`https://ih-crud-api.herokuapp.com/characters/:id`,characterId)
    .then(() => {
        res.redirect("/characters")
})
    .catch(err => console.error(err))
});

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters