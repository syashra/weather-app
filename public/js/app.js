function fun(){
    event.preventDefault()
    const search=document.getElementById("inp").value 
    if(search==''){
        document.getElementById("forecast").innerText='Enter Location'
    }
    else{
    const url="/weather?address="+encodeURIComponent(search)
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById("forecast").innerText=data.error
        }
        else{
            document.getElementById("forecast").innerText=data.feels
            document.getElementById("location").innerText=data.location
        }
    })
})
    }
}