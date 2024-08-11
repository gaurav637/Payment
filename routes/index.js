const express = require("express");
const router = express.Router();

const productRoutes = require('./product.router');
const parmentRoutes = require('./payment.router');

const routers = [
    {
        path: "/product",
        route: productRoutes
    },
    {
        path: "/payment",
        route: parmentRoutes
    }
];

routers.map((obj) => {
    router.use(obj.path, obj.route);
});

module.exports = router;

