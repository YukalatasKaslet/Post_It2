///:::::::::::: Sin refactorizar ::::::::::::::::::::::::

var post_its = [];

var Board = function( selector ) {
  // Aqui deberá ir el código que tenga que ver con tu tablero 
  
  // Utiliza esta sintaxis para referirte al selector que representa al tablero.
  // De esta manera no dependerás tanto de tu HTML.  
  var $body = $( selector );
  var colors_1 = ["#008080", "#088da5", "#0099cc", "#20b2aa"];
  var colors_2 = ["#6b6e92", "#7a7c6c", "#353749", "#2c136b"];
  var i = 0;
  var $board_body;

  function initialize() {
    // Que debe de pasar cuando se crea un nuevo tablero?
    //Math.floor((Math.random() * 5));
    $body.append("<div data-board=\"header\" class=\"board_header\"></div>");
    $body.find(".board_header").css({
      "background-color": colors_2[Math.floor((Math.random() * 4))],
      "width"         : "100%",
      "padding-top"   : "30px",
      "padding-bottom": "30px",
      "text-aling"    : "center",
      "margin"        : "0"
    });
    //$elem.find(".board_header h1").css({ "color":"white", "margin":"0 auto", "width":"100%"});
    //$body.css("background-color", colors_1[Math.floor((Math.random() * 4))] );
    $body.append("<div data-board=\"body\" id=\"board_body\"></div>");
    $board_body = $('#board_body');
    $board_body.css("background-color", colors_1[Math.floor((Math.random() * 4))]);

    $board_body.dblclick(function(event) {
      event.preventDefault();
      // event.stopPropagation();
      console.log(".::$board_body.dblclick::.");
      var offset = $(this).offset();
      console.log("pageX: " + event.pageX);
      // console.log(event.pageX - offset.left);
      console.log("pageY: " + event.pageY);
      // console.log(event.pageY - offset.top);
      // console.log(event);
      // for(var prop in event){
      //   console.log(prop + " : "+ event[prop]);
      // }
      //alert(e.pageX+ ' , ' + e.pageY);
      
      var empty_place = postItExist(event.pageX, event.pageY);

      if (empty_place == true) {
        removeMasterId();
        post_its[i] = new PostIt(i, event.pageX, event.pageY);
        console.log(".::post_its[i]::.");
        console.log(post_its[i]);
        // for(var prop in post_its[i]){
        //   console.log(prop + " : "+ post_its[i][prop]);
        // }      
        $(this).append(post_its[i].p_body);
        //DEBI USAR $board_body.find(".post-it").draggable({ cancel: "div.content" });//disabled: false
        $(this).find(".post-it").draggable({ disabled: false });
        $(this).droppable({ drop:eventoDrop });
        function eventoDrop(event, elemento){
          event.preventDefault();
          console.log(".::EventoDrop::.");
          console.log(event);
          // for(var prop in event){
          //   console.log(prop + " : "+ event[prop]);
          // }
          //alert("lo soltaste!");
          var obj       = elemento.draggable;
          // var evento    = event;//pilla el evento *o*
          var index     = obj.data('post_it');
          var $post_it  = $("#board_body [data-post_it=" + index + "]");
          //var childrens = obj.children();
          $post_it.insertAfter("#board_body .post-it:last");
          removeMasterId();
          $post_it[0].setAttribute("id", "Master");
  
          console.log("--postItpositionDROP--");
          var posX = $post_it.position().left,posY = $post_it.position().top;
          console.log("posX : "+posX);
          console.log("posY : "+posY);
          
          post_its[index].positionX = posX;
          post_its[index].positionY = posY;
          console.log(post_its[index]);
          // console.log("-offset-");
          // var offset = $post_it.offset();
          // console.log("pageX: " + event.pageX);
          // console.log("pageY: " + event.pageY);
          // console.log(event.pageX - offset.left);
          // console.log(event.pageY - offset.top);
          //   // for(var prop in obj){
          //   //   console.log(prop + " : "+ obj[prop]);
          //   // }  
          // console.log(childrens);
          // childrens[1].contentEditable = 'true';
          //   for(var prop in childrens[1]){
          //     console.log(prop + " : "+ childrens[1][prop]);
          //   } 
          $post_it.draggable({ disabled: true });
        }//function eventoDrop
        i++;
        postItClick();
      } else {
        alert("LUGAR OCUPADO");
      }

    });//$board_body.dblclick(function(e)

  };//function initialize()

  function postItClick(){
    $(".post-it").click(function(event){
      event.preventDefault();
      var index = this.getAttribute("data-post_it");

      console.log(".::postItClick::.");
      console.log(event);
      // for(var prop in event){
      //   console.log(prop + " : "+ event[prop]);
      // }
      console.log("--postItposition()--");
      // var posX = $(this).position().left,posY = $(this).position().top;
      // console.log("posX : "+posX);
      // console.log("posY : "+posY);
      // console.log(this);
      // console.log(post_its[index]);
      // post_its[index].positionX = posX;
      // post_its[index].positionY = posY;
      console.log(post_its[index]);
      // for(var prop in this){
      //   console.log(prop + " : "+ this[prop]);
      // }
      console.log(index);

      $(this).insertAfter("#board_body .post-it:last");
      var element = this;
      var childrens = element.children;
      //console.log(element);
      removeMasterId();
      element.setAttribute("id", "Master");
      // console.log(childrens);
      $(this).removeClass("ui-draggable");
      childrens[1].contentEditable = 'true';
          // for(var prop in childrens[1]){
          //   console.log(prop + " : "+ childrens[1][prop]);
          // }
      // //$(this).find(".content").contentEditable == "true"
    });//$(".post-it").click
  }

  function removeMasterId(){
    $(".post-it").each(function() {
       this.removeAttribute('id');
    });
  }

  // function addListenerMasterA(){
  //   var $master_a = $("#Master a");
  //   $master_a[0].setAttribute("onclick","functionClose(this)");
  // }

  function postItExist(posX, posY){
    var i = 0;
    if (post_its.length != 0){
      for( j = 0; j < post_its.length; j++){
        console.log(".:: post_it "+j+" ::.");
        var x = post_its[j].positionX;
        var y = post_its[j].positionY;
        console.log("X:" + x);
        console.log("Y:" + y);
        console.log(".:: Perimetro PostIt ::.");
        var px = post_its[j].positionX + 160;
        var py = post_its[j].positionY + 109;
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
  initialize();
};//end Class Board

var PostIt = function(num, posX, posY) {
  // Aquí va el código relacionado con un post-it
  this.postItid = num;
  this.positionX = new Number(posX);
  this.positionY = new Number(posY);
  this.p_body = "<div id='Master' class='post-it' data-post_it='"+ this.postItid +"' style='left: "+ this.positionX +"px; top: "+ this.positionY +"px;'><div class='header'><div class='close'><a onclick='functionClose(this)'>X</a></div></div><div class='content' contentEditable='true'>...Elemento "+ this.postItid +"</div></div>" 
  console.log("*Se creo un post-it*");
};

$(function() {
  // Esta es la función que correrá cuando este listo el DOM 
  new Board('#board');
});

function functionClose(e){
  var obj   = e;
  var parent = obj.parentElement.parentElement.parentElement;
  // var parent2 = parent.parentElement;
  // var parent3 = parent2.parentElement;
  var post_it = $(parent);
  //var index = obj.data('post_it_close');
  console.log(obj);
  // //console.log(index);
  // console.log(jQuery.type(obj));
  // console.log(parent);
  // console.log(jQuery.type(parent));
  // console.log(parent2);
  // console.log(jQuery.type(parent2));
  // console.log(parent3);
  // console.log(jQuery.type(parent3));
  console.log(":::: post_it = $(parent) :::::");
  console.log(post_it.data('post_it'));
  var i = post_it.data('post_it');
  // for(var prop in n){
  //   console.log(prop + " : "+ n[prop]);
  // }
  // console.log(":::: parent :::::");
  // for(var prop in parent){
  //   console.log(prop + " : "+ parent[prop]);
  // }
  console.log(".::post_its[i]::.");
  console.log(post_its[i]);
  post_its.splice(i, 1);//At position i, remove 1 item
  post_it.remove();
  // for(var prop in parent){
  //   console.log(prop + " : "+ parent[prop]);
  // }
  //console.log(this);
  //alert("h1");
  //$(this).parent().remove();
}

/*
  //mover ultima imagen al pricipio de las imágenes
  $('.frames li:last').insertBefore('.frames li:first');

  //la primer imagen pasa a ser la última
  $('.frames li:first').insertAfter('.frames li:last');

  //encontrar un elemento según su data
  $("ul").find("[data-slide='" + current + "']");
  $("#board_body").find("[data-post_it='" + 0 + "']");

  //moverlos :D
  $("#board_body [data-post_it=" + 0 + "]").insertAfter("#board_body [data-post_it=" + 4 + "]");
  $("#board_body [data-post_it=" + 1 + "]").insertAfter("#board_body .post-it:last");
*/

Array.prototype.findPostItIndexByData || (Array.prototype.findPostItIndexByData = function(d, e) {
          console.log("::: Ingresó :::");
          console.log("::: recibe d :::");
          console.log(d);
          console.log("::: recibe e :::");
          console.log(e);
    var a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var c = Object(this),
        b = c.length >>> 0;
          console.log("::: var c = Object(this) :::");
          console.log(c);
          console.log("::: b = c.length >>>0 :::");
          console.log(b);
    if (0 === b) return -1;
          console.log("::: a = +e || 0 :::");
    a = +e || 0;
          console.log(a);
          console.log("::: Infinity === Math.abs(a) && (a = 0) :::");
          console.log(Infinity === Math.abs(a) && (a = 0));
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b) return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
          console.log("::: Ciclo raro "+ a +" :::");
          console.log(c[a]);
        if (a in c && c[a].postItid === d) return a;
        a++
    }
    return -1
});
