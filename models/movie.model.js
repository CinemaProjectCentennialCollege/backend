const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
    name: String,
})

// const ProductionCompanySchema = mongoose.Schema({
//     name: String,
// })

const MovieSchema = mongoose.Schema({
    title: String,
    tagline: String,
    poster_path: String,
    backdrop: String,
    genres: [TagSchema],
    production_companies: [{
        name: String,
    }],
    production_countries: [{
        name: String,
    }]
},
{
    timestamps:true
}
);
module.exports = mongoose.model('Movie', MovieSchema);