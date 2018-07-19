const mongoose = require('mongoose'); //Returns a mongoose object.

mongoose.connect('mongodb://localhost/playground')
        .then(()=> console.log('Connected to MongoDb...'))
        .catch(error => console.error('Coudln\'t connect to mongodb', error));
        