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
    const pageNumber = 2;
    const pageSize = 10;   //Normally these are sent as query parameters to a REST api.

    //   /api/courses?pageNumber=2&pageSize=10

    //Find an author whose name starts with 'Prash'
    const courses = await Course
                                .find({author: 'Prash', isPublished: true}) 
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)  //Limit the number of results.
                                .sort({name: 1}) //Sort in ascending order.
                                // .select({name: 1, tags: 1}); //Select the desired properties in the output.
                                .count();
    console.log(courses);
}

//GetCourses();

async function updateCourse(id){
    //Approach: Query first.
    // findById()
    // Modify its properties
    //Save()

    const course = await Course.findById(id);
    if (!course) return;

    //1) Setting properties individually.
    course.isPublished = true;
    course.author = 'Another author';

    // //2) Setting properties using the set method.
    // course.set({
    //     isPublished: true,
    //     author: 'Another author'
    // });

    const result = await course.save();

    console.log(result);

    //Approach: Update first
    //Update directly
    //Optionally get the updated document.
}

updateCourse('5b50fdfc7b3ba87b2c6db2f5');

