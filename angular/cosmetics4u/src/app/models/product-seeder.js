var Product = require("../models/index");

var products = [

    new Product({
        id: "P111",
        name: "Chanel",
        price: "12.99",
        description: "Lipstick",
        imageUrl: "files\\accept-tick-icon-12.png.gz"
    }),
    new Product({
        id: "P111",
        name: "Chanel",
        price: "12.99",
        description: "Lipstick",
        imageUrl: "files\\accept-tick-icon-12.png.gz"
    }),
    new Product({
        id: "P111",
        name: "Chanel",
        price: "12.99",
        description: "Lipstick",
        imageUrl: "files\\accept-tick-icon-12.png.gz"
    }),
    new Product({
        id: "P111",
        name: "Chanel",
        price: "12.99",
        description: "Lipstick",
        imageUrl: "files\\accept-tick-icon-12.png.gz"
    })

];

for(var i=0; i< products.length; i++){
    products[i].save();
}