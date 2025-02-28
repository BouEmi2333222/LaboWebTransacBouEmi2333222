let json
const container = document.getElementById("post-container")

function createCard(element){
    var col = document.createElement("div")
    col.setAttribute("class","col-md-4 col-sm-12 col-12 mb-3")
    var card = document.createElement("div")
    card.setAttribute("class","card w-200 w-sm-500")
    col.appendChild(card)
     var img = document.createElement("img")
     img.setAttribute("class","card-img-top")
     img.setAttribute("src","Image/242.jpg")
     img.setAttribute("style","width: 100%; height:  200px;")
     var divbody = document.createElement("div")
     divbody.setAttribute("class","card-body")
     var h5 = document.createElement("h5")
     h5.setAttribute("class","card-title border border-3 p-2 rounded border-info")
     h5.textContent = element.title
     var p = document.createElement("p")
     p.setAttribute("class","card-text")
     p.textContent = (element.content.substring(0,30) + (element.content.length > 30 ? '...' : ''))
     card.appendChild(img)
     card.appendChild(divbody)
     divbody.appendChild(h5)
     divbody.appendChild(p)
    container.append(col)
}

async function newStyleWithAwait(){
    try {
        const response = await fetch('http://localhost:3000/publications')
        json = await response.json()
    } catch (error) {
        console.log(error)
    }
    json.forEach(element => {
        createCard(element)
    });
}
newStyleWithAwait()