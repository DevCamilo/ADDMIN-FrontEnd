import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: any;
  @Input() info: any;
  constructor() {
    this.content = {
      ingreso: "Ingresar",
      contacto: "Contacto",
      info: "Información",
      hacer: "¿QUÉ HACEMOS?",
      soporte: "Soporte",
      soporteCon: "Con ADDMIN podrás contar con un soporte calificado las 24 horas de los 7 días de la semana para responder tus dudas y solucionar tus problemas de forma eficiente.",
      accesibilidad: "Accesibilidad",
      accesibilidadCon: "Ten acceso a nuestro sistema desde cualquier dispositivo, gracias al diseño adaptativo de nuestra página podras interactuar con ella sin importar el dispositivo en el que te encuentres.",
      reservas: "Reservas",
      reservasCon: "Con nuestro sistema de agendación de reservas podrás tener el control eficiente de todas las áreas comunes de tu conjunto residencial y el estado de las mismas en tiempo real.",
      seguridad: "Seguridad",
      seguridadCon: "Con nuestro sistema tendrás la plena seguridad y confianza que se implementará los más altos estandares en el tratamiento de información de tus residentes.",
      pagos: "Pagos",
      pagosCon: "Con ADDMIN tedrás acceso a un sistema de control eficiente para los pagos y tener pleno conocimiento de los residentes morosos y los pagos efectuados.",
      eficiencia: "Eficiencia",
      eficienciaCon: "Reduce los tiempos de espera y agiliza los procesos en cada área de tu conjunto residencial con un sistema óptimo para el control y la gestión de los mismos.",
      mision: "Misión",
      misionCon: "Somos una startup innovadora de desarrollo de software enfocado al sector urbanado y especializada en la gestión administrativa de propiedad horizontal. Con gran pasión por nuevas tecnologías y con grandes ideas para transformar el mundo.",
      vision: "Visión",
      visionCon: "Nos proyectamos a ser una de las empresas líderes en el mercado del software para propiedades horizonatales en la región para brindar soluciones óptimas y ágiles a las necesidades variantes del mercado y así convertirnos en la mejor oferta.",
      galeria: "GALERÍA",
      eslogan: "Conectándote con TÚ comunidad.",
      siguenos: "Síguenos:"
    }
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.parallax').parallax();
      $('.sidenav').sidenav();
      $('.tooltipped').tooltip();
    });
  }

  translate(num: Number) {
    console.log(num);
    if (num == 1) {
      this.content = {
        ingreso: "Loggin",
        contacto: "Contact",
        info: "Info",
        hacer: "WHAT DO WE DO?",
        soporte: "Support",
        soporteCon: "With ADDMIN you can count on qualified support 24 hours a day to answer your questions and solve your problems efficiently.",
        accesibilidad: "Accessibility",
        accesibilidadCon: "Have access to our system from any device, thanks to the adaptive design of our page you can interact with it regardless of the device you are on.",
        reservas: "Reservations",
        reservasCon: "With our booking scheduling system you can have efficient control of all the common areas of your residential complex and the status of them in real time.",
        seguridad: "Security",
        seguridadCon: "With our system you will have the full security and confidence that will be implemented the highest standards in the treatment of information of your residents.",
        pagos: "Payments",
        pagosCon: "With ADMIN you will have access to an efficient control system for payments and have full knowledge of the delinquent residents and the payments made.",
        eficiencia: "Efficiency",
        eficienciaCon: "Reduce waiting times and streamline processes in each area of your residential complex with an optimal system for the control and management of them.",
        mision: "Mission",
        misionCon: "We are an innovative startup of software development focused on the urban sector and specialized in the management of horizontal property. With great passion for new technologies and great ideas to transform the world.",
        vision: "Vision",
        visionCon: "We project ourselves to a company of companies in the market of software for properties in the region to offer optimal and agile solutions to the needs of the market and thus turn into the best offer.",
        galeria: "GALLERY",
        eslogan: "Connecting with YOUR community.",
        siguenos: "Follow us:"
      }
    } else {
      this.content = {
        ingreso: "Ingresar",
        contacto: "Contacto",
        info: "Información",
        hacer: "¿QUÉ HACEMOS?",
        soporte: "Soporte",
        soporteCon: "Con ADDMIN podrás contar con un soporte calificado las 24 horas de los 7 días de la semana para responder tus dudas y solucionar tus problemas de forma eficiente.",
        accesibilidad: "Accesibilidad",
        accesibilidadCon: "Ten acceso a nuestro sistema desde cualquier dispositivo, gracias al diseño adaptativo de nuestra página podras interactuar con ella sin importar el dispositivo en el que te encuentres.",
        reservas: "Reservas",
        reservasCon: "Con nuestro sistema de agendación de reservas podrás tener el control eficiente de todas las áreas comunes de tu conjunto residencial y el estado de las mismas en tiempo real.",
        seguridad: "Seguridad",
        seguridadCon: "Con nuestro sistema tendrás la plena seguridad y confianza que se implementará los más altos estandares en el tratamiento de información de tus residentes.",
        pagos: "Pagos",
        pagosCon: "Con ADDMIN tedrás acceso a un sistema de control eficiente para los pagos y tener pleno conocimiento de los residentes morosos y los pagos efectuados.",
        eficiencia: "Eficiencia",
        eficienciaCon: "Reduce los tiempos de espera y agiliza los procesos en cada área de tu conjunto residencial con un sistema óptimo para el control y la gestión de los mismos.",
        mision: "Misión",
        misionCon: "Somos una startup innovadora de desarrollo de software enfocado al sector urbanado y especializada en la gestión administrativa de propiedad horizontal. Con gran pasión por nuevas tecnologías y con grandes ideas para transformar el mundo.",
        vision: "Visión",
        visionCon: "Nos proyectamos a ser una de las empresas líderes en el mercado del software para propiedades horizonatales en la región para brindar soluciones óptimas y ágiles a las necesidades variantes del mercado y así convertirnos en la mejor oferta.",
        galeria: "GALERÍA",
        eslogan: "Conectándote con TÚ comunidad.",
        siguenos: "Síguenos:"
      }
    }

  }

}
