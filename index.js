const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    console.log(data[0]);
    Recipe.create(data[0])
      .then(recipe => console.log(recipe.title))
      .catch(error => console.log(error))
    // Recipe.insertMany(data)
    //   .then(recipe => console.log(recipe.title))
    //   .catch(error => console.log(error))
    // Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, { duration: 100}, { new: true })
    //   .then(()=> console.log('Updated'))
    //   .catch(error => console.log(error))
    // Recipe.deleteOne({ title: 'Carrot Cake'})
    //   .then(()=> console.log('Deleted'))
    //   .catch(error => console.log(error))
    // mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
