

$(document).ready(function() {

    // $('.container-spinner').children().addClass('spinner');

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function() {
        readURL(this);
    });

    //sticky nav

    $windowHeight = $(window).height();
    $windowHeight += 200;

    if ($(document).height() > $windowHeight) {

        console.log("test");

        $(window).scroll(function() {
            $navigationDestkop = $('.navigation-desktop');

            var scroll = $(window).scrollTop();

            if (scroll >= 5) {
                $navigationDestkop.addClass("scrolled");
            } else {
                $navigationDestkop.removeClass("scrolled");
            }
        });
    }

    // mobilenav

    $burgerMenuBtn = $('.js-menu-btn');
    $navigationPoints = $('.navigation-mobile-open-navpoints');
    $navigationMobileWrapper = $('.navigation-mobile');

    $navigationPoints.hide();

    $burgerMenuBtn.click(function() {
        $navigationMobileWrapper.toggleClass('open');
        $burgerMenuBtn.parent().toggleClass('open');

        if($burgerMenuBtn.parent().hasClass('open')) {
            $navigationPoints.show();
        } else {
            $navigationPoints.hide();
        }

    });

    $toggleIcon = $('.js-toggle-icon');
    $openNavigationPoints = $('.js-open-navigation-points');

    $openNavigationPoints.hide();

    $toggleIcon.click(function() {
        $toggleIcon.toggleClass("fa-caret-up fa-caret-down");
        if($toggleIcon.hasClass("fa-caret-up")) {
            $openNavigationPoints.show();
        } else {
            $openNavigationPoints.hide();
        }
    });

    $toggleShowAllergens = $('.js-toggle-show-allergens');
    $allergenWrapper = $('.js-allergen-tiles-wrapper');

    $allergenWrapper.hide();

    $toggleShowAllergens.click(function() {
        $toggleShowAllergens.find("i").toggleClass("fa-caret-up fa-caret-down");
        if($toggleShowAllergens.find("i").hasClass("fa-caret-up")) {
            $allergenWrapper.show();
        } else {
            $allergenWrapper.hide();
        }
    });


    // char counter title

    // var max_length_title = 35;
    // var counter_title = document.querySelector('.js-count-title');

    // var inputTitle =  document.getElementsByClassName('js-input-title');
    // if (typeof(inputTitle) != 'undefined' && inputTitle != null)
    // {
    //     document.querySelector('.js-input-title').addEventListener('keyup', function(event){
    //         var text_title = event.target.value;
    //         if(text_title.length > max_length_title) {
    //             text_title = text_title.substr(0,max_length_title);
    //             event.target.value = text_title;
    //         }
    //         counter_title.textContent = max_length_title - text_title.length;
    //     });
    // }



    // char counter description

    // var max_length_description = 150;
    // var counter_description = document.querySelector('.js-count-description');
    //
    //
    //     document.querySelector('.js-input-description').addEventListener('keyup', function (event) {
    //         var text = event.target.value;
    //         if (text.length > max_length_description) {
    //             text = text.substr(0, max_length_description);
    //             event.target.value = text;
    //         }
    //         counter_description.textContent = max_length_description - text.length;
    //     });



    // add ingredient input field

    // $('.add-ingredient').click(function() {
    //     $('.js-wrapper-ingredients-input').append("<div class=\"wrapper-ingredients\">\n" +
    //         "<input name=\"ingredient[]\" value=\"\" class=\"form-recipe-input margin-bottom-10\" id=\"input_ingredient\">\n" +
    //         "</div>");
    // });

    $('.add-ingredient').click(function() {
        $('.js-wrapper-ingredients-input').append("<div class=\"wrapper-ingredients\">\n" +
                "<div>\n" +
                    "<div class=\"input-flex\">\n" +
                        "<div class=\"input-width-100\">\n" +
                            "<input rows=\"6\" cols=\"150\" name=\"ingredient[]\" value=\"\" class=\"form-recipe-input margin-bottom-10\" id=\"input_ingredient\">\n" +
                        "</div>\n" +
                        "<div class=\"js-remove-ingredient\"><img class=\"remove-icon\" src=\"../../images/svg/cross.svg\" alt=\"delete icon\"></div>\n" +
                    "</div>\n" +
                "</div>\n" +
            "</div>");
    });

    //remove ingredients

    // $('.js-remove-ingredient').click(function() {
    //     $(this).parent().remove();
    // })
    $('.js-wrapper-ingredients-input').on('click', 'div.js-remove-ingredient', function() {
        $(this).parent().parent().remove();
    });


    // add step input field

    var count = 1;

    // $('.add-step').click(function() {
    //     count+=1;
    //     $('.js-wrapper-steps-input').append("<div class=\"wrapper-steps\">\n" +
    //         "<div class=\"steps-count\">" + count + "</div>\n" +
    //         "<input rows=\"6\" cols=\"150\" name=\"steps[]\" value=\"\" class=\"form-recipe-input margin-bottom-10\" id=\"input_steps\">\n" +
    //         "    </div>");
    // });

    $('.add-step').click(function() {
        count+=1;
        $('.js-wrapper-steps-input').append("<div class=\"wrapper-steps\">\n" +
            "<div>\n" +
                "<div class=\"steps-count\">" + count + "</div>\n" +
                "<div class=\"input-flex\">\n" +
                    "<input rows=\"6\" cols=\"150\" name=\"steps[]\" value=\"\" class=\"form-recipe-input margin-bottom-10\" id=\"input_steps\">\n" +
                    "<div class=\"js-remove-step\"><img class=\"remove-icon\" src=\"../../images/svg/cross.svg\" alt=\"delete icon\"></div>\n" +
                "</div>\n" +
            "</div>\n" +
        "</div>");
    });

    //remove step
    $('.js-wrapper-steps-input').on('click', 'div.js-remove-step', function() {
        $(this).parent().parent().parent().remove();
    });




    var category ="";
    var allergens = [];


    //filter recipe allergens


    $('.tryAllergen').click(function() {
        $('.tryAllergen').each(function() {
            if($(this).is(":checked")) {
                //add allergen only if it's not already in array
                if(allergens.indexOf($(this).val()) < 0) {
                    allergens.push($(this).val());
                    $(this).parent().addClass('active');
                }

            } else {
                $(this).parent().removeClass('active');
                const index = allergens.indexOf($(this).val());
                //remove unchecked items from array
                if (index > -1) {
                    allergens.splice(index, 1);
                }
            }
        });

        // console.log(category);
        // console.log(allergens);

        $.ajax({
            type:'GET',
            dataType:'html',
            url:'',
            data:  "allergens=" + allergens.toString() + "&" + "cat=" + category,
            success: function (data) {
                var result = $('<div />').append(data).find('.recipe-cards-wrapper-flex').html();
                $('.recipe-cards-wrapper-flex').html(result);
            },
            // success: function(response) {
            //     console.log(response);
            //     return;
            //     $('#updateDiv').append(response);
            // }
        });
    })


    $('.js-categories-wrapper').children().first().addClass('active');

    //filter recipe category
    $('.js-select-category').click(function() {

        $('.js-select-category').each(function() {
            if($(this).is(":checked")) {
                category = $(this).val();
                $(this).parent().addClass('active');
            } else {
                $(this).parent().removeClass('active');
            }
        });

        var finalcategories = category;
        console.log(finalcategories);
        console.log(allergens);

        $.ajax({
            type:'GET',
            dataType:'html',
            url:'',
            data: "cat=" + finalcategories + "&" + "allergens=" + allergens.toString(),
            success: function (data) {
                var result = $('<div />').append(data).find('.recipe-cards-wrapper-flex').html();
                $('.recipe-cards-wrapper-flex').html(result);
            },
            // success: function(response) {
            //     console.log(response);
            //     $('#updateDiv').append(response);
            // }
        });
    })


    $('.js-list-steps').hide();
    //show ingredients (mobile)
    $('#js-tab-ingr').click(function() {
        $(this).parent().children().removeClass('recipe-tab-active');
        $('.js-list-steps').hide();
        $('.js-list-ingr').show();

        $(this).addClass('recipe-tab-active');
    });

    //show steps (mobile)

    $('#js-tab-steps').click(function() {
        $(this).parent().children().removeClass('recipe-tab-active');
        $('.js-list-ingr').hide();
        $('.js-list-steps').show();
        $(this).addClass('recipe-tab-active');
    });

    //edit allergens


        $('.allergen-btn-editform').each(function() {
                $('.allergen-btn-editform').click(function() {
                if($(this).is(":checked")) {
                    $(this).parent().addClass('active');
                } else {
                    $(this).parent().removeClass('active');
                }

                    // if($(this).find('input').is(":checked")) {
                    //     $(this).removeClass('active');
                    //     // $(this).find('input').attr('checked', 'checked');
                    // } else {
                    //     $(this).addClass('active');
                    //     $(this).find('input').attr('checked', 'checked');
                    // }
            });
        })


    //form validation for registration page

    $("form[name='registration']").validate({

        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },

        messages: {
            name: "Please enter your name",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            email: "Please enter a valid email address"
        },

        submitHandler: function(form) {
            form.submit();
        }
    });

    //form validation for recipeform

    $("form[name='recipe-form']").validate({

        rules: {
            title: {
                required: true,
                maxlength: 35
            },
            description: {
                required: true,
                maxlength: 150
            },
            'ingredient[]': {
                required: true
            },
            'steps[]': {
                required: true
            },
            category: "required",
        },

        messages: {
            title: "The title is too long or empty",
            description: "The description is too long or empty",
            'ingredient[]': "Please enter an ingredient",
            'steps[]': "Please enter a step",
            category: "Please select a category for your recipe"
        },
        errorPlacement: function(error, element) {
            if ( element.is(":radio") ) {
                error.prependTo( element.parent().parent() );
            }
            else { // This is the default behavior of the script for all fields
                error.insertAfter( element );
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });

});


// $(window).on("load", function() {
//     $('.spinner').fadeOut('slow');
// });


