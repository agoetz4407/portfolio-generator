const fs = require('fs');
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2, process.argv.length)

const [userName, github] = profileDataArgs


fs.writeFile('index.html', generatePage(userName, github), err => {
    if (err) throw err;

    console.log('Portfolio complete! Check index.html for the output.')
})
