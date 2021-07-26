import axios from 'axios';

const commands = {
  records: {},
  // Enter commands here
  selfevaluation: function(answers, question, setQuestion, optionsSelected) {
    const { paramsFrom, branches } = question;
    let Sensation = answers[paramsFrom.Sensation];
	let Eye_Control = answers[paramsFrom.Eye_Control];
	let Palette1 = answers[paramsFrom.Palette1];
	let Palette2 = answers[paramsFrom.Palette2];
    if (Sensation === 1 || Eye_Control === 1 || Palette1 === 0 || Palette2 === 0 ) {
      setQuestion(branches.Redirecting_for_consultation);
    }
	else {
        setQuestion(branches.doing_fine);
      }
    },

   firstassessement: function(answers, question, setQuestion, optionsSelected) {
    const { paramsFrom, branches } = question;
    let symptoms = answers[paramsFrom.symptoms];
    if (optionsSelected) {
      if (optionsSelected[0] && (optionsSelected[1] || optionsSelected[2] || optionsSelected[3] || optionsSelected[6])) {
	  	setQuestion(branches.for_covid19);
	  } else if (optionsSelected[0] && (optionsSelected[4] || optionsSelected[5])) {
		  setQuestion(branches.for_mucormycosis);
      } else if (optionsSelected[4] || optionsSelected[5]) {
		  setQuestion(branches.for_mucormycosis);
      } else {
          setQuestion(branches.still_not_confirmed);
      }
    } else {
     	setQuestion(branches.still_not_confirmed);
    }
  },
   secondassessement: function(answers, question, setQuestion, optionsSelected) {
    const { paramsFrom, branches } = question;
    let symptoms = answers[paramsFrom.symptoms];
    if (optionsSelected) {
      if (optionsSelected[0]) {
        // Diabetes and Hypertension selected
        if (optionsSelected[1] || optionsSelected[2] || optionsSelected[4]) {
		setQuestion(branches.for_mucormycosis);
		}
		else if (optionsSelected[3]) {
		setQuestion(branches.for_covid19);
      } else {
        setQuestion(branches.still_not_confirmed);
      }
    }
	else if (optionsSelected[1] || optionsSelected[2] || optionsSelected[4]) {
		setQuestion(branches.for_mucormycosis);
	}
	else {
      setQuestion(branches.still_not_confirmed);
    }
}
  else {
      setQuestion(branches.still_not_confirmed);
	}
   }
}

function compareOptions(a, b) {
  return a.statement > b.statement ? 1 : -1;
}

export { commands };
