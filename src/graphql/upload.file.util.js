/* eslint-disable no-promise-executor-return */
const { createWriteStream } = require('fs');
const { join } = require('path');

const storeUpload = async ({ stream, filename }) => {
  const uploadDir = './storage';
  const path = join(uploadDir, filename);
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ path }))
      .on('error', reject)
  );
};

const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const { path } = await storeUpload({ stream, filename });
  return { filename, mimetype, path };
};

module.exports = processUpload;
