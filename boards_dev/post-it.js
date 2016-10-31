var colors_1    = ["#008080", "#088da5", "#0099cc", "#20b2aa"];
var colors_2    = ["#6b6e92", "#7a7c6c", "#353749", "#2c136b"];
var post_its = [];
var boards   = [];
var menu_count  = 1;
var board_num = 0;
var i = 0;
//<div class='Board_close'><a onclick='Close(this)' data-board='"+ this.b_id +"' >X</a>
//<div id='#clear'></div>

$(function() {
  // Esta es la función que correrá cuando este listo el DOM 
  //new Board('#board');
  menu_control();

});


//**********CLASE TABLERO********************
var Board = function( selector, name ) {
      console.log("*** Se creo un tablero ****");
  board_num++;

  this.body_id      = "BB" + board_num;
  this.header_id    = "BH" + board_num;
  this.b_name       = new String(name);
  this.color_header = colors_2[Math.floor((Math.random() * 4))]
  this.color_body   = colors_1[Math.floor((Math.random() * 4))]
  this.b_id         = '#'+ name;
  this.b_body       = "<div id='"+ this.b_name +"' class='board'><div class='board_header' id='"+ this.header_id +"'><p>.::|  "+ this.b_name +"  |::.</p></div><div class='board_body' id='"+ this.body_id +"'></div></div>";
      console.log(name);
      console.log(this.body_id);
      console.log(this.header_id);
      console.log(this.b_name);
      console.log(this.color_header);
      console.log(this.color_body);
      console.log(this.b_id);
      console.log(this.b_body);

  //var i = 0;
  //var $board_body;
  var $document_body= $( selector );
  var $board        = $(this.b_id);


  function initialize(id_board, name, color_header, color_body, b_body, header_id, body_id) {
    hideBoards();
    console.log("initialize");

    $document_body.append(b_body);
    //$board = $('#'+ name);
    //$board.append("<div class=\"board_header\" id='BoardH"+ board_num +"'><p>.::|  "+ name +"  |::.</p></div>");
    console.log(board);

    $("#"+ header_id).css("background-color", color_header);
    navChangeColor(color_header, color_body);
    //$board.append("<div class=\"board_body\"  id=\""+ id_board +"\"></div>");
        //$board_body = $('#'+ id_board);
        //console.log($board_body);
    $("#"+ body_id).css("background-color", color_body);
    $("#"+ name).show();
    //   $board.insertAfter("#board .board:last");

    $("#"+ body_id).dblclick(function(event) {
      event.preventDefault();
      console.log(".::$board_body.dblclick::.");
      //var offset = $(this).offset();
      console.log("pageX: " + event.pageX);
      console.log("pageY: " + event.pageY);
      var x;
      if(menu_count == 1){
        //El menú está desplegado
        x = event.pageX - 150;
      } else { x = event.pageX - 40;}
      
      var empty_place = postItExist(x, event.pageY, id_board);

      if (empty_place == true) {
        removeMasterId(id_board);
        post_its.push( new PostIt(i, x, event.pageY, name) );
        console.log(".::post_its[index_numbers]::.");
        var k = post_its.findIndexPostItByData(name + ".p" + i);
        console.log(post_its[k]);
        $(this).append(post_its[k].p_body);
        doItDraggable(id_board);
        i++;
        postItClick(id_board);
      } else {
        alert("LUGAR OCUPADO");
      }

    });//$board_body.dblclick(function(e)

  };//function initialize()

  initialize(this.b_id, this.b_name, this.color_header, this.color_body, this.b_body, this.header_id, this.body_id);
};//end Class Board




//**********CLASE PostIt********************
var PostIt = function(num, posX, posY, board_name) {
  // Aquí va el código relacionado con un post-it
  this.num = num;
  this.positionX = new Number(posX);
  this.positionY = new Number(posY);
  this.board_name= board_name;
  this.board = "#"+ board_name;
  this.postItid = this.board_name+".p"+this.num;
  this.p_body = "<div id='Master' class='post-it' data-post_it='"+ this.postItid +"' style='left: "+ this.positionX +"px; top: "+ this.positionY +"px;'><div class='header'><div class='close'><a onclick='functionClose(this)'>X</a></div></div><div class='content' contentEditable='true'>...Elemento "+ this.num +"...id: "+ this.postItid +"</div></div>" 
  console.log("*Se creo un post-it*");
};



function removeMasterId(id_board){
  $(".post-it").each(function() {
        console.log(this.getAttribute('data-post_it'));
    var d = this.getAttribute('data-post_it');
        console.log(d.split("."));
    var b = d.split(".");
        console.log(jQuery.type(b));
        console.log(b);
    var i = post_its.findIndexPostItByData(d);
    if(post_its[i].board_name == b[0]){
      this.removeAttribute('id');
    }

    //this.removeAttribute('id');
  });
}

function addMasterId(id_board, id_postIt){
  var j = [];
  $(".post-it").each(function() {
    var d = this.getAttribute('data-post_it');
    var b = d.split(".");
    var i = post_its.findIndexPostItByData(d);
    if(post_its[i].board_name == b[0]){
      j.push(i);
    }
    //this.removeAttribute('id');
  });
  
  for(l = 0; l < j.length; l++){
    for(k = 0; k < post_its.length; k++){
      if(k == j[l]){
        if(post_its[j[l]].postItid == id_postIt){
          $(post_its[j[l]]).attr('id', 'Master');
          $(post_its[j[l]]).insertAfter(id_board +" .post-it:last");
        }
      }
    }
  }
  // this.setAttribute('id', 'Master');
  // $(this).insertAfter(id_board +" .post-it:last");
}



function functionClose(e){
  var obj   = e;
  var parent = obj.parentElement.parentElement.parentElement;
  var post_it = $(parent);
  console.log(obj);
  console.log(":::: post_it = $(parent) :::::");
  console.log(post_it.data('post_it'));
  var i = post_it.data('post_it');
  console.log(".:: findPostItIndexByData ::.");
  console.log(post_its.findIndexPostItByData(i));
  var index = post_its.findIndexPostItByData(i);
  post_its.splice(index, 1);//At position index, remove 1 item
  post_it.remove();
  for(var n = 0; n < post_its.length ; n++){
    console.log(n);
    console.log("Index: " + n + "postIt: " + post_its[n].postItid);
  }
}




function doItDraggable(id_board){
  $board_body = $(id_board);
  $board_body.find(".post-it").draggable({ cancel: "div.content" });//disabled: false
  $board_body.droppable({ drop:eventoDrop });
  function eventoDrop(event, elemento){
    event.preventDefault();
    console.log(".::EventoDrop::.");
    console.log(event);
    var obj       = elemento.draggable;
    var id_postIt = obj.data('post_it');
    var $post_it  = $(id_board +" [data-post_it='" + id_postIt + "']");
    //$post_it.insertAfter(id_board +" .post-it:last");
    removeMasterId(id_board);
    addMasterId(id_board, id_postIt);
    //$post_it[0].setAttribute("id", "Master");
  
    console.log("--postItpositionDROP--");
    var posX = $post_it.position().left,posY = $post_it.position().top;
    console.log("posX : "+posX);
    console.log("posY : "+posY);
    
    var k = post_its.findIndexPostItByData(id_postIt);     
    post_its[k].positionX = posX;
    post_its[k].positionY = posY;


    //$post_it.draggable({ disabled: true });
  }//function eventoDrop
}//end function doItDraggable




function postItClick(id_board){
  $(".post-it").click(function(event){
    event.preventDefault();
    
    var id_postIt = this.getAttribute("data-post_it");

    console.log(".::postItClick::.");
    console.log(event);
    console.log("--postItposition()--");
    console.log(post_its[id_postIt]);
    console.log(id_postIt);

    //$(this).insertAfter(id_board +" .post-it:last");
    var element = this;
    var childrens = element.children;
    removeMasterId(id_board);
    addMasterId(id_board, id_postIt);
    //element.setAttribute("id", "Master");
    // $(this).removeClass("ui-draggable");
    // childrens[1].contentEditable = 'true';
  });//$(".post-it").click
}






function postItExist(posX, posY, board_id){
  var i = 0;
  var postIts_index = [];
  var index;

  if (post_its.length != 0){
    for( j = 0; j < post_its.length; j++){
      console.log(post_its[j]);
      if(post_its[j].board == board_id){
        postIts_index.push(j);
      }
    }
  }

  if (postIts_index.length != 0){
    for( j = 0; j < postIts_index.length; j++){
      index = postIts_index[j];
      console.log(".:: post_it "+j+" ::.");
      var x = post_its[index].positionX;
      var y = post_its[index].positionY;
      console.log("X:" + x);
      console.log("Y:" + y);
      console.log(".:: Perimetro PostIt ::.");
      var px = post_its[index].positionX + 160;
      var py = post_its[index].positionY + 109;
      console.log("PX:" + px);
      console.log("PY:" + py);
      console.log(".:: CLICK ::.");
      console.log(posX + " , " + posY);
      if((posX >= x && posX <= px) && (posY >= y && posY <= py)){
        console.log("OCUPADO!!!!");
        i++;
      }else{ 
        console.log("LIBRE :D");
      }
    }
    if (i != 0){ return false}
    else{ return true}
  } else {
    return true;
  }
}




Array.prototype.findIndexPostItByData || (Array.prototype.findIndexPostItByData = function(d, e) {
    var a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var c = Object(this),
        b = c.length >>> 0;
    if (0 === b) return -1;
    a = +e || 0;
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b) return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
        if (a in c && c[a].postItid === d) return a;
        a++
    }
    return -1
});




//+++++++
function menu_show(){
  $("nav").animate({ "width": "150px" }, "slow" );
  $("#div_toggle").toggle( "slow" );
  $("#icon").empty().append("<img class=\"btn_hide\" src=\"x-btn.png\" width=\"20\" height=\"20\">");
  $("nav").find("#icon img").removeClass("btn_show");
  $("#board").animate({ "margin-left": "150px" }, "slow" );
}

function menu_hide(){
  $("#div_toggle").toggle( "slow" );
  $("nav").animate({ "width": "40px" }, "slow" );
  $("#icon").empty().append("<img class=\"btn_show\"src=\"60310.png\" width=\"30\" height=\"30\">").css("visibility", "visible");
  $("nav").find("#icon img").removeClass("btn_hide");
  $("#board").animate({ "margin-left": "40px" }, "slow" );
}

function menu_control(){
  $("nav li:first").click(function(){
    if (menu_count == 1){
     menu_hide();
     menu_count = 0; 
    }
    else{
      menu_show();
      menu_count = 1;
    }
  });
}

function newBoard(){
  //new Board('#board');
  var name_board = prompt("¿Cuál es el título del tablero?", "Ingresa un título");
  boards.push( new Board('#board', name_board) );
  $("#div_toggle ul").append("<li class='tableros'><a href=\"#\" onclick=\"showBoard(this);\" data-board=\""+ name_board +"\">"+ name_board +"</a></li><hr>");
}

function navChangeColor(color1, color2){
  $("nav").css("background-color", color1);
}



function showBoard(e){
  var obj   = e;
  hideBoards();
  var board_name = obj.getAttribute("data-board");
  var index      = boards.findIndexBoardByName(board_name);
  console.log("showBoards");
  var board = boards[index].b_id;
  $(board).show();
  navChangeColor(boards[index].color_header);
  //$(this).insertAfter("#board .board:last");  
  
}

function hideBoards(){
  console.log("hideBoards");
  for(i = 0; i < boards.length ; i++){
    console.log("hideBoards");
    var board = boards[i].b_id;
    $(board).hide();
  }
}

function Close(e){

}



Array.prototype.findIndexBoardByName || (Array.prototype.findIndexBoardByName = function(d,e) {
    var a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var c = Object(this),
        b = c.length >>> 0;
    if (0 === b) return -1;
    a = +e || 0;
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b) return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
        if (a in c && c[a].b_name == d) return a;
        a++
    }
    return -1
});