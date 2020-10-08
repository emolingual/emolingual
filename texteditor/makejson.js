let simpleData = {name: 'taro', age: 20};
// JSON 形式への変換
let simpleDataJSON = JSON.stringify(simpleData);
console.log(simpleDataJSON);
// => {"name":"taro","age":20}

// JSON 形式からの復元
let simpleDataParsed = JSON.parse(simpleDataJSON);
console.log(simpleDataParsed);
// => { name: 'taro', age: 20 }
console.log(simpleDataParsed.name);
// => taro
console.log(simpleDataParsed['age']);
// => 20