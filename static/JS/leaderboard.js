$('.page2').hide()


console.log("moses")
$('.butt_on2').on('click', function(e) {
    $('.page1').hide()
    $('.page2').show()
})

$('.butt_on1').on('click', function(e) {
    $('.page2').hide()
    $('.page1').show()
})

async function fetchData(){
    const response=await fetch("/api/forum_runquery")
    const result = await response.json()
    
    for(object of result.data){
        let element = '<ul class="isinya"><li>1.</li><li>'+object["COUNT(trainee_number)"]+'</li><li>'+object["trainee_number"]+'</li></ul>'  
        let wrapper = document.createElement('div')
        wrapper.innerHTML=element
        wrapper.classList.add("page1")
        wrapper.classList.add("baris1")
        document.getElementById('parent').appendChild(wrapper);
        console.log(element)
    }
}

fetchData()
