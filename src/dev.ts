// import { modify } from './index.js';

import jsonpathModifier from './index.js';

let obj2 = {};

obj2 = jsonpathModifier.modify(obj2, '$.name', 'John Doe');
obj2 = jsonpathModifier.modify(obj2, '$.age', 43);
obj2 = jsonpathModifier.modify(obj2, '$.spouse.name', 'Jane Doe');
obj2 = jsonpathModifier.modify(obj2, '$.spouse.age', 44);
obj2 = jsonpathModifier.modify(obj2, '$.cars[0]', 'Mercedes Benz');
obj2 = jsonpathModifier.modify(obj2, '$.cars[1]', 'BMW');
obj2 = jsonpathModifier.modify(obj2, '$.cars[dream]', 'Maybach');
obj2 = jsonpathModifier.modify(obj2, '$.cars[+]', 'Porsche');
obj2 = jsonpathModifier.modify(obj2, '$.cars[+15]', 'Toyota');
obj2 = jsonpathModifier.modify(obj2, '$.pets[0].type', 'Dog');
obj2 = jsonpathModifier.modify(obj2, '$.pets[0].legs', 4);
obj2 = jsonpathModifier.modify(obj2, '$.pets[+].type', 'Cat');
obj2 = jsonpathModifier.modify(obj2, '$.pets[1].legs', 2);

console.log('-------------------------------------');

console.dir(obj2);
