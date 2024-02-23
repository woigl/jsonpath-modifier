const { modify } = require('../src');

test('Build from Empty Object', () => {
    const cmpObj = { name: 'John Doe', age: 30, isMarried: true, childrens: [{ name: 'Bobby' }, { name: 'Gabby' }] };

    let obj = {};

    obj = modify(obj, '$.name', 'John Doe');
    obj = modify(obj, '$.age', 30);
    obj = modify(obj, '$.isMarried', true);
    obj = modify(obj, '$.childrens[0].name', 'Bobby');
    obj = modify(obj, '$.childrens[1].name', 'Gabby');

    console.warn(obj);

    expect(obj).toEqual(cmpObj);
});
