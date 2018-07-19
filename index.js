const mongoose = require('mongoose');   //Returns a mongoose object.  It is a library to help data modeling in mongodb.  As mongodb 
                                        //is a nosql database, the collection has a schema and is modelled using mongoose.   Using mongoose,
                                        //the collections can be queried, filtered, updated etc.,

mongoose.connect('mongodb://localhost/playground')
        .then(()=> console.log('Connected to MongoDb...'))
        .catch(error => console.error('Coudln\'t connect to mongodb', error));
    
//Define the schema for the document collection.
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

//Create a model:  Model defines a programming interface for itnracting with the databsae (CRUD) etc.,
const Course = mongoose.model('Course', courseSchema);

//Create a course object
const course = new Course ({
    name: 'Node.js Course',
    authoer: 'Prash',
    tags: ['node', 'backend'],  //document is mongodb can be a complex object like an array.
    isPublished: true
}) ;