var router = require('express').Router();
var mongoose = require('mongoose');
var request = require('request');
var isAuthenticated = require('../middlewares/isAuthenticated');
const algoliasearch = require('algoliasearch');

var Profile = require('../models/profile').Profile;
var ProfileModel = mongoose.model('Profile');

const client = algoliasearch('8HYBSNX4Q5', '5d225d11ef765b21fb13bc97688801ef');

//  var express = require("express");

//  var app = express();



// // Preload user profile on routes with ':username'
// router.param('id', function(req, res, next, id){
//
//     console.log(req.params.id);
//
//     Profile.findOne({name: id}).then(function(profile){
//         if (!profile) { return res.sendStatus(404); }
//
//         req.profile = profile;
//
//         return next();
//     }).catch(next);
// });

// router.get('/profile', function(req, res, next){
//     console.log("Profile GET");

//     Profile.find().then(function(profile){
//         if(!profile){ return res.send("Nothing"); }

//         return res.json(profile);
//     }).catch(next);
// });

router.get('/profile/renter', function(req, res, next){
    Profile.find({isLandlord: false}).then(function(profile){
        if(!profile){ return res.send("Nothing"); }
        return res.json(profile);
    }).catch(next);
});

router.get('/profile/location/:location', function(req, res, next){

    if(req.params.location){
        Profile.find({residence: req.params.location}).then(function(profile){
            if(!profile){ return res.json({profile: req.profile.toJSONFor(false)}); }
            return res.json(profile);
        }).catch(function(){
            return res.sendStatus(404)
        });
    } else {
        return res.sendStatus(404);
    }
});

router.use(function (req, res, next) {
    isAuthenticated(req, res, next);
});

router.get("/profile/:id", (req, res, next) => {
    client.initIndex('profiles').getObject(req.params.id, (err, content) => {
        return res.json({ profile: content} );
    });
});

router.post('/profile/:id', (req, res, next) => {
    var profile = new ProfileModel(req.body);

    profile.objectID = req.params.id;

    client.initIndex('profiles').saveObject({
        objectID: profile.objectID,
        name: profile.name,
        title: profile.object,
        description: profile.description,
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth,
        spokenLanguages: profile.spokenLanguages,
        livesInCountry: profile.livesInCountry,
        residence: profile.residence,
        status: profile.status,
        smokeInHouse: profile.smokeInHouse,
        studentenVereniging: profile.studentenVereniging,
        educationLevel: profile.educationLevel
    }, function(err, content) {
        console.log(content);
        client.initIndex('profiles').getObject(profile.objectID, (err, content) => {
            console.log(content);
        });
    });

    return res.json({saved: true, user: profile});
});

router.put('/profile/:id', function(req, res, next){

    Profile.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true},  function(err, prof) {
        if (err) {
            res.json(err);
        }

        var profi = req.body;
        profi.objectID = prof._id;

        request.post({ url: 'http://gateway.kamerbaas.nl/profile/', json: {profile: profi}}, function optionalCallback(err, httpResponse, body) {
            if (err) { return console.error('upload failed:', err);}
            console.log('Upload successful!  Server responded with:', body);
        });
        res.json(prof);
    });
});


router.delete('/profile/:id', function(req, res, next){
    Profile.findByIdAndRemove({_id: req.params.id}, function(err, raw) {
        if (err) {
            res.json(err);
        }

        var prof = {};
        prof.objectID = req.params.id;
        request.delete({ url: 'http://gateway.kamerbaas.nl/profile/', json: {profile: prof}}, function optionalCallback(err, httpResponse, body) {
            if (err) { return console.error('upload failed:', err);}
            console.log('Upload successful!  Server responded with:', body);
        });
        res.json({removed: true});
    });
});


module.exports = router;
