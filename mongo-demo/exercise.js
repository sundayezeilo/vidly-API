const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  // return await Course.find(
  //     { tags: 'backend', isPublished: true },
  //     { name: 1, author: 1, _id: 0 }
  //   )
  //   .sort({ name: 1 })

  // return await Course.find(
  //     {
  //       tags: { $in: ['frontend', 'backend'] },
  //       isPublished: true 
  //     },
  //     'name author price -_id'
  //   )
  //   .sort('-price')

  return await Course.find(
      { isPublished: true },
      'name author price -_id'
    )
    .or([
      { tags: 'frontend' },
      { tags: 'backend' }
    ])
    .sort('-price');
}



// getCourses()
//   .then(res => console.log(res.map(e => e._doc)));

// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if(!course) {
//     console.log('course not found');
//     return;
//   }

//   // course.isPublished = true;
//   // course.author = 'Another Author';
//   // OR
//   course.set({
//     isPublished: true,
//     author: 'A Different Author'
//   });

//   const result = await course.save();
//   console.log(result);
// }

async function updateCourse(id) {
  const result = await Course.updateOne(
    { _id: id },
    { isPublished: true, author: 'Different Author' }
  )

  console.log(result);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id })

  console.log(result);
}

removeCourse('609b83875ed801861846b7d8');