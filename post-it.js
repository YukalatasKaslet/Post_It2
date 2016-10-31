var post_its = [];
var i = 0;
var board_num = 0;
var $board_body;


$(function() {
  // Esta es la función que correrá cuando este listo el DOM 
  new Board('#board');
});


//**********CLASE TABLERO********************
var Board = function( selector ) {
  var $body    = $( selector );
  board_num++;
  var colors_1 = ["#008080", "#088da5", "#0099cc", "#20b2aa"];
  var colors_2 = ["#6b6e92", "#7a7c6c", "#353749", "#2c136b"];
  this.board_id = "B" + board_num;
  //var i = 0;
  //var $board_body;

  function initialize(id_board) {
    $body.append("<div data-board=\"header\" class=\"board_header\" id='BoardH"+ board_num +"'></div>");
    $body.find("#BoardH"+ board_num).css({
      "background-color": colors_2[Math.floor((Math.random() * 4))],
      "width"         : "100%",
      "padding-top"   : "30px",
      "padding-bottom": "30px",
      "text-aling"    : "center",
      "margin"        : "0"
    });
    $body.append("<div data-board=\"body\" class=\"board_body\"  id=\""+ id_board +"\"></div>");
    $board_body = $('#'+ id_board);
    console.log($board_body);
    $board_body.css("background-color", colors_1[Math.floor((Math.random() * 4))]);

    $board_body.dblclick(function(event) {
      event.preventDefault();
      console.log(".::$board_body.dblclick::.");
      //var offset = $(this).offset();
      console.log("pageX: " + event.pageX);
      console.log("pageY: " + event.pageY);
      
      var empty_place = postItExist(event.pageX, event.pageY, id_board);

      if (empty_place == true) {
        removeMasterId();
        post_its.push( new PostIt(i, event.pageX, event.pageY, id_board) );
        console.log(".::post_its[index_numbers]::.");
        var k = post_its.findIndexPostItByData(id_board + ".p" + i);
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

  initialize(this.board_id);
};//end Class Board




//**********CLASE PostIt********************
var PostIt = function(num, posX, posY, board_id) {
  // Aquí va el código relacionado con un post-it
  this.num = num;
  this.positionX = new Number(posX);
  this.positionY = new Number(posY);
  this.board = board_id;
  this.postItid = this.board+".p"+this.num;
  this.p_body = "<div id='Master' class='post-it' data-post_it='"+ this.postItid +"' style='left: "+ this.positionX +"px; top: "+ this.positionY +"px;'><div class='header'><div class='close'><a onclick='functionClose(this)'>X</a></div></div><div class='content' contentEditable='true'>...Elemento "+ this.num +"</div></div>" 
  console.log("*Se creo un post-it*");
};



function removeMasterId(){
  $(".post-it").each(function() {
     this.removeAttribute('id');
  });
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
  $board_body = $('#'+ id_board);
  $board_body.find(".post-it").draggable({ cancel: "div.content" });//disabled: false
  $board_body.droppable({ drop:eventoDrop });
  function eventoDrop(event, elemento){
    event.preventDefault();
    console.log(".::EventoDrop::.");
    console.log(event);
    var obj       = elemento.draggable;
    var index     = obj.data('post_it');
    var $post_it  = $("#"+ id_board +" [data-post_it='" + index + "']");
    $post_it.insertAfter("#"+ id_board +" .post-it:last");
    removeMasterId();
    $post_it[0].setAttribute("id", "Master");
  
    console.log("--postItpositionDROP--");
    var posX = $post_it.position().left,posY = $post_it.position().top;
    console.log("posX : "+posX);
    console.log("posY : "+posY);
    
    var k = post_its.findIndexPostItByData(index);     
    post_its[k].positionX = posX;
    post_its[k].positionY = posY;

    console.log(post_its[index]);//esto no sirve

    //$post_it.draggable({ disabled: true });
  }//function eventoDrop
}//end function doItDraggable




function postItClick(id_board){
  $(".post-it").click(function(event){
    event.preventDefault();
    
    var index = this.getAttribute("data-post_it");

    console.log(".::postItClick::.");
    console.log(event);
    console.log("--postItposition()--");
    console.log(post_its[index]);
    console.log(index);

    $(this).insertAfter("#"+ id_board +" .post-it:last");
    var element = this;
    var childrens = element.children;
    removeMasterId();
    element.setAttribute("id", "Master");
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