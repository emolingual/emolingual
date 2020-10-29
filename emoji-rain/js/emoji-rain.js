
let emoji;
let api;

// let list = ["あいうえお", "あかさたな"];
let word2emoji = {};
let word_list = [];
let word_list_focus = [];
let emoji_list = []; // emojiクラスのインスタンスを入れる配列

let timeInterval = 1000; // テキストエリアの内容取得のタイムインターバル

//apiのURL
var url = 'https://piez406ba1.execute-api.us-east-2.amazonaws.com/v1?text=%E5%90%BE%E8%BC%A9%E3%81%AF%E7%8C%AB%E3%81%A7%E3%81%82%E3%82%8B';

function setup(){
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
    window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });

    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-1');//canvasを後ろに移動する

    frameRate(60);
    emoji = new Emoji();
    api = new Api();


    //5sごとに打たれた文章を回収する
    setInterval(api.getFile, timeInterval);
}

function draw(){
    background(250);
    emoji.display();
}

function keyPressed(){
    emoji.size += 10;
}

//CSVファイルを読み込む関数getCSV()の定義
function getWord2Emoji(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "data/word2emoji.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行

    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function() {
    	convertCSVtoDic(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
    return;
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoDic(str){ // 読み込んだCSVデータが文字列として渡される
    let result = []; // 最終的な二次元配列を入れるための配列
    let tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(let i=0;i<tmp.length-1;i++) {
        result[i] = tmp[i].split(',');
        let dic_list = [];
        let word = result[i][0];
        word_list.push(word);
        for (let j=1; j<result[i].length; j++) {
          dic_list.push(result[i][j]);
        }
        word2emoji[word] = dic_list;
        // print(word2emoji);
    }
    // console.log(word2emoji['time']);
    return
}

// mouse Interaction
function mousePressed() {
    //check if mouse is over the ellipse
    //絵文字の左上隅とマウス位置との距離
    emoji.offset.x = emoji.pos.x - mouseX;
    emoji.offset.y = emoji.pos.y - mouseY;
    //絵文字をクリック
    if(dist(emoji.pos.x-emoji.size/2, emoji.pos.y-emoji.size/2, mouseX, mouseY) < emoji.size){
      emoji.dragging = true;
    }
  }

  function mouseReleased(){
    emoji.dragging = false;
  }








// -------------------------------------
// -------------------------------------
// --------- emoji class :) ------------
// -------------------------------------
// -------------------------------------

class Emoji{
    constructor(){
        //初期設定
        //emoji-座標系
        this.pos= createVector(width/2, height/2);
        this.velocity = createVector(0,0);
        this.offset = createVector(0,0);
        this.offset = createVector(0,0);

        //emoji-size
        this.size = 100;

        //emoji選択
        this.selectemoji="";
        this.emojiCode=128512;

        //boolean
        this.dragging=false;

    }

    display(){
        this.update();
        this.select();

        textSize(this.size);
        text(this.selectemoji, this.pos.x, this.pos.y);

    }

    //基本的な動き
    update(){
        //降ってくる動き
        this.velocity.y = float(random(1,3));
        this.pos.y += this.velocity.y;

        //mouse
        if(this.dragging){
            this.pos.x = mouseX + this.offset.x;
            this.pos.y = mouseY + this.offset.y;
        }

        if(this.pos.y > height){
            this.pos.y = 0;
        }
    }

    //----------------------------
    //絵文字コードをテキストにするところ
    //----------------------------
    change_num(){
        //16進数を10進数にする
        this.emojiCode=parseInt(emojiCode,16);
    }

    select(){
        // emojiCode=str(128512);
        this.selectemoji = String.fromCodePoint(this.emojiCode);
    }
}
