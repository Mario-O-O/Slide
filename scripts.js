class Sliders {
  
  constructor({id_sliders, num_sliders, animacion, tiempo_slide, velocidad_slide, dots, flechas}){
    // Ajustes
    this.id_sliders = document.getElementById(id_sliders);
    this.num_sliders = num_sliders || 1;
    this.animacion = animacion || false;
    this.tiempo_slide = tiempo_slide || 5000;
    this.velocidad_slide = velocidad_slide || .6;
    this.dots = dots || false;
    this.flechas = flechas || false;
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
    let dots = this.dots;
    let flechas = this.flechas;
    
    let $dot = this.id_sliders.querySelector(".dots");
    let $flechas = idSliders.querySelectorAll(`.control`);

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

    // Agregar Dots
    if (dots === true) {
      for (let i = 0; i < slideSolo.length; i++) {
        let $newDot = document.createElement("div");
        $newDot.classList.add('dot');
        $dot.insertBefore($newDot, $dot.firstElementChild);
      }
    }

    // Agregar Flechas
    if (flechas === false) {  $flechas.forEach(el => { el.style.display = "none"; }); }

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
          cloneLast = lastSlide.cloneNode(true),

          ind = 0,
          dot = idSliders.querySelectorAll(`.dot`);

      // clonar
      for (let i = 0; i < slides.length; i++) {
        let allSlide = slides[i];
        let cloneAllSlide = allSlide.cloneNode(true);
        sliderItems.appendChild(cloneAllSlide);
      }
      sliderItems.insertBefore(cloneLast, firstSlide);

      sliderItems.style.left = `-${slideSize}px`;
      if (dots === true) {  
        dot[0].classList.add("active");
      }

      // evetos muose
      sliderItems.onmousedown = dragStart;

      // evetos tactil
      sliderItems.addEventListener('touchstart', dragStart);
      sliderItems.addEventListener('touchend', dragEnd);
      sliderItems.addEventListener('touchmove', dragAction);

      // eventos click
      prev.addEventListener('click', function () { shiftSlide(-1); });
      next.addEventListener('click', function () {  shiftSlide(1); });
      document.addEventListener("click", function(e) { dotActive(e); });

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
            dot.forEach((el, i) => {dot[i].classList.remove("active"); });
            try { dot[index].classList.add("active"); } catch (error) {}
          } else if (dir == -1) {
            sliderItems.style.left = (posInitial + slideSize) + "px";
            index--;
            dot.forEach((el, i) => {dot[i].classList.remove("active"); });
            try { dot[index].classList.add("active"); } catch (error) {}
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
          try { dot[slidesLength - 1].classList.add("active"); } catch (error) {}
        }
    
        if (index == slidesLength) {
          sliderItems.style.left = -(1 * slideSize) + "px";
          index = 0;
          try { dot[0].classList.add("active"); } catch (error) {}
        }
    
        allowShift = true;
      }

      function dotActive(e) {
        if (dots === true) {   
          for (let inde = 0; inde < dot.length; inde++) {
            if (e.target === dot[inde]) {
              dot.forEach((el, i) => { /*slides[i].classList.remove("active");*/ dot[i].classList.remove("active"); });
              dot[inde].classList.add("active");
              
              let posInitialx = slideSolo[0].offsetWidth;
              
              sliderItems.classList.add('shifting');
              sliderItems.style.left = `-${posInitialx * (inde + 1)}px`;
              sliderItems.style.transition = `left ${velocidadSlide}s ease-out`;
              index = inde;

              sliderItems.classList.remove('shifting');
  
              ind = inde;

            }
          }
        }
      }

    }

    slide();
   
  }
  
}
/*
(\_/)     (\_/)
( •_•)   (•_• )
/ >  > ☼ <  < \
*/