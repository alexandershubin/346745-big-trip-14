import Abstract from './abstract';

const createTaskListTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class PointList extends Abstract {
  getTemplate() {
    return createTaskListTemplate();
  }
}
