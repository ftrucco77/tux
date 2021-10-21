// current year
let currentYear = document.getElementById("current-year");
var yearNow = new Date();
currentYear.innerText = yearNow.getFullYear();


$(document).ready(function() {

    var errores = [
        '',
        'Por favor, ingresa tu nombre.',
        'Por favor, ingresa tu apellido.',
        'Por favor, ingresa tu email.',
        'Por favor, ingresa un email válido.',
        'Por favor, ingresa un email corporativo.',
        'Por favor, ingresa tu teléfono.',
        'Por favor, ingresa un teléfono válido (solo se aceptan números y los siguientes caracteres:<em>[]()+-</em>).',
        'Por favor, ingresa el nombre de tu empresa.',
        'Por favor, ingresa tu cargo.',
        'Por favor, ingresa tu función.',
        'Por favor, ingresa tu país.',
        'Por favor, acepta los términos.'
    ];

    $('#pardot-form').submit(function(event) {
        event.preventDefault();
    	console.log('sub');

        var t        = $('#enviob');
            carga    = t.children();
            form     = $('#pardot-form');
            alertErr = $('#alert-error');
            alertOk  = $('#alert-success');
            errTxt   = '';
             alertErr.text('');
        //alertErr.addClass('hidden').children('.alert-text').html('');
        // valida
        var err = [];
        // - nombre
        var campo = $('#nombre'),
            campoV = $.trim(campo.val());
        if(campoV == '')
            err.push(1);
        // - apellido
        var campo = $('#apellido'),
            campoV = $.trim(campo.val());
        if(campoV == '')
            err.push(2);
        // - email
        var campo = $('#email'),
            campoV = $.trim(campo.val());
        if(campoV == '')
            err.push(3);
        else if(!esMail(campoV))
            err.push(4);
        else if(esMailCorpo(campoV))
            err.push(5);
        // - telefono
        var campo = $('#telefono'),
            campoV = $.trim(campo.val());
            campoV = campoV.replace(/\s/g, '');
        campo.val(campoV);
        if(campoV == '')
            err.push(6);
        else if(!esTel(campoV))
            err.push(7);
        // - empresa
        var campo = $('#empresa'),
            campoV = $.trim(campo.val());
        if(campoV == '')
            err.push(8);
        // - cargo
        var campo = $('#cargo'),
            campoV = $.trim(campo.val());
        if(campoV == '')
            err.push(9);
        // - cargo
        var campo = $('#funcion'),
            campoV = $.trim(campo.val());
        if(campoV == '')
            err.push(10);

        var campo = $('#pais'),
            campoV = $.trim(campo.val());
        if(campoV == '')
            err.push(11);

        var campo = $('#acepto');
        if(!campo.is(':checked'))
            err.push(12);

        console.log(err);
        if(err.length) {
            for(var i = 0; i < err.length; i++)
                alertErr.append(errores[err[i]]+'<br>');

           alertErr.show();
            return false;
        }

           alertErr.hide();

        t.addClass('disabled').prop('disabled', true);
      //  carga.removeClass('hidden');
        $.post('form.php?'+Math.random(), form.serialize(), function(data) {
                form.hide();
            t.removeClass('disabled').prop('disabled', false);
            if(data.estado === 1) {
                window.location.href = 'exito.html';
                return false;
            }
            else if(data.estado === -1){
            	alertErr.text('Error de envío');
               	alertErr.show();
               }

         //   carga.addClass('hidden');
        }, 'json');
    });


});

function esMail(txt) {
    var exp = /^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]+)$/;
    if(!exp.test(txt))
        return false;
    return true;
}
function esMailCorpo(txt) {
    var dominios = ['gmail', 'hotmail', 'live', 'outlook', 'yahoo', 'zoho', 'mail', 'gmx', 'newton', 'tutanota', 'icloud', 'inbox', 'aol', 'comcast', 'msn', 'sbcglobal'];
    for (var i = 0; i < dominios.length; i++) {
        if(txt.indexOf('@'+dominios[i]) > 0)
            return true;
    }
    return false;
}
function esTel(txt) {
    var exp = /^[0-9\s\-\(\)\[\]\+]{6,18}$/;
    if(!exp.test(txt))
        return false;
    return true;
}
