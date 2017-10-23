import $ from 'jquery';
import moment from 'moment';

export default class CountDownDay {
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
