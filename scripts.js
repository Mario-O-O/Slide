class Sliders {
  
  constructor({id_sliders, num_sliders, animacion, tiempo_slide, velocidad_slide}){
    // Ajustes
    this.id_sliders = document.getElementById(id_sliders);
    this.num_sliders = num_sliders || 1;
    this.animacion = animacion || false;
    this.tiempo_slide = tiempo_slide || 5000;
    this.velocidad_slide = velocidad_slide || .6;
  };

  slideOn(){
    // Variables
    let idSliders = this.id_sliders;
    let sliderItems = this.id_sliders.querySelector('.slides');
    let slideSolo = this.id_sliders.querySelectorAll('.slide');
    let anchoSliders = this.id_sliders.offsetWidth;

    let prev = this.id_sliders.querySelector('.prev');
    let next = this.id_sliders.querySelector('.next');

    let animacionSlide = this.animacion;
    let velocidadSlide = this.velocidad_slide;
    let tiempoSlide = this.tiempo_slide;

    // Ancho slide
    for (var i = 0; i < slideSolo.length; i++) {
      slideSolo[i].style.width = anchoSliders / this.num_sliders + 'px';
    }

    // Ancho slide responsive
    function slideResponsive(x) {
      for (var i = 0; i < slideSolo.length; i++) {
        if (x.matches) {
          slideSolo[i].setAttribute('style', 'width:' + anchoSliders / 1 + 'px;');
        }
      }
    }

    let x = window.matchMedia("(max-width: 700px)")
    slideResponsive(x);
    x.addListener(slideResponsive);

    function slide() {
      let posX1 = 0,
          posX2 = 0,
          posInitial,
          posFinal,
          threshold = 100,
          slides = slideSolo,
          slidesLength = slides.length,
          slideSize = slideSolo[0].offsetWidth,
          index = 0,
          allowShift = true,

          firstSlide = slides[0],
          lastSlide = slides[slidesLength - 1],
          cloneLast = lastSlide.cloneNode(true);

      // clonar
      for (let i = 0; i < slides.length; i++) {
        let allSlide = slides[i];
        let cloneAllSlide = allSlide.cloneNode(true);
        sliderItems.appendChild(cloneAllSlide);
      }
      sliderItems.insertBefore(cloneLast, firstSlide);

      sliderItems.style.left = `-${slideSize}px`;

      // evetos muose
      sliderItems.onmousedown = dragStart;

      // evetos tactil
      sliderItems.addEventListener('touchstart', dragStart);
      sliderItems.addEventListener('touchend', dragEnd);
      sliderItems.addEventListener('touchmove', dragAction);

      // eventos click
      prev.addEventListener('click', function () { shiftSlide(-1); });
      next.addEventListener('click', function () {  shiftSlide(1); });

      // animacion
      if (animacionSlide === true) {
      setInterval(() => {   
        next.click();
        }, tiempoSlide);
      }

      // transicion de enventos
      sliderItems.addEventListener('transitionend', checkIndex);

      // funciones
      function dragStart (e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = sliderItems.offsetLeft;
    
        if (e.type == 'touchstart') {
          posX1 = e.touches[0].clientX;
        } else {
          posX1 = e.clientX;
          document.onmouseup = dragEnd;
          document.onmousemove = dragAction;
        }
      }
    
      function dragAction (e) {
        e = e || window.event;
    
        if (e.type == 'touchmove') {
          posX2 = posX1 - e.touches[0].clientX;
          posX1 = e.touches[0].clientX;
        } else {
          posX2 = posX1 - e.clientX;
          posX1 = e.clientX;
        }
        sliderItems.style.left = (sliderItems.offsetLeft - posX2) + "px";
      }
    
      function dragEnd (e) {
        posFinal = sliderItems.offsetLeft;
        if (posFinal - posInitial < -threshold) {
          shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
          shiftSlide(-1, 'drag');
        } else {
          sliderItems.style.left = (posInitial) + "px";
        }
        document.onmouseup = null;
        document.onmousemove = null;
      }

      function shiftSlide(dir, action) {
        sliderItems.classList.add('shifting');
        sliderItems.style.transition = `left ${velocidadSlide}s ease-out`;
    
        if (allowShift) {
          if (!action) { posInitial = sliderItems.offsetLeft; }
    
          if (dir == 1) {
            sliderItems.style.left = (posInitial - slideSize) + "px";
            index++;
          } else if (dir == -1) {
            sliderItems.style.left = (posInitial + slideSize) + "px";
            index--;
          }
        };
    
        allowShift = false;
      }

      function checkIndex (){
        sliderItems.classList.remove('shifting');
        sliderItems.style.transition = `initial`;
    
        if (index == -1) {
          sliderItems.style.left = -(slidesLength * slideSize) + "px";
          index = slidesLength - 1;
        }
    
        if (index == slidesLength) {
          sliderItems.style.left = -(1 * slideSize) + "px";
          index = 0;
        }
    
        allowShift = true;
      }

    }

    slide();
   
  }
  
}