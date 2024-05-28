const {promptQuestions} = require('./prompts/questionPrompts')

const showMainMenu = () => {
  promptQuestions();
}

showMainMenu();