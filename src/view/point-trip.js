import {generateStartDate, getDiffTime} from '../utils';

export const createPointTripTemplate = (point) => {
  const {cities, pointTypes, offers, isFavorite} = point;
  const favoriteActive = isFavorite ? 'event__favorite-btn--active' : '';

  const nextDay = new Date(new Date().getTime() + (86400000 * 2));
  const prevDay = new Date(new Date().getTime() - (86400000 * 2));

  const startDate = generateStartDate(prevDay, new Date());
  const endDate = generateStartDate(new Date(), nextDay);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const options = {
    month: 'short',
    day: 'numeric',
  };

  const getVerifyTime = (time) => {
    return `${diffDays > 0
      ? diffDays + 'D ' + getDiffTime(time, 'h', 'm')
      : getDiffTime(time, 'h', 'm')}`;
  };

  return `<ul class="trip-events__list">
            <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${startDate.toLocaleDateString('en', options)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${pointTypes.toLowerCase()}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${cities}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${getDiffTime(startDate, '', '')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${getDiffTime(endDate, '', '')}</time>
                  </p>
                  <p class="event__duration">${getVerifyTime(diffTime)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${offers.price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">${offers.name}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offers.price}</span>
                  </li>
                </ul>
                <button class="event__favorite-btn ${favoriteActive}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
          </ul>`;
};
