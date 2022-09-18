const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 150; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62bdde580bae5df110cecd43',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt id tenetur incidunt quos iure facilis, laudantium doloremque illo. Consequuntur consequatur officiis eos? Animi, id consequuntur. Sit asperiores dolore numquam iste?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            image: [
                {
                    url: 'https://res.cloudinary.com/doaxtlc91/image/upload/v1663495183/YelpCamp/IMG_20180813_120538_z0pezd.jpg',
                    filename: 'YelpCamp/IMG_20180813_120538_z0pezd',
                },
                {
                    url: 'https://res.cloudinary.com/doaxtlc91/image/upload/v1663495139/YelpCamp/IMG_20180315_181907_io9xkk.jpg',
                    filename: 'YelpCamp/IMG_20180315_181907_io9xkk',
                },
                {
                    url: 'https://res.cloudinary.com/doaxtlc91/image/upload/v1663495146/YelpCamp/IMG_20180316_180601_e7bwla.jpg',
                    filename: 'YelpCamp/IMG_20180316_180601_e7bwla',
                },
                {
                    url: 'https://res.cloudinary.com/doaxtlc91/image/upload/v1663495267/YelpCamp/IMG_20190414_113055_j7ulrv.jpg',
                    filename: 'YelpCamp/IMG_20190414_113055_j7ulrv',
                },
                {
                    url: 'https://res.cloudinary.com/doaxtlc91/image/upload/v1663495246/YelpCamp/IMG_20181206_091339_wo3dgz.jpg',
                    filename: 'YelpCamp/IMG_20181206_091339_wo3dgz',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})