const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers.js');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6058f418c47d9b27e852be6b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis mollitia culpa eaque. Illum deleniti magni sequi iste nostrum debitis amet odit, aliquam architecto ut libero officia corporis dolor quisquam deserunt.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dmbn8ucfc/image/upload/v1616551955/AdventureAwaits/ajnuoli4jr0dob56ysrz.jpg',
                    filename: 'AdventureAwaits/ajnuoli4jr0dob56ysrz'
                },
                {
                    url: 'https://res.cloudinary.com/dmbn8ucfc/image/upload/v1616551955/AdventureAwaits/xwsvlv7hnrouhwotbjx6.jpg',
                    filename: 'AdventureAwaits/xwsvlv7hnrouhwotbjx6'
                },
                {
                    url: 'https://res.cloudinary.com/dmbn8ucfc/image/upload/v1616551991/AdventureAwaits/l4uvkgysdc2xjiw5rraq.jpg',
                    filename: 'AdventureAwaits/l4uvkgysdc2xjiw5rraq'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});