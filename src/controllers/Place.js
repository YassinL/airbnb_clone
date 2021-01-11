const express = require('express');
require('express-async-errors');
const model = require('../../models');
const Place = model.Place;
const City = model.City;

const NOSTRING_REGEX = /^\d+$/;

const { BadRequestError, ConflictError, UnAuthorizedError } = require('../helpers/errors');
const { CREATED } = require('../helpers/status_code');

module.exports = {
  postAppart: async (request, response) => {
    const { idCity, name, description, rooms, bathrooms, maxGuests, priceByNight } = request.body;

    if (description === null || description === undefined || description === '') {
      throw new BadRequestError('Mauvaise requête', "Le champ description n'est pas renseigné");
    }
    if (
      !NOSTRING_REGEX.test(rooms) ||
      !NOSTRING_REGEX.test(bathrooms) ||
      !NOSTRING_REGEX.test(maxGuests)
    ) {
      throw new BadRequestError('Mauvaise requête', 'Le champ doit être un nombre entier');
    }

    const cityFound = await City.findByPk(idCity, { attributes: ['name'] });

    const newPlaces = await Place.create({
      idCity: idCity,
      name: name,
      description: description,
      rooms: rooms,
      bathrooms: bathrooms,
      maxGuests: maxGuests,
      priceByNight: priceByNight,
    });
    return response.status(CREATED).json({
      id: newPlaces.id,
      city: cityFound.name,
      name: newPlaces.name,
      description: newPlaces.description,
      rooms: newPlaces.rooms,
      bathrooms: newPlaces.bathrooms,
      priceByNight: newPlaces.priceByNight,
      maxGuests: newPlaces.maxGuests,
    });
  },

  getAllPlaces: async (request, response) => {
    const where = {};
    if (request.query.city) {
      const cityFound = await City.findOne({
        where: { name: request.query.city },
        attributes: ['id'],
        raw: true,
      });
      where.idCity = cityFound.id;
    }

    const findPlaces = await Place.findAll({
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
      raw: true,
      attributes: ['id', 'name', 'description', 'rooms', 'bathrooms', 'maxGuests', 'priceByNight'],
      where,
    });
    return response.status(CREATED).json(findPlaces);
  },

  getOnePlaces: async (request, response) => {
    const { id } = request.params;
    const placeFound = await Place.findByPk(id, {
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
    });
    return response.status(CREATED).json(placeFound);
  },

  // updatePlace: async (promoId, data) => {
  //   const [, affectedRow] = await Promo.update(data, {
  //     where: { id: promoId },
  //     returning: true,
  //     plain: true
  //   });
  //   const { id, titre, iteration } = affectedRow;
  //   const updatedData = { id, titre, iteration };
  //   return updatedData;
  // },
};


