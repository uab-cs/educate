function initToggle(element){
    var $toggle = element;
    if( $toggle.length > 0 ) {
        $toggle.each( function(){
            var element = $(this),
                elementState = element.attr('data-state');

            if( elementState !== 'open' ){
                element.children('.togglec').hide();
            } else {
                element.children('.togglet').addClass("toggleta");
            }

            element.children('.togglet').click(function(){
                $(this).toggleClass('toggleta').next('.togglec').slideToggle(300);
                return true;
            });
        });
    }
}
