var Gapi = function(key, wid){
    // Constructor
    this._key = key;
    this._wid = wid;
};

(function(){
    Gapi.prototype.test = function(){
        console.log(this._key);
        console.log(this._wid);
    };

    Gapi.prototype.getJson = function(){
        var target_url = 'https://spreadsheets.google.com/feeds/cells/' + this._key + '/' + this._wid + '/public/values?alt=json';
        $.ajax({
            type: 'GET',
            url: target_url,
            dataType: 'jsonp',
            cache: false,
            success: function(data){ // 通信が成功した時
                var sheetsEntry = data.feed.entry; // 実データ部分を取得
                categorized = categorizeData(sheetsEntry); // データを整形して配列で返す
                console.log(categorized);
                //renderForm(categorized); // レンダリング用の関数を呼ぶ
            },
            error: function(){ // 通信が失敗した時
                console.log('error');
            }
        });
    };

    function categorizeData(sheetsEntry){ // データを整形して配列で返す
        var categorized = [];
        for(var i = 0; i < sheetsEntry.length; i++) {
            var dataCol = sheetsEntry[i].gs$cell.col;
            var dataRow = sheetsEntry[i].gs$cell.row;

            if(dataCol == 1 && dataRow != sheetsEntry[i+1].gs$cell.row){
                categorized[categorized.length] = [];
            }

            if(categorized[dataRow] === undefined || categorized[dataRow] === null || categorized[dataRow] === "") {
                categorized[dataRow] = [];
            }

            categorized[dataRow][dataCol] = (sheetsEntry[i].gs$cell.$t);
        }
        return categorized;
    }
    function renderForm(categorized){ // レンダリング用の関数
        var target = $('.results');
        categorized.forEach(function(areaCats){
            target.before('<h2>'+areaCats[0].gs$cell.$t+'</h2>');
            target.before('<dl>');
            for(var i = 1; i < areaCats.length; i+=2){
                target.before('<dt><label><input name="cats" type="checkbox" />'+areaCats[i].gs$cell.$t+'</label></dt>');
                target.before('<dd>原産地：'+areaCats[i+1].gs$cell.$t+'</dd>');
            }
            target.before('</dl>');
        });
    }
}());


