import mongoose from 'mongoose';
import createDebug from 'debug';

const debug = createDebug('db');

export default (MONGO_URI) => {
  const db = mongoose.connection;

  // https://stackoverflow.com/a/51918795/4426149
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  mongoose.Promise = global.Promise;
  mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true }
  );

  db.on('error', (err) => {
    debug(`🚩 Error while connecting to DB: ${err.message}`);
  });

  db.on('disconnected', () => {
    debug(`🚩 mongodb disconnected`);
    debug(`🚩 Reconnecting...`);
    mongoose.connect(
      MONGO_URI,
      { useNewUrlParser: true }
    );
  });

  db.once('open', () => {
    debug('🔗 mongodb connected successfully!');
  });
};
