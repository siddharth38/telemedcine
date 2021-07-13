# This script reads the sourceFile, finds references to a language code, and adds translation to the targetFile.
import os

sourceFile = os.path.normpath('./questions.js')
targetFile = os.path.normpath('./questions translated.js')

import sys
if len(sys.argv) < 3:
    print('Usage: translator <source lang code> <target lang code> [<sourceFile> <targetFile>]\n')
    sys.exit()

sourceLang = sys.argv[1]
targetLang = sys.argv[2]

if len(sys.argv) == 5:
    sourceFile = sys.argv[3]
    targetFile = sys.argv[4]

from deep_translator import GoogleTranslator
translator = GoogleTranslator(source=sourceLang, target=targetLang)

with open(sourceFile, 'r', encoding = 'utf8') as inFile, \
        open(targetFile, 'w', encoding = 'utf8') as outFile:
    lines = inFile.readlines()
    print('Translating ' + sourceFile + ' to ' + targetFile + '...')
    lineCount = 0;
    for line in lines:
        lineCount += 1
        if '\"' + sourceLang + '\":' in line:
            translation = line.split(': \"')[1].split('\"')[0]
            try:
                translation = translator.translate(translation)
            except Exception as e:
                print('Skipping line ' + str(lineCount))
                print(e.message)
            if '\'' in translation:
                translation = translation.replace('\'', '\\\'')
            translation = line.split('\"' + sourceLang + '\":')[0] \
                + '\"' + targetLang + '": \"' + translation + '\",\n'
            outFile.write(translation)

        outFile.write(line)
        progress = (lineCount * 100) // len(lines)
        if lineCount % 500 == 0:
            print(str(progress) + '% translated...')
    print('Complete')
