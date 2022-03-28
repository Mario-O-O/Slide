# Slide
Proyecto para realizar slides

**Funcionamiento**
-------------------
**1-** Colocar estructura y solo modificar el "id" el número de slides:

```
<!-- newSlide -->
  <div id="newSlideId" class="slider">
    <div class="wrapper">
      <div class="slides">
        <div class="slide">
          Slide 1
        </div>
        <div class="slide">
          Slide 2
        </div>
        <div class="slide">
          Slide 3
        </div>
        <div class="slide">
          Slide 4
        </div>
      </div>
    </div>
    <a class="prev control"></a>
    <a class="next control"></a>
    <div class="dots"></div>
  </div>
 <!-- End-newSlide -->
  ```
 **2-** Antes del body y después del archivo "scripts.js" crear una etiqueta <script> y colocar las propiedades del slide:
 ```
 const mis_slides = [
  // Slide-1
  {
    id_sliders: "newSlideId", //<-- id del slide
    num_sliders: 1, //<-- Número de slides que aparecen en pantalla
    animacion: true, //<-- Activa la animación del slide (true o false)
    tiempo_slide: 5000, //<-- Tiempo en que cambia de un slide a otro (para la velocidad de animación)
    velocidad_slide: .6, //<-- Velocidad en que se traslada de un slide a otro (en segundos)
    dots: true, //<-- Activa los dots (true o false)
    flechas: true //<-- Activa las flechas navegadoras (true o false)
  },
]

mis_slides.forEach(e => { new Sliders(e).slideOn() }); //<-- activa el slide
```
-------------------
