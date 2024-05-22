import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

//Main function to start the application
async function main(): Promise<void> {
  try {
    // connect to the database
    await mongoose.connect(config.db_url as string);

    // start the express server
    app.listen(process.env.PORT || config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    // log any errors that occur during startup
    console.log(err);
  }
}

// call the main function to start the application
main();
