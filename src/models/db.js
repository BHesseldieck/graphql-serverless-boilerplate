import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
let isConnected;

export const connectToDB = (uri) => {
  const connectionURI = !uri ? process.env.mongoUri : uri;

  if (isConnected) {
    console.log('=> using EXISTING database connection:');
    return Promise.resolve();
  }

  console.log('=> using NEW database connection:');
  return mongoose.connect(connectionURI)
    .then((db) => {
      isConnected = db.connections[0].readyState;
      console.log('=> CONNECTED to MONGO!!!!, isConnected:', isConnected);

      // Log all the Queries
      mongoose.set('debug', process.env.environment === 'development' || 'dev' || 'local');
    });
};

export const closeConnectionToDB = () => {
  if (mongoose.connection.readyState === 1) {
    console.log('=> MONGO connection is successfully closed.');
    return mongoose.connection.close();
  }
  return console.log('=> MONGO cannot be closed.');
};
