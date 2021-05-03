import FilterView from './view/filters';
import FormCreationView from './view/form-creation';
// import FormEditView from './view/form-edit';
import MenuView from './view/menu';
import PointTripView from './view/point-trip';
import SortView from './view/sort';
import TripInfoView from './view/trip-info';
import BoardView from './view/board';
import PointListView from './view/point-list';
import NoPointView from './view/no-point';
import {generatePoint} from './mock/point';
import {render, RenderPosition} from './utils.js';

const POINT_COUNT = 3;
const points = new Array(POINT_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector('.trip-main');
const siteNavElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointTripView(point);
  const pointEditComponent = new FormCreationView(point);

  const replaceCardToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToCard = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector('.event__reset-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  pointEditComponent.getElement().querySelector('.event__save-btn').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardPoint) => {
  const boardComponent = new BoardView();
  const pointListComponent = new PointListView();

  render(boardContainer, boardComponent.getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), pointListComponent.getElement(), RenderPosition.BEFOREEND);

  // По условию заглушка должна показываться,
  // когда нет задач или все задачи в архиве.
  // Мы могли бы написать:
  // tasks.length === 0 || tasks.every((task) => task.isArchive)
  // Но благодаря тому, что на пустом массиве every вернёт true,
  // мы можем опустить "tasks.length === 0".
  // p.s. А метод some на пустом массиве наборот вернет false
  if (boardPoint.every((point) => point.isFavorite)) {
    render(boardComponent.getElement(), new NoPointView().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  boardPoint
    .forEach((boardTask) => renderPoint(pointListComponent.getElement(), boardTask));

  render(boardComponent.getElement(), new SortView().getElement(), RenderPosition.AFTERBEGIN);
};

render(siteHeaderElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(siteNavElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, points);
