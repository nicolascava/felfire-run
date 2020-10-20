import Log from './lib/Log';

/**
 * Task run callback
 *
 * @param {*} resolution
 * @param {Date} start
 * @param {Object} task
 * @returns {*}
 */
function taskCallback(resolution, start, task) {
  const end = new Date();
  const time = end.getTime() - start.getTime();

  Log.info(`Finished '${task.name}' after ${time} ms.`);

  return resolution;
}

/**
 * Run a given task when monitoring execution time
 *
 * @param {Function} fn
 * @param {Object} options
 * @returns {Promise}
 */
export default async function (fn, options = {}) {
  const task = typeof fn.default === 'undefined' ? fn : fn.default;
  const start = new Date();

  Log.info(`Starting '${task.name}'...`);

  return task(options)
    .then(resolution => taskCallback(resolution, start, task))
    .catch((error) => {
      Log.error(error);
      process.exit(1);
    });
}
