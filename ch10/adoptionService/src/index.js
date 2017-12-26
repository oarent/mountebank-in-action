'use strict';

var express = require('express'),
  app = express(),
  url = process.env.RESCUE_URL || "https://api.rescuegroups.org/",
  gateway = require('./models/rescueGroupsGateway').create(url);

app.get('/nearbyAnimals', function (req, res) {
  console.log('[Adoption Service] ' + req.url);
  gateway.getNearbyAnimals(req.query.postalCode, req.query.maxDistance).then(function (animals) {
    res.json({ animals: animals });
  }, function (err) {
    res.statusCode = 500;
    res.send(err);
  }).done();
});


app.get('/animals/:id', function (req, res) {
  console.log('[Adoption Service] ' + req.url);
  gateway.getAnimalById(req.params.id).then(function (animal) {
    res.json(animal);
  }, function (err) {
    res.statusCode = 500;
    res.send(err);
  }).done();
});

app.listen(5000, function () {
  console.log('Adoption service started on port 5000');
});
