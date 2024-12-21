const usuarios = [
    {user:'cliente1', password: '1234'}, 
    {user:'cliente2', password: 'contraseña'}, 
    {user:'cliente3', password: '1111'}
];



function verificar(){
    let nombre = document.getElementById("username").value;
    let pass = document.getElementById("password");

    let cuenta = usuarios.find(usuario => usuario.user === nombre.value && usuario.password === pass.value);

    if(cuenta){
        alert(`Bienvenido a Mistica Pura, ${cuenta.user}`);
        window.location.href = "index.html";
        sessionStorage.setItem("activo", true);
    }else{
        alert('Error: usuario o contraseña incorrectos! vuelva a intentar');
    }
  
}


let btn = document.getElementById("btnIngreso");
btn.addEventListener("click", verificar());
