import Abstract from './abstract';

const createBoardTemplate = () => {
  return '<section class="trip-events"></section>';
};

export default class Board extends Abstract {
  getTemplate() {
    return createBoardTemplate();
  }
}
