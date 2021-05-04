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
import {render, replace, RenderPosition} from './utils/render';

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
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToCard = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardPoint) => {
  const boardComponent = new BoardView();
  const pointListComponent = new PointListView();

  render(boardContainer, boardComponent, RenderPosition.BEFOREEND);
  render(boardComponent, pointListComponent, RenderPosition.BEFOREEND);

  // По условию заглушка должна показываться,
  // когда нет задач или все задачи в архиве.
  // Мы могли бы написать:
  // tasks.length === 0 || tasks.every((task) => task.isArchive)
  // Но благодаря тому, что на пустом массиве every вернёт true,
  // мы можем опустить "tasks.length === 0".
  // p.s. А метод some на пустом массиве наборот вернет false
  if (boardPoint.every((point) => point.isFavorite)) {
    render(boardComponent, new NoPointView(), RenderPosition.AFTERBEGIN);
    return;
  }

  boardPoint
    .forEach((boardTask) => renderPoint(pointListComponent, boardTask));

  render(boardComponent, new SortView(), RenderPosition.AFTERBEGIN);
};

render(siteHeaderElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(siteNavElement, new MenuView(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView(), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, points);
