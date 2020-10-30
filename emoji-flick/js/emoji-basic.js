'use strict';

let emoji_list = [] // emojiクラスのインスタンスを入れる配列
let timeInterval = 5000 // テキストエリアの内容取得のタイムインターバル
let url = 'https://piez406ba1.execute-api.us-east-2.amazonaws.com/v1?text=';

function setup(){
    // window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
    // window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-1'); //canvasを後ろに移動する
    frameRate(60);

    //timeIntervalごとにテキストエリアの内容を確認
    setInterval(getText, timeInterval);
}

function draw(){
    background(250);
    // console.log(emoji_list);
    // console.log("X"+ mouseX + ", Y: " + mouseY);
    emoji_list.forEach((emoji) => {
      // すべてのemojiに対して1フレームごとに実行
      // console.log(emoji.key+":"+emoji.emoji);
      emoji.display();
    });

    setSwipe("#emoji-keyboard");
}

// --------- API :P ------------

let input_message = "";
let ex_input_message = "";

function getText($this){
  // カーソルがある行の文章を取得
  let textarea = document.getElementById("filecontent");
  let index = getCursorPos(textarea.value, textarea.selectionStart);
  let sentences = textarea.value.split("\n");
  let input_message = sentences[index]

  // 中身が更新されていたらAPIを叩く
  if(input_message != ex_input_message){
    getFromApi(input_message);
    ex_input_message = input_message;
  }
}

function getCursorPos(value, pos) {
  let before_text = value.substr(0, pos);
  let index = before_text.split("\n").length - 1;
  return index
}

function getFromApi(message){
    var request = new XMLHttpRequest();
    url = url + message;
    request.open('GET', url, true);

    // レスポンスが返ってきた時の処理
    request.onload = function() {
        let responsejson = JSON.parse(request.response);
        responsejson.body.emojis.forEach((emojis) => {
            emojis.forEach((emoji) => {
                // Emojiクラスを作成
                emoji_list.push(new Emoji(emoji.key, uni2emo(emoji.unicode), emoji.distance))
            });
        });
    }
    request.send();
}

// Unicodeをemojiに変換する関数(入力："-U+1F636"，出力："😶")．サロゲートペア対応
function uni2emo(unicode){
  // HTML Entityに変換する(例：-U+1F636 => &#x1F636;)
  let emoji_html = unicode.replace(/-U\+/g, ";&#x")+";";
  emoji_html = emoji_html.slice(1);
  // html Entityからemojiに変換する(例 &#x1F636; => 😶)
  let emoji = emoji_html.replace(/&#(.*?);/g, (m, p1) => String.fromCodePoint(`0${p1}`));
  return emoji
}

// --------- emoji class :) ------------

class Emoji{
    constructor(key, emoji, distance){
      //初期設定
      this.emoji = emoji; // emojiそのもの
      this.key = key; // emojiに関連づいたキーワード
      this.distance = distance; // emojiとkeyの距離(小さいほど関連が深い)
      this.flag = true; // falseにすると元リストから取り除かれる
      this.size = 100;
      this.pos= createVector(width/2, height/2);

      // console.log(this.emoji+" is associated with "+this.key+"(distance="+distance+")");
      setup();
    }

    setup() {
      // ここにインスタンス作成時に行いたい初期化などの処理を書く
      // コンストラクタはいろんなUIに共通するものだけを書きたいので，
      // UI依存の処理はこっちに書く
      //emoji-座標系
      this.pos = createVector(0,0);
      this.pos.x = Math.random()*500;
      this.pos.y = 0;
      // this.size = 100;
      //emoji選択
      // this.selectemoji=""
      // this.emojiCode=str(128512);
    }

    update(){
      // ここに1フレームごとにemojiオブジェクトに対して行いたい処理を書く
      this.pos.y += 1.0;
    }

    display() {
      this.update();
      textSize(this.size);
      // console.log(this.emoji+" is displayed");
      text(this.emoji, this.pos.x, this.pos.y);
    }

    delete() {
      // 使い終わったemojiを削除する関数
      this.flag = false;
    }
}


// //フリック開始位置の取得
// function touchStart() {
// 	startX = null;
// 	startX = event.pageX;
// }

// //フリック途中位置の取得
// function touchMove() {
// 	endX = null;
// 	endX = event.pageX;
// }

// //フリック終了時の処理
// function touchEnd() {
// 	if(startX != null && endX != null) {
// 		//移動量
// 		var diff = endX - startX;
// 		if(Math.abs(diff) >= 50) {
// 			//フリック後の処理
// 			alert("フリック時の移動量 : " + diff);
// 		}

// 		startX = null;
// 		endX = null;
// 	}
// }




let flag = false;

//swipe-event test
/*
 * スワイプイベント設定
 */
function setSwipe(elem) {
  let t = document.querySelector(elem);
  let startX;        // タッチ開始 x座標
  let startY;        // タッチ開始 y座標
  let moveX;    // スワイプ中の x座標
  let moveY;    // スワイプ中の y座標
  // let dist = 30;    // スワイプを感知する最低距離（ピクセル単位）
  // let dist2 = 100;

  let endX;


  // タッチ開始時： xy座標を取得
      t.addEventListener("touchstart", function(e) {
        e.preventDefault();
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        console.log(startX);
    });


  // スワイプ中： xy座標を取得
  t.addEventListener("touchmove", function(e) {
      e.preventDefault();
      moveX = e.changedTouches[0].pageX;
      moveY = e.changedTouches[0].pageY;
  });

  // タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
  t.addEventListener("touchend", function(e) {
    e.preventDefault();
    endX = e.changedTouches[0].pageX;
    let diff = endX - startX;
    console.log(Math.abs(diff));
    if(startX > endX && Math.abs(diff) >= 800){
      if(mouseReleased){
        console.log("😀");
      }
      // console.log("😀");
    }
    else if(startX > endX && Math.abs(diff) >=400){
      if(mouseReleased){
        console.log("😆");
      }
      // console.log("😆");
    }

    //   if (startX > moveX && startX > moveX + dist && endX< 50) {        // 右から左にスワイプ
    //       // 右から左にスワイプした時の処理
    //       console.log("😀");
    //       // console.log("startX= " + startX + "moveX=" + moveX);
    //   }
    //   else if (startX > moveX && startX > moveX + dist && endX< 100) {        // 右から左にスワイプ
    //     // 右から左にスワイプした時の処理
    //     console.log("😆");
    // }
    //   else if (startX < moveX && startX + dist < moveX) {    // 左から右にスワイプ
    //       // 左から右にスワイプした時の処理
    //       // console.log("😀");
    //       textSize(50);
    //       // text("🥺", width/2,500);
    //       var area = document.getElementById("filecontent");
    //       area.value = area.value.substr(0, area.selectionStart) + "😇" + area.value.substr(area.selectionStart);

    //   }else if(startY > moveY && startY > moveY + dist){
    //     //下から上
    //     console.log("from down to top");
    //   }else if(startY < moveY && startY + dist < moveY){
    //     //上から下
    //     console.log("from top to down");
    //   }
  });
}


// //hammer.js
// var myElement = document.getElementById('emoji-keyboard');
// var mc = new Hammer(myElement);
// mc.on("panleft panright tap press", function(ev) {
//     myElement.textContent = ev.type +" gesture detected.";
// });
