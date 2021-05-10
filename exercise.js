async function notifyCustomer(id) {
  try {
    const customer = await getCustomer(id);
    console.log('Customer: ', customer);
    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log('Top movies: ', movies);
      return sendEmail(customer.email, movies);      
    }  
  } catch (error) {
    
  }  
}

function getCustomer(id) {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve({ 
        id, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);     
  })
}

function getTopMovies() {
  return new Promise (resolve => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);    
  })
}

function sendEmail(email, movies) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Email sent...');
    }, 4000);    
  })
}

notifyCustomer(1)
  .then(result => console.log(result))