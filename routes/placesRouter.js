const express = require('express');
const placesRouter = express.Router();

const authMid = require('../utils/jwt');
const placeController = require('../src/controllers/Place');

// Route Login

placesRouter.get('/places', placeController.getAllPlaces);
placesRouter.get('/places/:id', placeController.getOnePlaces);

placesRouter.post('/places', authMid.authenticateJWT, placeController.postAppart);

module.exports = placesRouter;
