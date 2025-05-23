const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
require(`dotenv`).config(`../.env`);

const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT;

// Route to set latitude and longitude for a property
// Requires `latitude`, `longitude`, and `url` in the request body
router.post(`/SetLong_Lat`, async (req, res) => {
    try {
        const { latitude, longitude, url } = req.body;

        // Extract property ID from the URL
        let parts = url.split("/");
        let propid = parts[parts.length - 1];

        // Find the property by its ID
        let prop = await Property.findById(propid);

        if (!prop) {
            return res.status(404).json({
                success: true,
                message: "Property Not found"
            });
        }

        // Update the latitude and longitude of the property
        prop.Latitude = latitude;
        prop.Longitude = longitude;

        await prop.save();

        return res.status(200).json({
            success: true,
            message: "Successfully saved property."
        });
    } catch (e) {
        console.log(`Error while Setting Latitude and Longitude, Setting your default location to Mumbai Central`);
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some internal server error, please come back later. Setting your default location to Mumbai Central"
        });
    }
});

module.exports = router;