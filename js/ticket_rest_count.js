require('babel-polyfill');
var $ = require('jquery');

class GetTicketRestCount {
  constructor() {
    // ID of the Google Spreadsheet
    this.spreadsheetID = "1hiEFK5SNpMUndJsFOuDBvZVS42VRYOttBC0WtrI8g1o";
    this.sheetID = "oau3yae";

    this.firstDayRestTicketCountColumn = 'gsx$残り枚数25日';
    this.secondDayRestTicketCountColumn = 'gsx$残り枚数26日';
  }

  async call() {
    const res = await $.getJSON(this._url());
    return this._parseResponse(res);
  }

  _parseResponse(res) {
    const entry = res['feed']['entry'][0];
    return {
      firstDayRestTicketCount: entry[this.firstDayRestTicketCountColumn]['$t'],
      secondDayRestTicketCount: entry[this.secondDayRestTicketCountColumn]['$t']
    }
  }

  _url() {
    return `https://spreadsheets.google.com/feeds/list/${this.spreadsheetID}/${this.sheetID}/public/values?alt=json`;
  }
}

export default class TicketRestCount {
  async update()  {
    const counts = await new GetTicketRestCount().call();

    this._updateRestCount('#first-day-rest', '#first-day-link', counts.firstDayRestTicketCount);
    this._updateRestCount('#second-day-rest', '#second-day-link', counts.secondDayRestTicketCount);
  }

  _updateRestCount(restID, linkID, count) {
    if (count > 0) {
      $(restID).html('のこり<span>' + count + '</span>枚');
    } else {
      $(restID).html('<span>完売</span>');
      $(linkID).addClass('is-sold-out');
    }
  }
}
