const fs = require('fs');
const filePath = 'd:\\\\Web\\\\YTWeb\\\\src\\\\components\\\\seo\\\\AnswerBoxes.tsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/ itemScope itemType="https:\/\/schema\.org\/(Question|Answer|HowTo|HowToStep|DefinedTerm)"/g, '');
content = content.replace(/ itemScope/g, '');
content = content.replace(/ itemProp="[a-zA-Z]+"/g, '');

fs.writeFileSync(filePath, content);
console.log('Successfully removed Microdata from AnswerBoxes.tsx');
