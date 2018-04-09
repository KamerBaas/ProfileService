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

// ProfileSchema.methods = {
//     toJSONFor: function (profile) {
//         return {
//             slug: this.slug,
//             title: this.title,
//             description: this.description,
//             body: this.body,
//             createdAt: this.createdAt,
//             updatedAt: this.updatedAt,
//             tagList: this.tagList,
//             favorited: profile ? profile.isFavorite(this._id) : false,
//             favoritesCount: this.favoritesCount,
//             author: this.author.toProfileJSONFor(profile)
//         }
//     }
//
// };

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = {
    Profile: Profile
};
