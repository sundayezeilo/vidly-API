const express = require('express');
const router = express.Router();


const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'}
];

router.get('/', (req, res) => {
  res.send(JSON.stringify(courses))
});

router.post('/' , (req , res)=>{
  const { error } = validateCourse(req.body); // returns an object
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
})

router.put('/:id', (req, res) => {
  // Lookup htis course
  // If not exist, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course){
    return res.status(404).send('The course with the given id was not found!');
  }  
  // Otherwise, validate
  // If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body); // returns an object
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // If valid, update the course
  // Return the course to the client
  course.name = req.body.name
  res.send(course);
})

router.delete('/:id', (req, res) => {

  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course){
     return res.status(404).send('The course with the given id was not found!');
  }
  
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
})

router.get('/:id/' , (req , res)=>{
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given id was not found!');
  res.send(JSON.stringify(course));
})


module.exports = router;