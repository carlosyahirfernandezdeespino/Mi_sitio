document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    var users = [
        {
            nombre: 'Carlos',
            apellido: 'Fernandez',
            correo: 'carlos@goes.com',
            username: 'Carlos_Fernandez',
            password: 'Fecb6511denny',
            telefono: '5584823098',
            edad:16

        },
        {
            nombre: 'Ivan',
            apellido: 'Mercado',
            correo: 'Ivan@goes.com',
            username: 'Ivan_Mercado',
            password: 'Ivan708090',
            telefono: '5577580671',
            edad:17

        },
        {
            nombre: 'Guadalupe',
            apellido: 'Gutierrez',
            correo: 'lupencia@goes.com',
            username: 'Guadalupe_Gutierrez',
            password: 'lupencia251013',
            telefono: '5581495628',
            edad:17

        },
        {
            nombre: 'Camila',
            apellido: 'Ortega',
            correo: 'camila@goes.com',
            username: 'Camila_ortega',
            password: 'camila251013',
            telefono: '5547889730',
            edad:17

        },
        {
            nombre: 'Juan',
            apellido: 'Elizalde',
            correo: 'Juan@goes.com',
            username: 'Juan_Elizalde',
            password: 'juan251013',
            telefono: '5517485121',
            edad:17

        }
    ];
    var validUser = users.find(user => user.username === username && user.password === password);
    if(validUser){
        localStorage.setItem('loggedInUser', JSON.stringify(validUser));
        window.location.href = 'carrito.html';
    }
    else{
        document.getElementById('mensajeError').innerHTML = 'Nombre de Usuario o contraseña incorrectos';
    }
});