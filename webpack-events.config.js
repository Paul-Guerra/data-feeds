const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './dist/workers/event-scheduler.worker.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'event-scheduler.worker.bundle.js'
  }
};
