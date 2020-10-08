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
  

  w = 50;
  h = 50;
  
  for(var i=0;i < num;i++){
  posX[i] = random(width);
  posY[i] = random(height);
  
  veloX[i] = 0;
  veloY[i] = random(0,3);
    
    dragging[i]=false;
    drop[i] = false;
    
  emojiCode[i]=0;
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
    
    if(posY[i] > height){
      posY[i]=0;
    }
  
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
  // display();
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
    
      // //　触った絵文字をテキストボックスに追加していく
      //   var area = document.getElementById("filecontent");
      //   // var emojitext = String.fromCodePoint(emojiCode[i]);
      //   //カーソルの位置を基準に前後を分割して、その間に文字列を挿入
      //   area.value = area.value.substr(0, area.selectionStart)
			// + String.fromCodePoint(emojiCode[i])
			// + area.value.substr(area.selectionStart);
    
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
  emojiCode[i] = random(10) > val ? floor(random(128512, 128592)) : floor(random(127744, 128318));
  // emojiCode[i]=emojinum;
  emoji[i] = String.fromCodePoint(emojiCode[i]);
    
  }
}
  
  
  
  