$( document ).ready(function() {
    $(".btn__menu").on("click", function(){
        // $(".menu__list").slideToggle();

        $('.menu__list').fadeIn();
        $('.s_item').css('display', 'none');
        $('.overlay').fadeIn();
        // console.log("asd");
    });
    $('.js-close-campaign').click(function() {
        $('.menu__list').fadeOut();
        $('.overlay').fadeOut();
        $('.s_item').css('display', 'initial');
    });
    $(document).mouseup(function (e) {
        var popup = $('.menu__list');
        if (e.target!=popup[0]&&popup.has(e.target).length === 0){
            $('.menu__list').fadeOut();
            $('.s_button_add_to_cart').fadeIn();
            $('.overlay').fadeOut();
            $('.s_item').css('display', 'initial');
        }
    });

    $(".s_button_add_to_cart").on("click", function(){
        var name =$(this).parent();
        console.log(name);
        console.log(name.find('.s_model').html())
        var productname = name.find('.s_model').html();
        $('.new__input').append('<div class="div">'+'<input type="text" class="input" name="name_product[]" value="' + productname +'"'+' readonly />'+'<input class="minus" type="button" value="Удалить"/>'+'</div>');

        // $(".menu__list").css('display', 'initial')

        $(".minus").on( "click",function(){
            $(this).parent().remove();
            console.log($(this).parent())

        });

    });




    $(".form").submit(function() {
        var el_l    = $(".name");
        var phone = $(".phone").val();
        let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        var input_product = $(".div")
        if(el_l.val().length < 1 ){
            //$('.mess').append('<div class="div" id="div">'+'Непозволенное имя'+'</div>');


                var $item = $('<div class="div" id="div">'+'Непозволенное имя'+'</div>');

                $item.appendTo($('.mess')).delay(3000).slideUp(200, function(){

                    $item.remove();

                });



            return false

        } else if(!regex.test(phone)){
            //$('.mess').append('<div class="div">'+'неправильный номер'+'</div>');

            var $item2 = $('<div class="div" id="div">'+'неправильный номер' + '<br>' + 'введите номер в формате: 84950000000 или 8000000000'+'</div>');

            $item2.appendTo($('.mess')).delay(3000).slideUp(200, function(){

                $item2.remove();

            });
            return false
        }else if(!input_product.length){
            var item3 = $('<div class="div" id="div">'+'выберите продукт'+'</div>');

            item3.appendTo($('.mess')).delay(3000).slideUp(200, function(){

                $item3.remove();

            });
            //$('.mess').append('<div class="div">'+'выберите продукт'+'</div>');
            return false
        }
//



    $.ajax({
        url:'action_ajax_form.php', //url страницы (action_ajax_form.php)
        type: "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#" + 'ajax_form').serialize(),  // Сеарилизуем объект
        success: function (response) { //Данные отправлены успешно
            result = $.parseJSON(response);
            /* $('#result_form').html('Имя: '+result.name+'<br>Телефон: '+result.phonenumber);*/
            var answer = $('#result_form').append('<div class="result">'+'Имя: ' + result.name + '<br>Телефон: ' + result.phonenumber + '<br>Заказ:  ' + result.name_product + '<br>' +'Успешно отправлены'+'<br>'+'</div>');
                    answer.delay(3000).slideUp(200, function(){

                        $('#result_form').val().remove();
            });
            setTimeout(function() {window.location.reload();}, 2000);
        },
        error: function (response) { // Данные не отправлены
            $('#result_form').html('Ошибка. Данные не отправлены.');

        }
    });





    }
);

});
