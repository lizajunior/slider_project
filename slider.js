let images = [

  { url:'https://makos-nsk.ru/repair-design/img/projects/project.jpg', 
    city: 'Rostov-on-Don, Admiral' 
  },

  { url:'https://aproken.github.io/repair-design/images/project/project2.jpg',
    city: 'Sochi Thieves' 
  },

  { url:'https://en.idei.club/uploads/posts/2023-08/thumbs/1691074882_en-idei-club-p-tv-wall-room-design-dizain-krasivo-33.jpg',
    city: 'Rostov-On-Don, Patriotic'
  }

]

const sliderContainer = document.querySelector('.slider');
const cities = document.querySelectorAll('.city');//возвращает NodeList, который поддерживает метод forEach.

function initSlider(options) {
  if (!images || !images.length) return;
  //Здесь проверяется, существует ли переменная images и есть ли в ней хотя бы один элемент.
  //Если images не существует или она пуста (длина массива равна нулю), функция просто возвращается (ничего не делает)

  //Если options не передан (т.е. он равен undefined или null), устанавливаются значения по умолчанию

  let sliderImages = document.querySelector('.slider__images');
  let sliderArrows = document.querySelector('.slider__arrows');
  let sliderDots = document.querySelector('.slider__dots');

  initImages();
  initCities();
  initArrows();
  initDots();

  function initCities(){
    cities.forEach(city => {
      city.addEventListener('click', () => {
        cities.forEach(c => c.classList.remove('text-active'));
        city.classList.add('text-active');
      });
    });
  }

  function initImages(){
    images.forEach((image,index) => {
      let imageDiv =`<div class="image n${index} ${index === 0 ? "image-active" : ""}" 
      style="background-image:url(${images[index].url});" data-index="${index}"></div>`
      sliderImages.innerHTML += imageDiv; //добавляем картинку к остальным элементам или проще говоря 'суммируем'
    })
  }

  function initArrows(){
    sliderArrows.querySelectorAll('.slider__arrow').forEach(arrow =>{
      arrow.addEventListener('click', () => {
        let currentNumber = +sliderImages.querySelector('.image-active').dataset.index;//из атрибута всегда полуем строку поэтому + чтобы преобразовать в number
        let nextNumber;
        if(arrow.classList.contains('left')){
          nextNumber = currentNumber === 0 ? images.length - 1 : currentNumber - 1;
        } else{
          nextNumber = currentNumber === images.length - 1 ? 0 : currentNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  };

  function initDots(){
    images.forEach((image,index)=>{
      let dot = `<div class ="slider__dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll('.slider__dots-item').forEach(dot =>{
      dot.addEventListener('click', () => {
        moveSlider(this.dataset.index);
        sliderDots.querySelector('.active').classList.remove('active');
        this.classList.add('active');
      })
    })
  };

  function moveSlider(num){
    sliderImages.querySelector('.image-active').classList.remove('image-active');
    sliderImages.querySelector('.n' + num).classList.add('image-active');
  };
};

document.addEventListener('DOMContentLoaded', initSlider);
