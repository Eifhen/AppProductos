

export class FooterComponent{

    constructor(){}

    CreateFooter(){

        const footer_id = document.querySelector("#footer");
        const date = new Date();
        const html = `
            <div class="p-4 bg-dark text-white d-flex align-items-center justify-content-center">
                <h6 class="text-center">
                    Gabriel Jiménez Vásquez
                    </br>
                    <span>${date}</span>
                </h6>
            </div>
        `;

        footer_id.innerHTML = html;
    }

}