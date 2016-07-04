window.onload = function() {
    var tags = riot.mount('*');

    var submit = document.querySelector('#submit');

    submit.addEventListener('click', function() {
        activateModal();
        var url = document.querySelector('#url').value;
        var email = document.querySelector('#email').value;

        get('/download/' + btoa(url).split('/').join('*') + '/' + email, function(res) {
            deactivateModal();
            console.log('Res', res);
            document.querySelector('#url').value = '';
            document.querySelector('#email').value = '';
        });
    });



}

function get(url, cb) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                cb(xmlhttp.response);
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
