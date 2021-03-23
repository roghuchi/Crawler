const router = require('express').Router();
const SearchModel = require('../models/search.model');


//add
router.route('/add').post((req, res) => {
    const search_name = req.body.search_name;
    const num_followers = req.body.num_followers;

    const newSearh = new SearchModel({ search_name, num_followers })

    newSearh.save()
        .then(() => res.json('Search was added.'))
        .catch(err => res.status(400).json('Error:' + err))
})

//list
router.route("/list/:id").get((req, res) => {
    SearchModel.find({ "search_name": req.params.id })
        .then(result => res.send(result))
        .catch(err => res.status(400).json('Error:' + err))
})

module.exports = router