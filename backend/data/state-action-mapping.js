const stateToNodeMapping = [
  // conversation_sessions_count : count(sessions)
  // ["SPO2_value", ]
  // TODO action-> state
  // TODO probabilities
  // 111.0 Still curious
  // state, positive actions, negative actions, use multiple
  ["cardiac_score", ["90.0 Cardiac education", "102.0 Ischemia", ] ],
  ["angina", ["90.0 Cardiac education", "102.0 Ischemia", "117.0 Info about heart attack", "113.0 CAD"]],
  ["unstable_angina", ["90.0 Cardiac education", "117.0 Info about heart attack"]],
  ["stable_angina", ["90.0 Cardiac education", "102.0 Ischemia", "113.0 CAD"]],
  ["smoker", ["90.0 Cardiac education", "102.0 Ischemia", "113.0 CAD", "181.0 BP atherosclerosis", "223.0 HF intoxicants", "196.3 HF risk factors", "71.0 Cardiac screening"]],
  ["hypertension", ["90.0 Cardiac education", "113.0 CAD"]]
  // ["cardiac_score", [{ topic:"102.0 Ischemia", probability:0.3} ] ],
  // ["angina", [{ topic: "102.0 Ischemia", probability:0.3 }, { topic: "117.0 Info about heart attack", probability: 0.3 }, { topic: "113.0 CAD", probability:0.3 }]],


]

module.exports = { stateToNodeMapping }