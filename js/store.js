$(function(){
    <!--
    g_stores = "";

    $('.accordion').on('click', function(){
        $(this).next().slideToggle();
        if ($(this).hasClass('active')) {
			// activeを削除
			$(this).removeClass('active');
		}
		else {
			// activeを追加
			$(this).addClass('active');
		}
        if ($(this).children(".accordion_item").hasClass('active')) {
			// activeを削除
			$(this).children(".accordion_item").removeClass('active');
		}
		else {
			// activeを追加
			$(this).children(".accordion_item").addClass('active');
		}
    });

    function isOpen(arr) {
        var result = false;
        var date = new Date();
        var now = date.getHours()*100 + date.getMinutes();
        arr.forEach(function(time){
            var open = time['open'].replace(':', '');
            var close = time['close'].replace(':', '');

            if (open <= now && now <= close) {
                result = true;
            }
        });
        return result;
    }

    function clearOiriComment() {
        $('#oiri_list').empty();
    }

    function getOiriComment() {
        // ID of the Google Spreadsheet
        var spreadsheetID = "1hiEFK5SNpMUndJsFOuDBvZVS42VRYOttBC0WtrI8g1o";

        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/o3riw6r/public/values?alt=json";

        $.getJSON(url, function(data) {
            var entry = data.feed.entry;
            // entry.reverse();

            $(entry).each(function(){
                if (this.gsx$お店の名前.$t != "" && this.gsx$タイムスタンプ.$t != "" && this.gsx$混雑状況は.$t != "") {
                    var html = '<div class="oiri-log">';

                    var _time = this.gsx$タイムスタンプ.$t;
                    var _ta = _time.match(/^(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)$/);
                    var time = ('00' + _ta[4]).slice(-2) + ':' + _ta[5];
                    var name = this.gsx$お店の名前.$t;
                    var message = this.gsx$混雑状況は.$t;

                    html += '<p><span class="name">' + name + '</span><span class="time">' + time + '</span>';
                    html += '<p class="message">' + message + '</p></p>';

                    html += '</div>';
                    $('#oiri_list').append(html);
                }
            });

            $(".live").fadeIn("fast");
            $(".live").fadeOut("fast");
            $(".live").fadeIn("fast");
        });
    }

    function sortStoreList(list) {
        var open = [];
        var close = [];
        $(list).each(function(){
            // console.log(this);
        });
    }

    function renderStoreList() {
        // ID of the Google Spreadsheet
        var spreadsheetID = "1hiEFK5SNpMUndJsFOuDBvZVS42VRYOttBC0WtrI8g1o";

        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
        var oiri_form_prefix = 'https://docs.google.com/forms/d/e/1FAIpQLSdh-H1k5GFmZWclczjjGIXNQklx8jK7LT-tjrLMpkzaQ8qzJg/viewform?usp=pp_url&entry.139018250=';

        $.getJSON(url, function(data) {

            var entry = data.feed.entry;
            g_stores = entry;
            sortStoreList(entry);

            $(entry).each(function(){
                var available = new Array();
                var oiri_form_link = oiri_form_prefix + encodeURIComponent(this.gsx$店舗名.$t);

                if (this.gsx$開店時間.$t != "" && this.gsx$閉店時間.$t != "") {
                    var temp = new Array();
                    temp['open'] = this.gsx$開店時間.$t;
                    temp['close'] = this.gsx$閉店時間.$t;
                    available.push(temp);
                }
                if (this.gsx$開店時間2.$t != "" && this.gsx$閉店時間2.$t != "") {
                    var temp = new Array();
                    temp['open'] = this.gsx$開店時間2.$t;
                    temp['close'] = this.gsx$閉店時間2.$t;
                    available.push(temp);
                }
                var open = isOpen(available);
                if (this.gsx$強制閉店フラグ.$t != "" && this.gsx$強制閉店フラグ.$t != "0") {
                    open = false;
                }

                var gauge = 0;
                if (isNaN(this.gsx$大入.$t) === false && open) {
                    gauge = this.gsx$大入.$t / 15 * 100;
                    if (gauge > 100) { gauge = 100; }
                }

                // Column names are name, age, etc.
                var html = '<div class="store clearfix"><div class="store-img modal-open left" data-id="' + this.gsx$店番号.$t + '">';
                // if (this.gsx$link.$t != "") {
                //     html += '<a href="' + this.gsx$link.$t + '" target="_blank">';
                // }
                if (this.gsx$メニュー画像.$t != "") {
                    html += '<img src="' + this.gsx$メニュー画像.$t + '">';
                } else {
                    html += '<img src="./img/menu/dummy.png" data-id="' + this.gsx$店番号.$t + '">';
                }
                // if (this.gsx$link.$t != "") {
                //     html += '</a>';
                // }
                html += '</div><div class="store-desc left" data-id="' + this.gsx$店番号.$t + '">';
                html += '<h3>' + this.gsx$店舗名.$t + '</h3>';
                html += '<p class="eat">'+this.gsx$メニュー1.$t+'</p>';
                html += '<p class="drink">'+this.gsx$メニュー2.$t+'</p>';
                if (this.gsx$開店時間2.$t != "" && this.gsx$閉店時間2.$t != "") {
                    html += '<p class="time">'+this.gsx$開店時間.$t+'-'+this.gsx$閉店時間.$t+', '+this.gsx$開店時間2.$t+'-'+this.gsx$閉店時間2.$t+'</p>';
                } else {
                    html += '<p class="time">'+this.gsx$開店時間.$t+'-'+this.gsx$閉店時間.$t+'</p>';
                }
                if (open) {
                    html += '<div class="gauge" style="width:' + gauge + '%"></div>';
                }
                html += '</div>';
                if (open) {
                    if (this.gsx$カテゴリ.$t == "店舗") {
                        html += '<div class="store-oiri left" id="oiri__' + this.gsx$店番号.$t + '" data-id="' + this.gsx$店番号.$t + '"><a href="' + oiri_form_link + '" target="_self"><img src="./img/oiri.png"></a><p>' + this.gsx$大入.$t + '</p></div>';
                    }
                } else {
                    html += '<div class="store-oiri left"><img src="./img/close.png"></div>';
                }
                if (this.gsx$状況.$t != "") {
                    html += '<div class="store-balloon">' + this.gsx$状況.$t + '</div>';
                }
                html += '</div>';

                if (this.gsx$カテゴリ.$t == "店舗") {
                    $('#store_list').append(html);
                } else if (this.gsx$カテゴリ.$t == "周辺") {
                    $('#arround_list').append(html);
                } else {
                    $('#kimikoe_list').append(html);
                }

            });
            update();
        });
    }

    function update() {
        $('[id^=oiri__]').on('click',function(){
            // var sid = $(this).data("id");
            // var ua = window.navigator.userAgent.toLowerCase();
            // var status = 0; // 固定
            // $.ajax({
            //     url: "https://docs.google.com/forms/d/1hiEFK5SNpMUndJsFOuDBvZVS42VRYOttBC0WtrI8g1o/formResponse",
            //     data: { store_id: sid, user_agent: ua, status: status},
            //     type: "POST",
            //     dataType: "xml",
            //     statusCode: {
            //         0: function() {
            //             //Success message
            //         },
            //         200: function() {
            //             //Success Message
            //         }
            //     }
            // });
        });
        /**/
        //テキストリンクをクリックしたら
        $(".modal-open").click(function(){
            var store_id = $(this).data('id');

            var store;
            $.each(g_stores, function(i, elem){
                if (elem.gsx$店番号.$t != "" && store_id == elem.gsx$店番号.$t) {
                    store = elem;
                }
            });

            //body内の最後に<div id="modal-bg"></div>を挿入
            var html = '<div id="modal-bg"><div id="modal-main">';
            html += '<div class="name">';
            html += store.gsx$店舗名.$t;
            html += '</div>';
            html += '<div class="description">';
            html += '<img src="' + store.gsx$メニュー画像.$t + '">';
            html += '<div class="detail">';
            html += '<h3 class="">営業時間</h3>';
            html += '<p class="time">'+store.gsx$開店時間.$t+' - '+store.gsx$閉店時間.$t+'</p>';
            if (store.gsx$開店時間2.$t != "" && store.gsx$閉店時間2.$t != "") {
                html += '<p class="time">'+store.gsx$開店時間2.$t+' - '+store.gsx$閉店時間2.$t+'</p>';
            }
            html += '</div>';
            html += '</div>';
            if (store.gsx$カテゴリ.$t == "店舗") {
                html += '<div class="modal-menu">';
                html += '<p class="menu1">'+store.gsx$メニュー1.$t+'</p>';
                html += '</div>';
                html += '<div class="modal-menu">';
                html += '<p class="menu2">'+store.gsx$メニュー2.$t+'</p>';
                html += '</div>';
                html += '<div class="modal-live">';
                html += '<p>' + nl2br(store.gsx$説明.$t) + '</p>';
                html += '</div>';
            } else {
                html += '<div class="modal-live spot">';
                html += '<p>' + nl2br(store.gsx$説明.$t) + '</p>';
                html += '</div>';
            }

            html += '<div class="links">';
            if (store.gsx$map.$t != "") {
                html += '<a href="' + store.gsx$map.$t + '" class="left" target="_blank"><img src="./img/icon/map.png" alt="Map" title="' + store.gsx$店舗名.$t + 'への道"></a>';
            }
            if (store.gsx$facebook.$t != "") {
                html += '<a href="' + store.gsx$facebook.$t + '" class="left" target="_blank"><img src="./img/icon/facebook.png" alt="Facebook" title="' + store.gsx$店舗名.$t + 'Facebook"></a>';
            }
            if (store.gsx$twitter.$t != "") {
                html += '<a href="' + store.gsx$twitter.$t + '" class="left" target="_blank"><img src="./img/icon/twitter.png" alt="Twitter" title="' + store.gsx$店舗名.$t + 'Twitter"></a>';
            }
            if (store.gsx$instagram.$t != "") {
                html += '<a href="' + store.gsx$instagram.$t + '" class="left" target="_blank"><img src="./img/icon/instagram.png" alt="Instagram" title="' + store.gsx$店舗名.$t + 'Instagram"></a>';
            }
            html += '</div>';
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
        /**/
    }

    function nl2br(str) {
        str = str.replace(/\r\n/g, "<br />");
        str = str.replace(/(\n|\r)/g, "<br />");
        return str;
    }

    renderStoreList();
    getOiriComment();

    //-->
});
