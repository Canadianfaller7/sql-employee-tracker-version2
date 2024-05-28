const inquirer = require('inquirer');
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  // addEmployee,
} = require('../db/queries');

const dbConnection = require('../config/connection');

// const newRole = () => {
//   inquirer
//     .prompt([
//       {
//         type: 'input',
//         name: 'roleTitle',
//         message: 'What is the title of the role you would like to add?',
//       },
//       {
//         type: 'input',
//         name: 'roleSalary',
//         message: 'What is the salary of the role you would like to add?',
//       },
//     ])
//     .then((roleAnswers) => {
//       let newRole = roleAnswers.roleTitle;
//       let newSalary = roleAnswers.roleSalary;
//       dbConnection.query('SELECT id AS value, name AS name FROM departments', (err, res) => {
//         if (err) throw new Error(err.message);
//         let departmentArr = [];

//         res.forEach((department) => {
//           const departmentName = {
//             name: department.name,
//             value: department.value,
//           };
//           departmentArr.push(departmentName);
//         });
//         inquirer
//           .prompt([
//             {
//               type: 'list',
//               name: 'departmentName',
//               message: 'Which department does this role belong to?',
//               choices: departmentArr,
//             },
//           ])
//           .then((answers) => {
//             let roleDepartment = answers.departmentName;
//             addRole(newRole, newSalary, roleDepartment);
//             promptQuestions();
//           });
//       });
//     });
// }

const promptQuestions = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'userChoice',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          // 'Add an employee',
          // 'Update employee role',
          'Quit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.userChoice) {
        case 'Quit':
          console.log('Goodbye.');
          process.exit();
        case 'View all departments':
          viewAllDepartments();
          promptQuestions();
          break;
        case 'View all roles':
          viewAllRoles();
          promptQuestions();
          break;
        case 'View all employees':
          viewAllEmployees();
          promptQuestions();
          break;
        case 'Add a department':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department you would like to add?',
              },
            ])
            .then((answers) => {
              addDepartment(answers.departmentName);
              promptQuestions();
            });
          break;
        case 'Add a role':
          // newRole();
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'roleTitle',
                  message: 'What is the title of the role you would like to add?',
                },
                {
                  type: 'input',
                  name: 'roleSalary',
                  message: 'What is the salary of the role you would like to add?',
                },
              ])
              .then((roleAnswers) => {
                let newRole = roleAnswers.roleTitle;
                let newSalary = roleAnswers.roleSalary;
                dbConnection.query(
                  'SELECT id AS value, name AS name FROM departments',
                  (err, res) => {
                    if (err) throw new Error(err.message);
                    let departmentArr = [];

                    res.forEach((department) => {
                      const departmentName = {
                        name: department.name,
                        value: department.value,
                      };
                      departmentArr.push(departmentName);
                    });
                    inquirer
                      .prompt([
                        {
                          type: 'list',
                          name: 'departmentName',
                          message: 'Which department does this role belong to?',
                          choices: departmentArr,
                        },
                      ])
                      .then((answers) => {
                        let roleDepartment = answers.departmentName;
                        addRole(newRole, newSalary, roleDepartment);
                        promptQuestions();
                      });
                  }
                );
              });
          break;
        // case 'Add an employee':
        //   console.log('Add an employee');
        //   break;
        // case 'Update employee role':
        //   console.log('Update employee role');
        //   break;
        // case 'Quit':
        //   console.log('Quit');
        //   break;
        default:
          console.log('Invalid choice');
          break;
      }
    });
};

module.exports = { promptQuestions };
