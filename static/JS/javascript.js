$('.page2').hide()



$('.butt_on2').on('click', function(e) {
    $('.page1').hide()
    $('.page2').show()
})

$('.butt_on1').on('click', function(e) {
    $('.page2').hide()
    $('.page1').show()
})