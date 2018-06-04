'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Profile Schema
 */

const ProfileSchema = new Schema({
    id: { type: String, required: true },
    isLandlord: { type: Boolean, default: false},
    name: { type: String, default: '' },
    title: { type: String, default: ''},
    description: { type:/**/ String, default: ''},
    gender: { type: String, default: ''},
    dateOfBirth: { type: Date, default: ''},
    spokenLanguages: { type: String, default: ''},
    livesInCountry: { type: String, default: ''},
    residence: { type: String, default: ''},
    status: { type: String, default: ''},
    smokeInHouse: { type: Boolean, default: false},
    studentenVereniging: { type: Boolean, default: false},
    educationLevel: { type: String, default: ''}
});


/**
 * Methods
 */

ProfileSchema.methods = {
    toJSONFor: function (profile) {
        return {
            objectID: profile.id,
            isLandlord: profile.isLandlord,
            name: profile.name,
            title: profile.title,
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
        }
    }

};

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = {
    Profile: Profile
};
