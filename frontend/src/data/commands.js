import axios from 'axios';

const commands = {
  records: {},
  // Enter commands here
  processMedications: function(answers, question, setQuestion, optionsSelected) {
    const { paramsFrom, branches } = question;
    let medications = answers[paramsFrom.medications].split(", ");
    if (optionsSelected) {
      if (optionsSelected[0] && optionsSelected[1]) {
        // Diabetes and Hypertension selected
        setQuestion(branches.diabetes_hypt);
      } else {
        setQuestion(branches.all_is_well);
      }
    } else {
      console.log("No options list provided");
    }
  },
};

function compareOptions(a, b) {
  return a.statement > b.statement ? 1 : -1;
}

export { commands };
