require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;

function fetchNews(url, res) {
    axios.get(url)
    .then(response => {
        if (response.data && response.data.totalResults > 0) {
            res.json({
                status: 200,
                success: true,
                message: "Successfully fetched the data",
                data: response.data,
            });
        } else {
            res.json({
                status: 200,
                success: true,
                message: "No more results",
            });
        }
    })
    .catch(error => {
        res.json({
            status: 500,
            success: false,
            message: "Failed to fetch the data",
            error: error.message,
        });
    });
}

// Top-headlines route
app.options("/top-headlines", cors());
app.get("/top-headlines", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "business"; // Spelling corrected for 'business'

    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

// All news route
app.get("/all-news", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    let url = `https://newsapi.org/v2/everything?q=technology&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

// Country-specific headlines route
app.options("/country/:iso", cors());
app.get("/country/:iso", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;  
    const country = req.params.iso;

    // Log the constructed URL for debugging
    console.log(`Request URL: https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`);

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
