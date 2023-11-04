document.getElementById("formulario").addEventListener("submit", crear);

function crear(e) {
    let titulo = document.getElementById("titulo").value;
    let resumen = document.getElementById("resumen").value;
    let reparto = document.getElementById("reparto").value;

    let pelicula = {
        titulo,
        resumen,
        reparto
    }

    if (localStorage.getItem("Peliculas") == null) {
        let peliculas = []
        peliculas.push(pelicula)
        localStorage.setItem("Peliculas", JSON.stringify(peliculas))
    } else {
        let peliculas = JSON.parse(localStorage.getItem("Peliculas"))
        peliculas.push(pelicula)
        localStorage.setItem("Peliculas", JSON.stringify(peliculas))
    }

    leer();
    document.getElementById("formulario").reset();
    console.log("Película guardada con éxito")
    e.preventDefault()
}

function leer(){
    let peliculas = JSON.parse(localStorage.getItem("Peliculas"));
    document.getElementById("tbody").innerHTML = ""
    for(let i=0; i < peliculas.length; i++){
        let titulo = peliculas[i].titulo
        let resumen = peliculas[i].resumen
        let reparto = peliculas[i].reparto

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${titulo}</td>
            <td>${resumen}</td>
            <td>${reparto}</td>
            <td><button onclick = "eliminar('${titulo}')" class ="btn-danger"> Eliminar</button></td>
            <td><button onclick = "editar('${titulo}')" class ="btn-success"> Editar</button></td>
        </tr>
        `
    }
}

function editar(titulo){
    let peliculas = JSON.parse(localStorage.getItem("Peliculas"));
    for(let i= 0; i<peliculas.length; i++){
        if(peliculas[i].titulo === titulo){
            document.getElementById("body").innerHTML = `
            
            <div class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h2>Editar Película</h2>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <input type="text" id="newtitulo" class="form-control my-3" placeholder="${peliculas[i].titulo}">
                            </div>
                            <div class="form-group">
                                <textarea id="newresumen" class="form-control my-3" placeholder="${peliculas[i].resumen}"></textarea>
                            </div>
                            <div class="form-group">
                                <input type="text" id="newreparto" class="form-control my-3" placeholder="${peliculas[i].reparto}">
                            </div>
                            <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
                            <button class="btn btn-primary" onclick="Vista Principal()">Cancelar</button>
                        </form>

                    </div>
                </div>

            `
        }
    }
}

function actualizar(i){
    let peliculas = JSON.parse(localStorage.getItem("Peliculas"));
    peliculas[i].titulo = document.getElementById("newtitulo").value;
    peliculas[i].resumen = document.getElementById("newresumen").value;
    peliculas[i].reparto = document.getElementById("newreparto").value;

        localStorage.setItem("Peliculas", JSON.stringify(peliculas));
        vistaPrincipal()

}

function eliminar(titulo){
    let peliculas = JSON.parse(localStorage.getItem("Peliculas"));
    for(let i=0; i < peliculas.length; i++){
        if(peliculas[i].titulo === titulo){
            peliculas.splice(i,1);

        }
    }

    localStorage.setItem("Peliculas", JSON.stringify(peliculas));
    leer();

}

function vistaPrincipal(){
    document.getElementById("body").innerHTML = `
    
    <div class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h2>Agregar Película</h2>
                    </div>
                    <div class="card-body">
                        <form id="formulario">
                            <div class="form-group">
                                <input type="text" id="titulo" class="form-control my-3" placeholder="Título">
                            </div>
                            <div class="form-group">
                                <textarea id="resumen" class="form-control my-3" placeholder="Resumen"></textarea>
                            </div>
                            <div class="form-group">
                                <input type="text" id="reparto" class="form-control my-3" placeholder="Reparto">
                            </div>
                            <button type="submit" class="btn btn-primary">Agregar</button>
                        </form>

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <table class="table caption-top bg-light">
                    <thead>
                      <tr>
                        <th scope="col">Título</th>
                        <th scope="col">Resumen</th>
                        <th scope="col">Reparto</th>
                      </tr>
                    </thead>
                    <tbody id="tbody">
                      <tr>
                        <td>Tick, Tick... Boom!</td>
                        <td>Un joven y prometedor compositor de teatro se sumerge en el amor, la amistad y las presiones de la vida como artista en la ciudad de Nueva York.
                        </td>
                        <td>Lin-Manuel Miranda, Andrew Garfield, Alexandra Shipp, Robin de Jesús, Vanessa Hudgens</td>
                      </tr>
                    </tbody>
                  </table>
            </div>
        </div>
    
    `
}

leer();

