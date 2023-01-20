holeAbos();

// hole alle Abos
function holeAbos(){

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://375639-3.web.fhgr.ch/php/holeAbosPublic.php",
    {
        body: formData,
        method: "post",
    })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Angebote konnten nicht geladen werden. Versuchen Sie es gerne später nocheinmal.');

            }

        })
        .then((data) => {

            AbosAnzeigen(data);

        })

}

// Abos ins HTML schreiben
function AbosAnzeigen(data) {

    data.forEach(abo => {
        
        let aboContainer = document.createElement("div");
        aboContainer.innerHTML =

            '<div class="abo">' +
            '<h2>' + abo.spiel + '</h2>' +
            '<img class="abo-image" src="' + abo.bild + '">' +
            '<p><b>Datum:</b> ' + abo.datum + '</p>' +
            '<p><b>Beschreibung:</b> ' + abo.beschreibung + '</p>' +
            '<p><b>Bereitgestellt von:</b> ' + abo.name + '</p>' +
            '<b>Email:</b> <a target="_blank" href="mailto:'+ abo.email + '">' + abo.email + '</a>' +
            '<p><b>Dafür möchte ich gerne: </b><span id="Abo-' + abo.ID + '">  </span></p>'
            + '</div>';

        document.getElementById("liste-abo").appendChild(aboContainer);

        holeGegenleistungenVonAboPublic(abo.ID);

    });

}

// Ausgewählte Gegenleistungen von Abo holen
function holeGegenleistungenVonAboPublic(id) {

    let formData = new FormData();
    formData.append('aboID', id);

    fetch("https://375639-3.web.fhgr.ch/php/holeGegenleistungenVonAboPublic.php",
    {
        body: formData,
        method: "post",
    })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Gegenleistungen der Angebote konnte nicht geladen werden. Versuchen Sie es später nocheinmal.');

            }

        })
        .then((data) => {

            console.log(data);

            if (data.length > 0) {

                data.forEach(element => {

                    document.getElementById("Abo-" + id).innerHTML += element.name + ' ';

                });

            }

        })

}

