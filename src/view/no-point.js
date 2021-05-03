import Abstract from './abstract';

const createNoTaskTemplate = () => {
  return `<p class="trip-events__msg">
            Click New Event to create your first point
          </p>`;
};

export default class NoTask extends Abstract {
  getTemplate() {
    return createNoTaskTemplate();
  }
}
