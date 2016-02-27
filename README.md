# JerryMice

A simple prototype environment wrapper using Express.js

- Perfect for prototyping projects.
- Javascript Server-Side.
- EJS Embeded Javascript logic.
- Express.js powerful routing.
- Layout oriented includes, like .NET Razor template engine


### Get it
```
git clone https://github.com/Javiani/JerryMice.git
```

### Install it

```
npm install
```

### Run it

```
npm start
```

Just open your browser on `localhost:3000/` and your prototype site is ready and up.

## Config

```js
jerrymice.run({
	baseUrl		:__dirname, // Required
    public      :'www', // Required, Specify public folder
	port		:3000, //Optional
	services	:/services/, // Optional
    404         :'404', // Optional, Path for 404 html file
    error       :'error' // Optional, Path for error html file
});
```
