const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema],
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// async function updateAuthor(courseId) {
//   await Course.updateOne({ _id: courseId }, {
//     $unset: {
//       'author': ''
//     }
//   });
// }

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// updateAuthor('609c4faabd088cacba232718');
// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Sunday' })
// ]);
// listCourses();

// addAuthor('609c56203dba64be444e9cde', new Author({name: 'Emmy'}));
removeAuthor('609c56203dba64be444e9cde', '609c59d0a235dac89c881e19');