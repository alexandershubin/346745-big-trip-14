
export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateForData = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

export const generateDescription = (array) => {
  const randomIndex = getRandomInteger(0, (array.length - 1) / 2);
  let result = '';
  for (let i = 0; i <= randomIndex; i++) {
    result += array[i];
  }

  return result;
};

export const generateStartDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getDiffTime = (duration, h, m) => {
  let minutes = parseInt((duration / (1000 * 60)) % 60);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours + h : hours + h;
  minutes = (minutes < 10) ? '0' + minutes + m : minutes + m;

  const commonTime = `${hours}:${minutes}`;

  return commonTime;
};

export const createPhotoTemplate = () => {
  const arrayPhoto = [];
  for (let i = 0; i < 5; i++) {
    const photos = 'http://picsum.photos/248/152?r=' + i;
    arrayPhoto.push(photos);
  }
  return `${arrayPhoto.map((photo, i) => {
    return`<img class="event__photo" src="${photo}" alt="photo-${i}">`;
  }).join('')}`;
};
