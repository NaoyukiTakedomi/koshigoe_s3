require('../css/index.scss');

import $ from 'jquery';
const CountDownDay = require('./count_down_day').default;

$(() => new CountDownDay().render());
