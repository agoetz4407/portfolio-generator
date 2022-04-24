const fs = require('fs');
const generatePage = require('./src/page-template.js');

const pageHTML = generatePage(userName, github)

fs.writeFile('index.html', pageHTML, err => {
    if (err) throw err;

    console.log('Portfolio complete! Check index.html for the output.')
})
