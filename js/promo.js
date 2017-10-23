require('../css/common.css');
require('../css/promo.css');
require('../css/balloon.css');
require('../css/modal.css');

var $ = require('jquery');
require('./common');

const CountDownDay = require('./count_down_day').default;

$(function () {
  function modal_reserve() {
    //テキストリンクをクリックしたら
    $(".modal-open").click(function () {
      var html = '<div id="modal-bg"><div id="modal-main" class="ifrm-container">';
      html += '<iframe class="ifrm" src="https://docs.google.com/forms/d/e/1FAIpQLSewo9cIwW2LJOXlluiJ9vKD71dXcLtZQlVRP9D0kv1CUPa24A/viewform?embedded=true#start=embed" scrolling="auto">読み込んでいます...</iframe>';
      html += '</div></div>';


      $("body").append(html);

      //画面中央を計算する関数を実行
      modalResize();

      //モーダルウィンドウを表示
      $("#modal-bg,#modal-main").fadeIn("slow");

      //画面のどこかをクリックしたらモーダルを閉じる
      $("#modal-bg,#modal-main").click(function () {
        $("#modal-main,#modal-bg").fadeOut("slow", function () {
          //挿入した<div id="modal-bg"></div>を削除
          $('#modal-bg').remove();
        });

      });

      //画面の左上からmodal-mainの横幅・高さを引き、その値を2で割ると画面中央の位置が計算できます
      $(window).resize(modalResize);
      function modalResize() {

        var w = $(window).width();
        var h = $(window).height();

        var cw = $("#modal-main").outerWidth();
        var ch = $("#modal-main").outerHeight();

        //取得した値をcssに追加する
        $("#modal-main").css({
          "left": ((w - cw) / 2) + "px",
          "top": ((h - ch) / 2) + "px"
        });
      }
    });
  }

  function getTicketRestCount() {
    // ID of the Google Spreadsheet
    var spreadsheetID = "1hiEFK5SNpMUndJsFOuDBvZVS42VRYOttBC0WtrI8g1o";
    var sheetID = "oau3yae";

    // Make sure it is public or set to Anyone with link can view
    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/" + sheetID + "/public/values?alt=json";

    var firstDayRestTicketCountColumn = 'gsx$残り枚数25日';
    var secondDayRestTicketCountColumn = 'gsx$残り枚数26日';

    function updateRestCount(restID, linkID, count) {
      if (count > 0) {
        $(restID).html('のこり<span>' + count + '</span>枚');
      } else {
        $(restID).html('<span>完売</span>');
        $(linkID).addClass('is-sold-out');
      }
    }

    $.getJSON(url, function (data) {
      var firstDayRestTicketCount = data['feed']['entry'][0][firstDayRestTicketCountColumn]['$t'];
      var secondDayRestTicketCount = data['feed']['entry'][0][secondDayRestTicketCountColumn]['$t'];

      updateRestCount('#first-day-rest', '#first-day-link', firstDayRestTicketCount);
      updateRestCount('#second-day-rest', '#second-day-link', secondDayRestTicketCount);
    });
  }

  new CountDownDay().render();
});
