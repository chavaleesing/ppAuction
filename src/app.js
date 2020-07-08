const express = require('express');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());
app.use(express.urlencoded());


app.use('/categories', require('./routes/categories'));
app.use('/products', require('./routes/products'));
app.use('/shops', require('./routes/shops'));
app.use('/users', require('./routes/users'));

app.listen(9000, () => {
    console.log("App starting ....");
})
