require('../css/common.css');
require('../css/balloon.css');

const $ = require('jquery');
const moment = require('moment');

class CountDownDay {
  constructor() {
    this.targetDate = new Date('2017-11-25');
  }

  render() {
    $('#countdown_day').text(this._count());
  }

  _count() {
    return moment(this.targetDate).diff(moment(new Date()), 'days');
  }
}

$(() => new CountDownDay().render());
