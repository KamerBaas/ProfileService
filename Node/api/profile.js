var router = require('express').Router();
var mongoose = require('mongoose');
var request = require('request');
var isAuthenticated = require('../middlewares/isAuthenticated');

var Profile = require('../models/profile').Profile;
var ProfileModel = mongoose.model('Profile');



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

router.get('/profile', function(req, res, next){
    console.log("Profile GET");

    Profile.find().then(function(profile){
        if(!profile){ return res.send("Nothing"); }

        return res.json(profile);
    }).catch(next);
});

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

router.get("/profile/:id", (req, res) => {
    Profile.findById(req.params.id).then((profile) => {
        if (!profile) {
            return res.json({profile: req.profile.toJSONFor(false)});
        }
        return res.json({profile: profile});
    }).catch(() => {
        return res.sendStatus(404)
    });
});

router.post('/profile', isAuthenticated, (req, res) => {
    var profile = new ProfileModel(req.body);

    profile.save().then(function(prof){

        var profi = req.body;
        profi.objectID = prof._id;

        console.log(profi);
        //console.log({profile :profi});

        request.post({ url: 'http://gateway.kamerbaas.nl/profile/', json: {profile: profi}}, function optionalCallback(err, httpResponse, body) {
            if (err) { return console.error('upload failed:', err);}
            console.log('Upload successful!  Server responded with:', body);
        });

        return res.json({saved: true});
    }).catch(next);
});

router.put('/profile/:id', isAuthenticated, function(req, res, next){

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
