$('.trainer').hide()

$('.trainee-btn').on('click', (e)=>{
    $('.trainer').fadeOut()
    $('.trainee').fadeIn()
})

$('.trainer-btn').on('click', (e)=>{
    $('.trainee').fadeOut()
    $('.trainer').fadeIn()
})

//ceritanya smua namanya by T number

trainee_list = [
    'T186', 'T191', 'T195',
]