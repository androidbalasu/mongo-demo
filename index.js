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

//Create a model:  Model defines a programming interface for interacting with the databsae (CRUD) etc.,
const Course = mongoose.model('Course', courseSchema);

async function CreateCourse(){
    //Create a course object
    const course = new Course ({
    name: 'Angular Course',
    author: 'Prash',
    tags: ['angular', 'frontend'],  //document is mongodb can be a complex object like an array.
    isPublished: true
    }) ;

    const result = await course.save();
    console.log(result);
}
//CreateCourse();

async function GetCourses(){
    //Comparison operators
    //eq (equal)
    //ne (not equal)
    //gt (greather than)
    //gte (greather than or equal to)
    //lt (less than)
    //lte (less  than or equal to)
    //in
    //nin (not in)

    //Logical operators
    //or and and

    const courses = await Course
                                .find()
                                .or([{author: 'Prash'}, {isPublished: true}])  //Courses published by Prash or published courses.
                                .limit(10)  //Limit the number of results.
                                .sort({name: 1}) //Sort in ascending order.
                                .select({name: 1, tags: 1}); //Select the desired properties in the output.
    console.log(courses);
}

GetCourses();
