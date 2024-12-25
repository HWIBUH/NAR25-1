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

let trainee_list = [
    'T186', 'T191', 'T192' ,'T195',
    'T207', 'T212', 'T213', 'T217',
    'T228', 'T230', 'T237', 'T241',
    'T252', 'T297', 'T312', 'T330',
    'T355'
]

let i = 0;
trainee_list.forEach((e)=>{
    filename = e + ".png";
    let imgElement = $('<img>').attr('src', baseUrl + 'assets/' + filename).attr('alt', e)
    let details = $('<div>').attr('class', 'details')

    let tNumber = $('<p>').text(e)
    let traineeName = $('<p>').text('test')
    let traineeMajor = $('<p>').text('major test')
    let binusian = $('<p>').text('test binusian')

    details.add(tNumber).add(traineeName).add(traineeMajor).add(binusian)

    let container = $('<div>').attr('class', 'grid-item')

    if(i % 2 === 0){
        container.addClass('green')
    }else{
        container.addClass('red')
    }
    i++


    $('.trainee').add(container)
});