var router = require('express').Router();
var mongoose = require('mongoose');
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
    Profile.find({isLandlord: true}).then(function(profile){
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

router.get("/profile/:id", function (req, res, next) {
    if (req.params.id) {
        Profile.findById(req.params.id).then(function (profile) {
            if (!profile) {
                return res.json({profile: req.profile.toJSONFor(false)});
            }
            return res.json({profile: profile});
        }).catch(function () {
            return res.sendStatus(404)
        });
    } else {
        return res.sendStatus(404);
    }
});


router.post('/profile', function(req, res, next){
    var profile = new ProfileModel(req.body);

    profile.save().then(function(){
        return res.json({saved: true});
    }).catch(next);
});

router.put('/profile/:id', function(req, res, next){
    const prof = {
        name: req.body.name,
        isLandlord: req.body.isLandlord,
        title: req.body.title,
        description: req.body.description,
        gender: req.body.gender,
        dateOfBirth: req.body.date,
        spokenLanguages: req.body.spokenLanguages,
        livesInCountry: req.body.livesInCountry,
        residence: req.body.residence,
        status: req.body.status,
        smokeInHouse: req.body.smokeInHouse,
        studentenVereniging: req.body.studentenVereniging,
        educationLevel: req.body.educationLevel
    };
    Profile.update({_id: req.params.id}, prof, function(err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


module.exports = router;
