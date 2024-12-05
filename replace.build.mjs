import { replaceInFileSync } from 'replace-in-file'
import fs from 'fs';
const readPackageJson = async () => {
  let data = fs.readFileSync('./package.json', 'utf8');
  let packageJson = JSON.parse(data);
  return packageJson.version;
};

const dateDifference = function (Date1, Date2) { // date object 日期格式
  let milliseconds_Time = Date2.getTime() - Date1.getTime();
  return Math.floor(milliseconds_Time / (1000 * 3600 * 24));
};

const version = await readPackageJson();
const now = new Date();
const days = dateDifference(new Date(Date.UTC(2000)), now);
const seconds = Math.floor((now - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 1000);

// var buildVersion = new Date().toISOString();

const options = {
  files: 'src/environments/environment.ts',
  from: /version: '(.*)'/g,
  to: "version: '" + version + "." + days + "." + seconds + "'",
  allowEmptyPaths: false
};

try {
  const results = replaceInFileSync(options)
  console.log('Replacement results:', results)
}
catch (error) {
  console.error('Error occurred:', error);
}

// npm install replace-in-file --save-dev
// ng g environments
