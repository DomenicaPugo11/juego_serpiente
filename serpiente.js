
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;
    const serpiente = [
      {x:15,y:15},
      {x:16,y:15},
      {x:17,y:15},
      {x:17,y:16},
      {x:18,y:16},
    ];


    

    // Primera pintura del juego al cargar la página
    dibujarTodo();


    // =========================
    // FUNCIONES DE DIBUJO
    function dibujarTablero(){
      //ctx.strokeStyle //coloca un color de línea, similar a fillStyle
      //ctx.beginPath()//se invoca siempre para iniciar un trazo
      //ctx.moveTo(20,10)//posición inicial de la figura, colocar cualquier valor
      //ctx.lineTo(15,30)//dibuja una línea desde la ultima posicion del graficador, en este caso lo que puso en moveTo, hasta la posicion querecibe como parámetro, colocar cualquier valor
      //ctx.stroke()//dibuja la línea
      for (let x=0;x<canvas.width;x+=TAMANIO_CELDA){
        ctx.strokeStyle
        ctx.beginPath()
        ctx.moveTo(x,0)
        ctx.lineTo(x,canvas.height)
        ctx.stroke()
      }
      for (let y=0;y<canvas.height;y+=TAMANIO_CELDA){
        ctx.strokeStyle
        ctx.beginPath()
        ctx.moveTo(0,y)
        ctx.lineTo(canvas.width,y)
        ctx.stroke()
      }
    }

    function pintarParte(lineaX, lineaY,color="pink"){
      let x=lineaX*TAMANIO_CELDA
      let y=lineaY*TAMANIO_CELDA
      ctx.fillStyle = color;
      ctx.fillRect(x,y,TAMANIO_CELDA,TAMANIO_CELDA);
      ctx.strokeStyle="black";
      ctx.strokeRect(x,y,TAMANIO_CELDA,TAMANIO_CELDA)
    }

    function pintarSerpiente(){
      let recorre;
      let cabeza;
      for (let i=0;i<serpiente.length;i++){
        recorre=serpiente[i];
        if (i==0){
          pintarParte(recorre.x,recorre.y,color="blue");
        }else{
          pintarParte(recorre.x,recorre.y);
        }
      }
    }
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarSerpiente();
    }



