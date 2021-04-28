import {createElement} from '../utils.js';

const createTaskListTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class PointList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTaskListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
