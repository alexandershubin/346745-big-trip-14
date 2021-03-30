import {createFiltersTemplate} from "./view/filters";
import {createFormCreationTemplate} from "./view/form-creation";
import {createFormEditTemplate} from "./view/form-edit";
import {createMenuTemplate} from "./view/menu";
import {createPointTripTemplate} from "./view/point-trip";
import {createSortTemplate} from "./view/sort";
import {createInfoTripTemplate} from "./view/trip-info";

const TASK_COUNT = 3;

const render = (container, template, place=`beforeend`) => {
  container.insertAdjacentHTML(place, template);
}

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteNavElement = siteHeaderElement.querySelector(`.trip-controls__navigation`);
const siteFilterElement = siteHeaderElement.querySelector(`.trip-controls__filters`);
const siteMainElement = document.querySelector(`.trip-events`);

render(siteHeaderElement, createInfoTripTemplate(), `afterbegin`)
render(siteNavElement, createMenuTemplate())
render(siteFilterElement, createFiltersTemplate())
render(siteMainElement, createSortTemplate())
render(siteMainElement, createFormEditTemplate())
// render(siteMainElement, createFormCreationTemplate()) // форма редактирование пока скрыта

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteMainElement, createPointTripTemplate())
}
