$(function(){
    <!--

    function init() {
        var count = 0;
        var today = new Date();

      getTicketRestCount();

      updateCountdown();
        // modal_reserve();
    }
    /**
     * 2つの日付の差を求める関数
     * year1 1つのめ日付の年
     * month1 1つめの日付の月
     * day1 1つめの日付の日
     * year2 2つのめ日付の年
     * month2 2つめの日付の月
     * day2 2つめの日付の日
     */
    function compareDate(year1, month1, day1, year2, month2, day2) {
        var dt1 = new Date(year1, month1 - 1, day1);
        var dt2 = new Date(year2, month2 - 1, day2);
        var diff = dt1 - dt2;
        var diffDay = diff / 86400000;//1日は86400000ミリ秒
        return diff;
        return diffDay;
    }
    function countdown(year, month, day, hour, min, sec) {
        var now = new Date();
        var tar = new Date(year, month - 1, day, hour, min, sec);
        var diff = tar - now;
        var diff_d = Math.floor(diff / 86400000);   // 1日は86400000msec
        var rest_d = diff % 86400000;
        var diff_h = Math.floor(rest_d / 3600000);  // 1時間は36000000msec
        var rest_h = rest_d % 3600000;
        var diff_m = Math.floor(rest_h / 60000);  // 1分は60000msec
        var rest_m = rest_h % 60000;
        var diff_s = Math.floor(rest_m / 1000);  // 1秒は1000msec
        var rest_s = rest_m % 60000;
        var diff_ms = Math.floor(rest_s);
        return [diff_d, diff_h, ('00' + diff_m).slice(-2), ('00' + diff_s).slice(-2), ('00' + diff_ms).slice(-2)]
        // return diff_d + '日' + diff_h + ':' + diff_m + ':' + ('00' + diff_s).slice(-2);
    }
    function updateCountdown() {
        // count = compareDate(2017, 11, 25, today.getFullYear(), today.getMonth()+1, today.getDate());
        count = countdown(2017, 11, 25, 11, 00, 00);
        if (count[0] >= 0) {
            $('#countdown_day').text(count[0]);
            $('#countdown_hour').text(count[1]);
            $('#countdown_min').text(count[2]);
            $('#countdown_sec').text(count[3]);
            $('.premode').show();
        } else {
            $('.premode').hide();
        }
    }

    function modal_reserve() {
        //テキストリンクをクリックしたら
        $(".modal-open").click(function(){
            var html = '<div id="modal-bg"><div id="modal-main" class="ifrm-container">';
            html += '<iframe class="ifrm" src="https://docs.google.com/forms/d/e/1FAIpQLSewo9cIwW2LJOXlluiJ9vKD71dXcLtZQlVRP9D0kv1CUPa24A/viewform?embedded=true#start=embed" scrolling="auto">読み込んでいます...</iframe>';
            html += '</div></div>';



            $("body").append(html);

            //画面中央を計算する関数を実行
            modalResize();

            //モーダルウィンドウを表示
            $("#modal-bg,#modal-main").fadeIn("slow");

            //画面のどこかをクリックしたらモーダルを閉じる
            $("#modal-bg,#modal-main").click(function(){
                $("#modal-main,#modal-bg").fadeOut("slow",function(){
                    //挿入した<div id="modal-bg"></div>を削除
                    $('#modal-bg').remove() ;
                });

            });

            //画面の左上からmodal-mainの横幅・高さを引き、その値を2で割ると画面中央の位置が計算できます
            $(window).resize(modalResize);
            function modalResize(){

                var w = $(window).width();
                var h = $(window).height();

                var cw = $("#modal-main").outerWidth();
                var ch = $("#modal-main").outerHeight();

                //取得した値をcssに追加する
                $("#modal-main").css({
                    "left": ((w - cw)/2) + "px",
                    "top": ((h - ch)/2) + "px"
                });
            }
        });
    }

    function getTicketRestCount() {
      // ID of the Google Spreadsheet
      var spreadsheetID = "1hiEFK5SNpMUndJsFOuDBvZVS42VRYOttBC0WtrI8g1o";
      var sheetID = "oau3yae";

      // Make sure it is public or set to Anyone with link can view
      var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/" + sheetID +"/public/values?alt=json";

      var firstDayRestTicketCountColumn = 'gsx$残り枚数25日';
      var secondDayRestTicketCountColumn = 'gsx$残り枚数26日';

      function updateRestCount(restID, linkID, count, href_url) {
        $(linkID).removeClass('is-sold-out');
        if (count > 0) {
          $(restID).html('のこり<span>' + count + '</span>枚');
          $(linkID)[0].href = href_url;
        } else {
          $(restID).html('<span>完売</span>');
          $(linkID).addClass('is-sold-out');
        }
      }

      $.getJSON(url, function(data) {
        var firstDayRestTicketCount = data['feed']['entry'][0][firstDayRestTicketCountColumn]['$t'];
        var secondDayRestTicketCount = data['feed']['entry'][0][secondDayRestTicketCountColumn]['$t'];

        updateRestCount('#first-day-rest', '#first-day-link', firstDayRestTicketCount, "https://docs.google.com/forms/d/e/1FAIpQLSewo9cIwW2LJOXlluiJ9vKD71dXcLtZQlVRP9D0kv1CUPa24A/viewform?usp=pp_url&entry.2132951387&entry.615825568=0&entry.54882148=0");
        updateRestCount('#second-day-rest', '#second-day-link', secondDayRestTicketCount, "https://docs.google.com/forms/d/e/1FAIpQLSeJkrwZR_ijTxdUdbF9h_p3WTZvg4OwuV0PJCXo1LNjrzQmMQ/viewform?usp=pp_url&entry.2132951387&entry.615825568=0&entry.54882148=0");

      });
    }

    init();
    setInterval(updateCountdown, 1000);
    setInterval(getTicketRestCount, 1000);

    //-->
});
