$(document).ready(function() {

    var ru = new Array ('а','А','б','Б','в','В','г','Г','д','Д','е','Е','ё','Ё','ж','Ж','з','З','и','И','й','Й','к','К','л','Л','м','М','н','Н','о','О','п','П','р','Р','с','С','т','Т', 'у','У','ф','Ф','х','Х','ц','Ц','ч','Ч','ш','Ш','щ','Щ','ъ','Ъ', 'ы','Ы','ь','Ь','э','Э','ю','Ю','я','Я','«','»','–','—','№','`');
    var en = new Array ('a','A','b','B','v','V','g','G','d','D','e','E','yo','Yo','zh','Zh','z','Z','i','I','y','Y','k','K','l','L','m','M','n','N','o','O','p','P','r','R','s','S','t','T','u', 'U','f','F','h','H','ts','Ts','ch','Ch','sh','Sh','sch','Sch','\'','\'','i','I','\'','\'','e','E','u','U','ya','Ya','"','"','-','-','#','\'');


    //перерасчет количества сообщений при добавлении символов в textarea
    $('.text').bind('input', function(){
        count_sms();
    });

    //перерасчет количества сообщений при потере фокуса textarea
    $('.text').blur(function(){
        count_sms();
    });

    //расчет количества сообщений
    function count_sms() {
        var text = $('.text').val();
        var len = text.length;
        var count=0;
        //проверка на символы кириллицы
        if(len) {
            if (/[а-яё]/i.test(text)) {
                if (len > 70) {
                    count = Math.ceil(len / 67);
                }
                else {
                    count = 1;
                }
            }
            else {
                if (len > 160) {
                    count = Math.ceil(len / 153);
                }
                else {
                    count = 1;
                }
            }
        }
            $('.count').val(count);
    }

    //конвертация в латиницу
    function to_en(text){
        for(var i=0; i<ru.length; i++){
            var reg = new RegExp(ru[i], "g");
            text = text.replace(reg, en[i]);
        }
        return text;
    }

    //конвертация в кириллицу
    function to_ru(text){
        for(var i=0; i<ru.length; i++){
            var reg = new RegExp(en[i], "g");
            text = text.replace(reg, ru[i]);
        }
        return text;
    }

    //обработка checkbox
    $('.translit').click(function(){
        if ($(this).is(':checked')) {
            $('.text').val(to_en($('.text').val()));

        } else {
            $('.text').val(to_ru($('.text').val()));
        }
        count_sms();
    });

    //обработка нажатия кнопки сохранить
    $('.save').click(function(){
        // собираем данные с формы
        var text = $('.text').val();
        var count = $('.count').val();
        // отправляем данные
        $.ajax({
            url: "main.php",
            type: "post",
            dataType: "json",
            data: {
                "text": text,
                "count": count
            },
            // после получения ответа сервера
            success: function(data){
                $('.result').html(data.result); // выводим ответ сервера
            }
        });
    });


});

