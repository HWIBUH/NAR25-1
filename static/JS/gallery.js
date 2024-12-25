$('.trainer').hide()

$('.trainee-btn').on('click', (e)=>{
    $('.trainer').fadeOut()
    $('.trainee').fadeIn()
})

$('.trainer-btn').on('click', (e)=>{
    $('.trainee').fadeOut()
    $('.trainer').fadeIn()
})