$.getJSON("text2emoji.json", (data) => {
    // JSONデータを受信した後に実行する処理
    console.log(data);
   });


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