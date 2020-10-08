// const url = 'https://randomuser.me/api/';
const url = 'https://rck1sqggle.execute-api.us-east-2.amazonaws.com/beta?key=モアイ';
// const url = 'https://n6y4rlv30a.execute-api.us-east-2.amazonaws.com/default/returnEmoji';




let simpleData = {emoji: '1F5FF', similality: 0.92};
// JSON 形式への変換
let simpleDataJSON = JSON.stringify(simpleData);
// console.log(simpleDataJSON);
// => {"name":"taro","age":20}



// // JSON 形式からの復元
// let simpleDataParsed = JSON.parse(simpleDataJSON);
// console.log(simpleDataParsed.emoji);
// var stringdata = String(simpleDataParsed.emoji);
// var emojinum = parseInt(stringdata, 16);//１６進数→１０進数
// console.log(emojinum);


//getElementById を使う方法の記述例
function getFile($this){
    var input_message = document.getElementById("filecontent").value;
    console.log(input_message);
    
    // JSON 形式からの復元
let simpleDataParsed = JSON.parse(simpleDataJSON);
console.log(simpleDataParsed.emoji);
var stringdata = String(simpleDataParsed.emoji);
var emojinum = parseInt(stringdata, 16);//１６進数→１０進数
for(var i=0;i < 3;i++){
    // emojiCode[1]=emojinum;
}
console.log(emojinum);


}




// URL = "https://rck1sqggle.execute-api.us-east-2.amazonaws.com/beta?key=モアイ";
// $.getJSON("", (data) => {
//     // JSONデータを受信した後に実行する処理
//     console.log(data[0].emoji);
//    });


// URL = "https://n6y4rlv30a.execute-api.us-east-2.amazonaws.com/default/returnEmoji";

// fetch("https://jsondata.okiba.me/v1/json/demo01")
//   .then(response => response.json())
//   .then(data => console.log(data));

// // XMLHttpRequestオブジェクトの作成
// var request = new XMLHttpRequest();

// // URLを開く
// request.open('GET', "https://n6y4rlv30a.execute-api.us-east-2.amazonaws.com/default/returnEmoji", true);
// request.responseType = 'json';

// // レスポンスが返ってきた時の処理を記述 
// request.onload = function () {
//   // レスポンスが返ってきた時の処理
//   var data = this.response;
//   console.log(data);
//   console.log("aiueo");
// }

// // リクエストをURLに送信
// request.send();