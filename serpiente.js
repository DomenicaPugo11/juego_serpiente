
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

    const serpienteInicial = [
    {x:15,y:15},
    {x:16,y:15},
    {x:17,y:15},
    {x:17,y:16},
    {x:18,y:16}
    ];

    let intervaloSerpiente;
    let direccionActual;
    let numAleatorioVertical;
    let numAleatorioHorizontal;
    let juegoTerminado = false;
    let velocidad = 1000;
    
   

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
    pintarParte(numAleatorioHorizontal, numAleatorioVertical, "red");
    }
    
    function moverDerecha(){
      let posicionCabeza= serpiente[0]
      let objetoDerecha = {
        x:posicionCabeza.x+1,
        y:posicionCabeza.y
      }
      serpiente.unshift(objetoDerecha);
      serpiente.pop();
    }

    function moverIzquierda(){
      let posicionCabeza= serpiente[0]
      let objetoDerecha = {
        x:posicionCabeza.x-1,
        y:posicionCabeza.y
      }
      serpiente.unshift(objetoDerecha);
      serpiente.pop();
    }

    function moverArriba(){
      let posicionCabeza= serpiente[0]
      let objetoDerecha = {
        x:posicionCabeza.x,
        y:posicionCabeza.y-1
      }
      serpiente.unshift(objetoDerecha);
      serpiente.pop();

    }

    function moverAbajo(){
      let posicionCabeza= serpiente[0]
      let objetoDerecha = {
        x:posicionCabeza.x,
        y:posicionCabeza.y+1
      }
      serpiente.unshift(objetoDerecha);
      serpiente.pop();

    }

    function cambiarDireccion(direccion){
      if (direccion=="derecha"){
        direccionActual="derecha";
      }else if(direccion=="izquierda"){
        direccionActual="izquierda";
      }else if(direccion=="arriba"){
        direccionActual="arriba";
      }else{
        direccionActual="abajo";
      }
    }
    
    let acumulador=0;
    function moverSerpiente(){
      if (juegoTerminado==true){
        return;
      }
      if (direccionActual=="derecha"){
        moverDerecha();
      }else if (direccionActual=="izquierda"){
        moverIzquierda();
      }else if (direccionActual=="arriba"){
        moverArriba();
      }else{
        moverAbajo();
      }
      gameOver();
      if (juegoTerminado==true){
        return;
      }
      if (atrapaComida()==true){
        acumulador = acumulador + 1;
        let cmp = document.getElementById("puntaje");
        cmp.innerText = acumulador;
        crecerSerpiente();
        pintarComida();
        if (acumulador >=5){
            velocidad= 500;
            clearInterval(intervaloSerpiente);
            intervaloSerpiente = setInterval(moverSerpiente, velocidad);
        }
      }
      dibujarTodo();
    }


    function iniciarJuego(){
      if (juegoTerminado==true){
        return;
      }
      if (intervaloSerpiente!=null){
        return;
      }
      pintarComida();
      dibujarTodo();
      intervaloSerpiente = setInterval(moverSerpiente,velocidad);
    }
  
    function pausarJuego(){
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
    }

    function pintarComida(){
      let numLineasVerticales=canvas.width / TAMANIO_CELDA;
      let numLineasHorizontales=canvas.height / TAMANIO_CELDA;
      numAleatorioVertical = Math.floor(Math.random() * numLineasVerticales);
      numAleatorioHorizontal = Math.floor(Math.random() * numLineasHorizontales);
      pintarParte(numAleatorioHorizontal,numAleatorioVertical,color="Red");
    }

    function atrapaComida(){
      let arreglo=serpiente[0]
      if (arreglo.x==numAleatorioHorizontal && arreglo.y==numAleatorioVertical){
        return true;
      }else{
        return false;
      }
    }

    function crecerSerpiente(){
    let ultimaParte = serpiente[serpiente.length-1];
    let nuevaParte;
    if (direccionActual=="derecha"){
        nuevaParte = {
            x:ultimaParte.x+1,
            y:ultimaParte.y };
    }else if (direccionActual=="izquierda"){
        nuevaParte = {
            x:ultimaParte.x-1,
            y:ultimaParte.y};
    }else if (direccionActual=="arriba"){
        nuevaParte = {
            x:ultimaParte.x,
            y:ultimaParte.y+1};
    }else{
        nuevaParte = {
            x:ultimaParte.x,
            y:ultimaParte.y-1};
    }
    serpiente.push(nuevaParte);
  }

  function gameOver(){
    let cabeza = serpiente[0];
    let numColumnas = canvas.width / TAMANIO_CELDA;
    let numFilas = canvas.height / TAMANIO_CELDA;
    if (cabeza.x < 0 || cabeza.x >= numColumnas || cabeza.y < 0 || cabeza.y >= numFilas){
      juegoTerminado = true;
      clearInterval(intervaloSerpiente);
      dibujarTodo();
      alert("GAME OVER");
    }
  }

  function reiniciarJuego(){
    clearInterval(intervaloSerpiente);
    serpiente.splice(0, serpiente.length);
    for (let i=0; i<serpienteInicial.length; i++){
        serpiente.push({
            x: serpienteInicial[i].x,
            y: serpienteInicial[i].y
        });
    }
    acumulador=0;
    direccionActual="derecha";
    juegoTerminado=false;
    velocidad=1000;
    intervaloSerpiente=null;
    let cmp=document.getElementById("puntaje");
    cmp.innerText=acumulador;
    pintarComida();
    dibujarTodo();
    intervaloSerpiente=setInterval(moverSerpiente,velocidad);
}



