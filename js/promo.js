require('../css/promo.scss');

var $ = require('jquery');
require('./common');

const CountDownDay = require('./count_down_day').default;
const TicketRestCount = require('./ticket_rest_count').default;

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

  new CountDownDay().render();
  new TicketRestCount().update();
});
