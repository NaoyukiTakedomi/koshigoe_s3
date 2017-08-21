$(function(){

    function init() {
        var count = 0;
        var today = new Date();

        count = compareDate(2017, 11, 25, today.getFullYear(), today.getMonth()+1, today.getDate());
        $('#countdown_day').text(count);
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
        return diffDay;
    }

    init();

});
