# Columns used in the input file
colID = 'ID'
colStatement = 'Statement question'
colType = 'Type'
colPattern = 'pattern'
colOption = 'Statement answer'
colNext = 'Next question'
colDBValue = 'db value'

# Keys in the output JavaScript
keyLang = 'en'
keyID = 'id'
keyStatement = 'statement'
keyType = 'type'
keyPattern = 'pattern'
keyOptions = 'options'
keyDBValue = 'dbValue'
keyNext = 'nextQuestion'
keyValue = 'value'

import sys
import os

if len(sys.argv) < 2:
    print( 'This script generates a questions.js from a given spreadsheet\n'
    + 'Usage: generateQuestionsJs <input file name> [output file name] \n\n')
    sys.exit()

inputFileName = sys.argv[1]
outFileName = os.path.normpath('./questions.js')
if len(sys.argv) >= 3:
    outFileName = sys.argv[2]
else:
    print('Output file not specified, using ' + outFileName)

import pandas as pd
import numpy as np
import json

inputFile = pd.ExcelFile(inputFileName)
if len(inputFile.sheet_names) > 1:
    print('Multiple sheets found in file-')
    for (i, name) in enumerate(inputFile.sheet_names):
        print(str(i) + ' - ' + name)
    chosenIndex = input('\nChoose one- ')
    data = inputFile.parse(inputFile.sheet_names[int(chosenIndex)], index_col=0)
else:
    data = pd.read_excel(inputFileName, index_col=0)

if not colID in data.columns:
    print('The sheet must have an ' + colID + ' column')
    sys.exit()

def cleanText(text):
    result = text.strip("\' \"")
    return result

questList = []
question = dict()
for i in range(len(data)):
    row = data.iloc[i]
    id = row.get(colID)
    if (pd.isnull(id) or id == data.iloc[i-1].get(colID)):
        # Same question as last row
        existingOptions = question[keyOptions]
        option = {
            keyValue: existingOptions[-1][keyValue] + 1,
            keyStatement: {
                keyLang: cleanText(row.get(colOption))
            },
            keyNext: row.get(colNext),
        }
        dbValue = row.get(colDBValue)
        if not pd.isnull(dbValue):
            option[keyDBValue] = cleanText(dbValue)
        existingOptions.append(option)
    else:
        question = dict()
        questList.append(question)
        question[keyID] = id
        question[keyStatement] = {
            keyLang: cleanText(row.get(colStatement))
        }
        question[keyType] = row.get(colType)
        if question[keyType] in ['tel']:
            question[keyPattern] = row.get(colPattern)

        if question[keyType] in ['button', 'select']:
            option = {
                keyValue: 0,
                keyStatement: {
                    keyLang: cleanText(row.get(colOption))
                },
                keyNext: row.get(colNext),
            }
            dbValue = row.get(colDBValue)
            if not pd.isnull(dbValue):
                option[keyDBValue] = cleanText(dbValue)
            question[keyOptions] = [option]
        else:
            question[keyNext] = row.get(colNext)

outDict = {'questions': questList}
with open(outFileName, 'w', encoding='utf8', errors='ignore') as outFile:
    outFile.write('module.exports = ')
    json.dump(outDict, outFile, ensure_ascii=False, indent=4, sort_keys=True)
print('Complete\n')
