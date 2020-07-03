const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/categories', require('./routes/categories'));
app.use('/products', require('./routes/products'));
app.use('/shops', require('./routes/shops'));
app.use('/users', require('./routes/users'));

app.listen(9000, () => {
    console.log("App starting ....");
})
