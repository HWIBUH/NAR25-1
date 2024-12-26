$(document).ready(function() {
    $('.trainer').hide();

    $('.trainee-btn').on('click', (e) => {
        $('.trainer').fadeOut();
        $('.trainee').fadeIn();
    });

    $('.trainer-btn').on('click', (e) => {
        $('.trainee').fadeOut();
        $('.trainer').fadeIn();
    });

    traineeData.forEach((e, i) => {
        let img = $('<img>').attr('src', e.trainee_photo).attr('alt', e.trainee_number);
        let imgElement = $('<div>').attr('class', 'img-container')
        imgElement.append(img)

        let details = $('<div>').attr('class', 'details');

        let tNumber = $('<p>').text(e.trainee_number);
        let traineeName = $('<p>').text(e.trainee_nama);
        let traineeMajor = $('<p>').text(e.trainee_major);
        let binusian = $('<p>').text(e.trainee_binusian);

        details.append(tNumber);
        details.append(traineeName);
        details.append(traineeMajor);
        details.append(binusian);

        let container = $('<div>').attr('class', 'grid-item');

        if (i % 2 === 0) {
            container.addClass('green');
        } else {
            container.addClass('red');
        }

        container.append(imgElement, details);
        $('.trainee').append(container);
    });
});