require('../css/common.css');
require('../css/balloon.css');

import $ from 'jquery';
const CountDownDay = require('./count_down_day').default;

$(() => new CountDownDay().render());
