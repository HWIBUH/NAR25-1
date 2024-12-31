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
    let c=1
    console.log(result.data)
    for(object of result.data){
        c++
        let element = '<ul class="isinya"><li>'+(c-1)+'.</li><li>'+object["COUNT(trainee_number)"]+'</li><li>'+object["trainee_number"]+'</li></ul>'  
        
        
        if(object["trainee_number"]==""){
            continue
            // element = '<ul class="isinya"><li>'+(c-1)+'.</li><li>'+object["COUNT(trainee_number)"]+'</li><li>UNANSWERED</li></ul>'  
        }
        
        let wrapper = document.createElement('div')
        wrapper.classList.add("page1")
        if(c%2==0){
            wrapper.classList.add("baris1")
        }else{
            wrapper.classList.add("baris2")
        }
        
        wrapper.innerHTML=element
        document.getElementById('parent').appendChild(wrapper);
        console.log(element)
    }
}

fetchData()
