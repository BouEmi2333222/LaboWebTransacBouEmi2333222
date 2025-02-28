async function getPublication(id){
    try {
        const response = await fetch(`http://localhost:3000/publications?id=${id}`)
        
        const json = await response.json()
        
        let publication = json[0]
        return publication
    } catch (error) {
        console.log(error)
    }
}

async function getCommentaires(id){
    try {
        const response2 = await fetch(`http://localhost:3000/commentaires?id-publication=${id}`)
        const commentaires = await response2.json()
        return commentaires
    } catch (error){
        console.log(error)
    }
    
}

function buildCommentaire(commentaires){
    const div = document.getElementById("commentairesDiv")
    let html
    commentaires.forEach(element => {
        html += `<div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-person" viewBox="0 0 16 16">
        <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
        <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
      </svg>
      <div>
        <p>${element.content}</p>
      </div>
      </div>`
      div.innerHTML = html
    });
}

function buildPost(publication){
    var titre = document.getElementById("blogtitre")
    var contenu = document.getElementById("blogcontent")
    titre.textContent = publication.title
    contenu.textContent = publication.content

}

async function queryParameters(){
    const params = new URLSearchParams(window.location.search)
    let id = params.get('id')
    let publication = await getPublication(id)
    let commentaires = await getCommentaires(id)
    buildPost(publication)
    buildCommentaire(commentaires)
    return id
}




let nextId

$(document).ready(async function(){
    let reponse = await fetch('http://localhost:3000/commentaires');
    let commentaires = await reponse.json()
    nextId = commentaires.length + 1;
    const postID = queryParameters()
    $("#dialog").dialog
        ({
            autoOpen: false,
            modal: true,
            title: "Confirm Submission"
        })
        document.getElementById("submitComment").onclick = async function()
        {
            const reponse = fetch ("http://localhost:3000/commentaires",
            {
                method: "POST",
                body: JSON.stringify
                ({
                    "id" : nextId,
                    "content" : document.getElementById("contenuCommentaire").value,
                    "date-publication": new Date().toISOString().split('T')[0]
                })
            })
            .then(console.log(reponse))
            nextId++;
        }
    }
)