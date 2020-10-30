//動く絵文字をドラッグする
//絵文字はふるだけ
//emoji-position
let posX=[];
let posY=[];

//emoji-speed
let veloX=[];
let veloY=[];

//emojiのサイズ
let w=0;
// let h=0;

let offsetX = [];
let offsetY = [];

//boolean
let dragging = [];
let drop = [];

//emoji-display
var emojiCode=[];
var emoji=[];
let pre_selectemoji;
let selectemoji;
let emojinum=[];

var num = 30;

//emoji parameter
var val = 0;





function setup() {
  //スマホのドラッグ対策
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');//canvasを後ろに移動する
  frameRate(60);
  setInterval(getFile,5000);

  w = 50;
  h = 50;
  
  for(var i=0;i < num;i++){
  posX[i] = random(width);
  posY[i] = random(height);
  
  veloX[i] = 0;
  veloY[i] = random(0,3);
    
    dragging[i]=false;
    drop[i] = false;
    
  
  // emojinum[i] = "";
  // emojiCode[i]=0;
  }

  
  emojiparameter();
}

function draw() {
  background(220);

  //title
  textSize(20);
  fill(255);
//   text("emoji-drag", 8,35);
// check();
  update();
  // setInterval(log, 3000);

  // setInterval(getFile,3000);

  // 3秒ごとに"test"と表示されます
  // getFile();
  // display();
}


function update(){
    

  //マウスプレスした位置でドラッグしているように見せる

  for(var i=0;i < num;i++){
   
    veloY[i] = float(random(1,3));
       if(posY[i] > height){
      posY[i]=0;
    }
    
    
  posX[i] += veloX[i];
  posY[i] += veloY[i];
    

  if (dragging[i]) {
        posX[i] = mouseX + offsetX[i];
        posY[i] = mouseY + offsetY[i]; 
    }
  if(drop[i]){
    // 　触った絵文字をテキストボックスに追加していく
    var area = document.getElementById("filecontent");
    // var emojitext = String.fromCodePoint(emojiCode[i]);
    //カーソルの位置を基準に前後を分割して、その間に文字列を挿入
    area.value = area.value.substr(0, area.selectionStart)
  + selectemoji
  + area.value.substr(area.selectionStart);
  pre_selectemoji = selectemoji;
  selectemoji = "";
    drop[i] = false;    
  }
    display();
}
}

function mousePressed(){
  // ページのどこかをマウスダウンしたとき呼び出される
  // スプライトの左上隅のxとy値
  for(var i=0;i<num;i++){
    const spUpperLeftX=[];
    const spUpperLeftY=[];
    
    spUpperLeftX[i] = posX[i] - w / 2;
    spUpperLeftY[i] = posY[i] - w / 2;
    drop[i] = false;
    cursor(HAND);
    // マウスカーソルがスプライトの矩形内にあるなら
    if (mouseX > spUpperLeftX[i] && mouseX < spUpperLeftX[i] + w && mouseY > spUpperLeftY[i] && mouseY < spUpperLeftY[i] + w) {
      
        // ドラッグ開始
        dragging[i] = true;
        drop[i] = false;
        // スプライトの左上隅とマウス位置との距離
        offsetX[i] = posX[i] - mouseX;
        offsetY[i] = posY[i] - mouseY;
        // console.log(emojiCode[i])
        // console.log(String.fromCodePoint(emojiCode[i]));
        selectemoji = String.fromCodePoint(emojiCode[i]);
        // print(selectemoji);
        // document.getElementById("filecontent").value = String.fromCodePoint(emojiCode[i]);

      //   //　触った絵文字をテキストボックスに追加していく
      //   var area = document.getElementById("filecontent");
      //   // var emojitext = String.fromCodePoint(emojiCode[i]);
      //   //カーソルの位置を基準に前後を分割して、その間に文字列を挿入
      //   area.value = area.value.substr(0, area.selectionStart)
			// + String.fromCodePoint(emojiCode[i])
			// + area.value.substr(area.selectionStart);
    }
  }
}
// ページのどこかをマウスリリースしたとき呼び出される
function mouseReleased() {
    // ドラッグ終了
    cursor(ARROW);
  for(var i=0;i < num;i++){
    dragging[i] = false;
    drop[i] = true;
  }
}


function display(){
  textSize(w);
  for(var i=0;i < num;i++){
    text(emoji[i], posX[i], posY[i]);
    
  }
}

function keyPressed(){
  // val = Math.random() * 11;　//0~11がでる
  emojiparameter();
  // print("Pressed");
  // getFile();
  
}




function emojiparameter(){
  // val = Math.random() * 11;　//0~11がでる
// print(val);
  for(var i=0;i < num;i++){
  // emojiCode[i] = random(10) > val ? floor(random(128512, 128592)) : floor(random(127744, 128318));
  // emojiCode[i]=emojinum[i];
  // console.log(emojiCode);
  // emojiCode[i] = 0;
  emoji[i] = String.fromCodePoint(emojiCode[i]);
    
  }
}
  
//APIの処理はこちら
// const url = 'https://rck1sqggle.execute-api.us-east-2.amazonaws.com/beta?key=モアイ';
// var url = 'https://rck1sqggle.execute-api.us-east-2.amazonaws.com/beta?key=';
var url = 'https://piez406ba1.execute-api.us-east-2.amazonaws.com/v1?text=%E5%90%BE%E8%BC%A9%E3%81%AF%E7%8C%AB%E3%81%A7%E3%81%82%E3%82%8B';
// var url = 'https://piez406ba1.execute-api.us-east-2.amazonaws.com/v1?text=';


var cnt =0;
var input_message=0;

function getFile($this){
  console.log("5s");
  input_message = document.getElementById("filecontent").value;
  // console.log(input_message);
  getFromApi();
}



function getFromApi() {
  var request = new XMLHttpRequest();
  // url = url + input_message;
  console.log(url);
  request.open('GET', url, true);
  request.onload = function() {
  // レスポンスが返ってきた時の処理
    // console.log(request['response']);
    let responsejson = JSON.parse(request.response);
    
    // console.log(responsejson.body);
    // console.log(responsejson.body.key);//モアイ
    // console.log(responsejson.body[0].unicode);//ユニコード

    // for(var i=0;i <=10;i++){
    //   for(var x=0;x <=10;x++){
      //  console.log(responsejson.body.emojis[i]);
      // this.responsejson.body.emojis[i].unicode.forEach(element => console.log(element));
      // emojinum[i]=responsejson.body.emojis[i].unicode[x];
      // emojinum[i]=emojinum[i].substr(4,8);
      // emojinum[i]=parseInt(emojinum[i],16);　//１６進数→１０進数
      // console.log(emojinum[i]);

      responsejson.body.emojis.forEach((emojilist) => {
        emojilist.forEach((emoji) => {
          // console.log(emoji.key+" "+emoji.unicode);
          // console.log(emojilist.length);
          // emojinum="";
          emoji = emoji.unicode.substr(4,8);
          emoji=parseInt(emoji,16);
          // emojinum.push(emoji);
          emojiCode.push(emoji);
          // console.log(emojinum);
          // emojinum.forEach((emoji) => {
            
          //   emoji = emoji.substr(4,8);
          //   emoji=parseInt(emoji,16);
          //   console.log(emoji);
          // });
          // console.log(emojinum);
          
          // emojinum=emoji.unicode;
          // emojinum[emojilist.length]=emojinum[i].substr(4,8);
          // emojinum[emojilist.length]=parseInt(emojinum[i],16);　//１６進数→１０進数


        });
      });


    //   }
    // }
  }
  request.send();
}
  

