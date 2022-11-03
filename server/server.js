const express = require('express');


const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.static('../client/dist/'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



require('./routes/htmlRoutes')(app);

app.listen(PORT, function() {
    console.log(`now listent to port: ${PORT}`);
});