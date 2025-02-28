let nextId
$(document).ready(function(){
    $("#dialog").dialog
        ({
            autoOpen: false,
            modal: true,
            title: "Confirm Submission"
        })
    document.getElementById("submitBP").onclick = async function(){
        let reponse = await fetch('http://localhost:3000/publications');
        let publication = await reponse.json()
        nextId = publication.length + 1;
        $("#dialog").dialog("open");

        $("#dialog").dialog
        ({
            autoOpen: false,
            modal: true,
            title: "Confirm Submission",
            buttons: 
            {
                "Yes": function() 
                {
                    const reponse2 = fetch ("http://localhost:3000/publications",
                    {
                        method: "POST",
                        body: JSON.stringify
                        ({
                            "id" : nextId,
                            "title" : document.getElementById("formTitre").value,
                            "content" : document.getElementById("formContenu").value,
                            "auteur" : document.getElementById("formAuteur").value,
                            "date-publication": new Date().toISOString().split('T')[0]
                        })
                    })
                    .then(console.log(reponse))
                    nextId++;
                    window.location.href = "/Labo/index.html";
                    $(this).dialog("close");
                },
                "No": function() 
                {
                    $(this).dialog("close");
                }
            }
        });
    }
})
