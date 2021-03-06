const mongoose = require('mongoose');   //Returns a mongoose object.  It is a library to help data modeling in mongodb.  As mongodb 
                                        //is a nosql database, the collection has a schema and is modelled using mongoose.   Using mongoose,
                                        //the collections can be queried, filtered, updated etc.,

mongoose.connect('mongodb://localhost/playground')
        .then(()=> console.log('Connected to MongoDb...'))
        .catch(error => console.error('Coudln\'t connect to mongodb', error));
    
//Define the schema for the document collection.
const courseSchema = new mongoose.Schema({
    name: { type: String, 
            required: true,
            minlength: 3,
            maxlength: 255},
    cateogry: {
        type: String,
        enum : ['web', 'mobile', 'network'],
        required: true,
        lowercase: true,
        //uppercase: true
        trim: true
    },            
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback){
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
                //Do some async work.
                
                return 
            },
            message: 'A course should have atleast one tag.'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){return this.isPublished;},
        min: 10,
        max: 200,
        get: v => Math.round(v), 
        set: v => Math.round(v)
    }
});

//Create a model:  Model defines a programming interface for interacting with the databsae (CRUD) etc.,
const Course = mongoose.model('Course', courseSchema);

async function CreateCourse(){
    //Create a course object
    const course = new Course ({
    name: 'My course',
    author: 'Prash',
    tags: ['frontend'],  //document is mongodb can be a complex object like an array.
    isPublished: true,
    cateogry: 'WEB',
    price: 15.9
    }) ;

    try{
    //await course.validate();
     const result = await course.save();
     console.log(result);
    }
    catch(ex)
        {
        for (field in ex.errors)            
            console.log(ex.errors[field].message);
        //console.log('Course was not saved: '+ ex.message);
        }
}
//CreateCourse();

async function GetCourses(){
    const pageNumber = 2;
    const pageSize = 10;   //Normally these are sent as query parameters to a REST api.

    //   /api/courses?pageNumber=2&pageSize=10

    //Find an author whose name starts with 'Prash'
    const courses = await Course
                                .find({_id:'5b5e46e6eb7d004630dc1ac1'})
                                //.find({author: 'Prash', isPublished: true}) 
                                // .skip((pageNumber - 1) * pageSize)
                                // .limit(pageSize)  //Limit the number of results.
                                .sort({name: 1}) //Sort in ascending order.
                                 .select({name: 1, tags: 1, price: 1}); //Select the desired properties in the output.
                                //.count();
    console.log(courses[0].price);
}

GetCourses();

// async function removeCourse(id){
//     //Delete a course.

//     //const result = await Course.deleteOne({_id: id});
//     const course = await Course.findByIdAndRemove (id);
//     console.log(course);
// }

// removeCourse('5b50fdfc7b3ba87b2c6db2f5');

