import { NavbarComponent } from '../components/Navbar.Component.js';
import { FooterComponent } from '../components/Footer.Component.js';



export const LoadLayout = () => {

    const navbar = new NavbarComponent();
    const footer = new FooterComponent();

    navbar.CreateNavbar();
    footer.CreateFooter();
}