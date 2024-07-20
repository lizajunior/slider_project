const images = [
  { url: 'https://makos-nsk.ru/repair-design/img/projects/project.jpg', 
    city: 'Rostov-on-Don, Admiral',
    area: '81 m2',
    time: '3.5 month'
  },
  { url: 'https://aproken.github.io/repair-design/images/project/project2.jpg', 
    city: 'Sochi Thieves',
    area: '105 m2',
    time: '4 month'
  },
  { url: 'https://en.idei.club/uploads/posts/2023-08/thumbs/1691074882_en-idei-club-p-tv-wall-room-design-dizain-krasivo-33.jpg', 
    city: 'Rostov-On-Don, Patriotic',
    area: '93 m2',
    time: '3 month'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const sliderImages = document.querySelector('.slider__images');
  const sliderArrows = document.querySelector('.slider__arrows');
  const sliderDots = document.querySelector('.slider__dots');
  const sliderTitle = document.querySelector('.slider__images-title');
  const cities = document.querySelectorAll('.city');

  const infoElements = document.getElementsByTagName('span');
  
  let currentIndex = 0;
  let intervalId;


  function initCities() {
    cities.forEach((city, index) => {
      city.addEventListener('click', () => {
        cities.forEach(c => c.classList.remove('text-active'));
        city.classList.add('text-active');
        moveSlider(index);
      });
    });
  }

  function initImages() {
    images.forEach((image, index) => {
      const imageDiv = `<div class="image n${index} ${index === 0 ? 'image-active' : ''}" 
        style="background-image:url(${image.url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

  function initInfo(){
    images.forEach((image) => {
      infoElements[0].textContent = image.city
      infoElements[1].textContent = image.area
      infoElements[2].textContent = image.time
    });
  }

  function initArrows() {
    sliderArrows.querySelectorAll('.slider__arrow').forEach(arrow => {
      arrow.addEventListener('click', () => {
        const currentNumber = +sliderImages.querySelector('.image-active').dataset.index;
        let nextNumber;
        if (arrow.classList.contains('left')) {
          nextNumber = currentNumber === 0 ? images.length - 1 : currentNumber - 1;
        } else {
          nextNumber = currentNumber === images.length - 1 ? 0 : currentNumber + 1;
        }
        //Для левой стрелки: если текущий индекс 0, то следующий индекс становится последним, иначе уменьшаем текущий индекс на 1.
        //Для правой стрелки: если текущий индекс последний, то следующий индекс становится 0, иначе увеличиваем текущий индекс на 1.
        moveSlider(nextNumber);
        //Перемещаем слайдер к вычисленному индексу
      });
    });
  }

  function initDots() {
    images.forEach((image, index) => {//смотрит по длине массива images сколько точек необходимо
      const dot = `<div class="slider__dots-item n${index} ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll('.slider__dots-item').forEach(dot => {
      dot.addEventListener('click', function () {
        moveSlider(+this.dataset.index);
        // Перемещаем слайдер к индексу кликнутой точки, преобразовав значение атрибута данных в число
      });
    });
  }

  function moveSlider(num) {
    sliderImages.querySelector('.image-active').classList.remove('image-active');
    sliderImages.querySelector('.n' + num).classList.add('image-active');
    //Например, если num равно 2, функция выберет элемент с классом n2 и добавит ему класс image-active
    sliderDots.querySelector('.active').classList.remove('active');
    sliderDots.querySelector('.n' + num).classList.add('active');
    cities.forEach(city => city.classList.remove('text-active'));
    //Удаляем класс text-active у всех городов.
    cities[num].classList.add('text-active');
    //Добавляем класс text-active новому активному городу с индексом num.
    currentIndex = num;
    //Обновляем текущий индекс на num

    infoElements[0].textContent = images[currentIndex].city;
    infoElements[1].textContent = images[currentIndex].area;
    infoElements[2].textContent = images[currentIndex].time;

    document.querySelector('.js-city') = images[currentIndex].city;
    document.querySelector('.js-apartment-area') = images[currentIndex].area;
    document.querySelector('.js-repair-time') = images[currentIndex].time;
  }

  function startAutoplay() {
    intervalId = setInterval(() => {
      let nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      moveSlider(nextIndex);
    }, 5000); 
  }

  function stopAutoplay() {
    clearInterval(intervalId);
    imageDiv.classList.add('transparent__image');
  }

  initInfo();
  initImages();
  initCities();
  initArrows();
  initDots();
  startAutoplay();

  // Остановка автоигры при наведении мыши на слайдер
  document.querySelector('.slider').addEventListener('mouseover', stopAutoplay);
  document.querySelector('.slider').addEventListener('mouseout', startAutoplay);
});
