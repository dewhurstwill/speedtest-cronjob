const monk = require('monk');
const speedtest = require('speedtest-service');

const { 
  configSchema,
  speedtestResultSchema
} = require('./schema');

async function main() {
  try {
    const hasValidConfig = await configSchema.validateAsync(process.env, {
      allowUnknown: true
    });

    if (hasValidConfig) {
      const db = monk(process.env.MONGODB_URI);
      const speedtestResults = db.get(process.env.MONGODB_COLLECTION || 'speedtest_results');
      speedtestResults.createIndex({ resultUrl: 1 }, { unique: true });
      
      const speedtestResult = await speedtest();

      const validated = await speedtestResultSchema.validateAsync(speedtestResult);
      let { resultUrl } = validated;

      const resultExists = await speedtestResults.findOne({ resultUrl });
      if (resultExists) {
        throw new Error(`Result already exists: ${resultUrl}`);
      }

      const created = await speedtestResults.insert({ 
        date: new Date().toISOString().slice(0, 10), 
        ...validated 
      });

      if (created) {
        console.log("Saved");
        process.exit(0);
      }

      console.error('Something went wrong');
      process.exit(1);
    }  
  } catch (error) {
    // Handle error
    if (error.details) {
      console.error("Envronment variable validation failed");
      console.error(error.details.reduce((acc, curr) => `${acc}\n${curr.message}`, ''));
    } else {
      console.error(error);
      process.exit(1);
    }
  }
}

main();