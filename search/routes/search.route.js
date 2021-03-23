const router = require('express').Router();
const SearchModel = require('../models/search.model');


const axios = require("axios");
const cheerio = require("cheerio");
const url = "http://localhost/crawler/";


async function get_data(url) {
    let response = await axios(url).catch(err => console.error("Connection error", err))
    return response;
};



//add
router.route('/add').post((req, res) => {

    get_data(url)
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html)
            const result = $('li')
            result.each(function () {
                let followers = $(this).text()
                const search_name = followers;
                const num_followers = followers;
                const newSearh = new SearchModel({ search_name, num_followers })

                newSearh.save()
            })
        })
        .then(result => res.send("list was added"))
        .catch(err => res.status(400).json('Error:' + err))
})


//list
router.route("/list/:id").get((req, res) => {
    SearchModel.find({ "search_name": req.params.id })
        .then(result => res.send(result))
        .catch(err => res.status(400).json('Error:' + err))
})

module.exports = router