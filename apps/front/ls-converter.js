const fs = require('fs');
const lsInput = require('./src/assets/ls');

function toJson(input) {
  try {
    return JSON.stringify(input);
  } catch (error) {
    throw new Error(error);
  }
}

function createJsons() {
  const ls = { eng: {}, uk: {} };

  for (const key in lsInput) {
    ls.eng[key] = lsInput[key]['eng'];
    ls.uk[key] = lsInput[key]['uk'];
  }

  fs.writeFile('./apps/front/src/assets/i18n/uk.json', toJson(ls.uk), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('CREATED: ua.json');
    }
  });

  fs.writeFile(
    './apps/front/src/assets/i18n/eng.json',
    toJson(ls.eng),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATED: en.json');
      }
    }
  );
}

createJsons();
