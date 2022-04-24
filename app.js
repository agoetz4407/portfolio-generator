const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template.js');

const promptUser = () => {
    return inquirer.prompt([
      {
          type:'input',
          name: 'name',
          message: 'What is your name? (required)',
          validate: input => {
              if (input) {
                  return true
              } else {
                  console.log('Please enter your name')
                  return false
              }
          }
      },
      {
          type:'input',
          name: 'github',
          message: 'Enter your Github username (required):',
          validate: input => {
            if (input) {
                return true
            } else {
                console.log('Please enter your Github username')
                return false
            }
        }
      },
      {
          type: 'confirm',
          name: 'confirmAbout',
          message: `Would you like to enter some information for an "About me" section?`,
          default: false
      },
      {
          type:'input',
          name: 'about',
          message: `Provide some info about yourself for the "About me" section:`,
          when: ({confirmAbout}) => {
              if (confirmAbout) {
                  return true
              } else {
                  return false
              }
          }
      }
    ])
}

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = []
    };
    console.log(
`=================
Add A New Project
=================`)
    return inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is the name of the project (required)?',
            validate: input => {
                if (input) {
                    return true
                } else {
                    console.log('Please enter the project name')
                    return false
                }
            }
        },
        {
            type:'input',
            name: 'description',
            message: 'Provide a description of the project (required):',
            validate: input => {
                if (input) {
                    return true
                } else {
                    console.log('Please enter a description for the project')
                    return false
                }
            }
        },
        {
            type:'checkbox',
            name: 'tools',
            message: 'What did you use to build the project? (Check all that apply)',
            choices: ['HTML', 'CSS', 'Javascript/ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type:'input',
            name: 'link',
            message: 'Enter the Github URL link to the project (required):',
            validate: input => {
                if (input) {
                    return true
                } else {
                    console.log('Please enter the Github URL for your project')
                    return false
                }
            }
        },
        {
            type:'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type:'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        },
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData)
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData)
        } else {
            return portfolioData;
        }
    })
}

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);

        fs.writeFile('index.html', pageHTML, err => {
        if (err) throw new Error(err);

        console.log('Portfolio complete! Check index.html for the output.')
        })
    })

// const mockData = {
//     name: 'Lernantino',
//     github: 'lernantino',
//     confirmAbout: true,
//     about:
//       'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
//     projects: [
//       {
//         name: 'Run Buddy',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         tools: ['HTML', 'CSS'],
//         link: 'https://github.com/lernantino/run-buddy',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'Taskinator',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         tools: ['JavaScript', 'HTML', 'CSS'],
//         link: 'https://github.com/lernantino/taskinator',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'Taskmaster Pro',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         tools: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//         link: 'https://github.com/lernantino/taskmaster-pro',
//         feature: false,
//         confirmAddProject: true
//       },
//       {
//         name: 'Robot Gladiators',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//         tools: ['JavaScript'],
//         link: 'https://github.com/lernantino/robot-gladiators',
//         feature: false,
//         confirmAddProject: false
//       }
//     ]
//   };

// const pageHTML = generatePage(mockData)