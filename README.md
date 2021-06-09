## VIDLY API USING Node.js

#### In this project, I built a RESTful API, a backend service that allows users to rent movies from a movie rental company. I added a few endpoints to let any user view a list of movies in stock, rent a movie, or return a movie. A user can view a list of movies in stock. But an account is required in order to rent or return a movie. I created the following endpoints for the API client:

***User***
- user signup
- user authentication

***Movie***
- movie create
- movie show
- movie index
- movie update
- movie delete

***Genre***
- genre create
- genre show
- genre index
- genre update
- genre delete

***Customer***
- customer create
- customer show
- customer index
- customer update
- customer delete

***Rental***
- rental create
- rental show
- rental index

***Return***
- return create
- return show
- return index

***Built with***
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose

## 📝 Installation Guide

 - Open a terminal
 
 - Clone this app: 
        ```
        git clone git@github.com:ezeilo-su/vidly-API.git
        ```

- ```cd``` into the app directory.

- Run the command ```npm install``` to install the required dependencies.

- Add JSON Web Token (JWT) HMAC secret as an environment variable using the key: vidly_jwtPrivateKey.

- In the project directory, run:
- Run ```npm start``` to run the app. Default port is 3000, ie the server listens on ```http://localhost:3000```.
- Send an ```HTTP``` request to any of the following endpoints using any API client such as postman, insomnia, etc:

    * POST /api/users
    * GET /api/users/me

    * POST /api/auth

    * /api/customers
    * /api/genres
    * /api/movies
    * /api/rentals (POST only)
    * /api/returns (POST only)

### Live demo [here](https://videorentalsapi.herokuapp.com/api/movies)


## Author

👤 **Sunday Uche Ezeilo**

- Github: [@sundayezeilo](https://github.com/ezeilo-su)
- Twitter: [@SundayEzeilo](https://twitter.com/SundayEzeilo)
- Linkedin: [Sunday Ezeilo](https://www.linkedin.com/in/sundayezeilo/)


## 🤝 Contributing

- Contributions, issues, and feature requests are welcome!

- Feel free to check the [issues page](https://github.com/ezeilo-su/vidly-API/issues).

## Show your support

Give a ⭐️ if you like this project!


## Acknowledgments

- [Mosh Hamedani](https://twitter.com/moshhamedani?s=20) - The Complete Node.js Course | Code with Mosh
- [Ebuka Umeokonkwo](https://twitter.com/ebukaume?s=20)
- [Microverse Inc](https://twitter.com/microverseinc?s=20)
- etc


## 📝 License

This project is provided with MIT license.
