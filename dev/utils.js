const del =  require('del');
const execSync = require('child_process').execSync;

const myExecSync = (command) => {
  execSync(command,
    {
      stdio: 'inherit',
    });
};

const removeDistFiles = () => {
  del.sync(['dist/**', '!dist']);
};

const removeDistJS = () => {
  del.sync(['dist/assets/*.js', '!dist', '!dist/assets']);
};

module.exports = {
  myExecSync,
  removeDistFiles,
};
