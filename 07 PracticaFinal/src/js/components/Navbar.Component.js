


export class NavbarComponent{
    
    constructor(){}

    CreateNavbar(){
        const nav_id = document.querySelector("#navbar");

        const html = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/introduction">Introduccion</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/formulario">Formulario</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/productos/listado">Productos</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
        `;

        nav_id.innerHTML = html;
    }

}