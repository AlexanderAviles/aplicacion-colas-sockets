
// Referencias HTGML

const lblEscritorio = document.querySelector('h1'); 
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams( window.location.search);

divAlerta.style.display = 'none'

if( !searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerHTML = escritorio;
const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', {escritorio}, ( {ok, ticket} ) => {

        if( !ok ){
            lblTicket.innerText = 'Nadie.'
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = 'Ticket ' + ticket.numero;


    });
    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});
socket.on('tickets-pendientes', (ticketsPendientes) => {
    if( ticketsPendientes === 0 ){
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.style.display = '';
        lblPendientes.innerHTML = ticketsPendientes;
    }
});

socket.on('ultimo-ticket', (ultimo) => {
    // lblNuevoTicket.innerHTML = "Ticket " + ultimo;
});