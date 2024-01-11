<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <title>Bienvenido a Laboratorios Plexus</title>
  </head>
  <NavbarComponentVue />
  <body>
    <div class="background-container">
      <img src="../assets/bg-plexus.jpg" alt="" />
    </div>
    <div class="services">
      <main class="form-signin">
        <h1 class="h3">REGISTRO NUEVO PACIENTE</h1>

        <div id="form">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Raul Fernández"
              required
            />
            <label for="floatingInput">Nombre Completo</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingPassword"
              placeholder="6787645"
              required
            />
            <label for="floatingPassword">Carnet de Identidad</label>
          </div>

          <button class="w-100 btn btn-lg" type="submit">
            Registro Regular
          </button>
          <button
            class="w-100 btn btn-lg"
            type="submit"
            style="margin-top: 1vh"
          >
            Registro Preferencial
          </button>
        </div>
        <p class="copyright">
          Todos los derechos reservados &copy; Laboratiorios Plexus 2024
        </p>
      </main>
    </div>
  </body>
  <div>
    <!--<SuccessfulModalVue :visible="modalVisible" @cerrar-modal="cerrarModal" />
    <ErrorModal :visible="modalErrorVisible" @cerrar-modal="cerrarModal" />
    <StateModal :visible="modalStateVisible" @cerrar-modal="cerrarStateModal" />-->
  </div>
  <!--<Loading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="fullPage"
  />-->
</template>

<script>
import NavbarComponentVue from "@/components/NavbarComponent.vue";
export default {
  setup() {
    return {};
  },
  components: {
    NavbarComponentVue,
  },
  data() {
    return {};
  },
};
/**
import SuccessfulModalVue from "@/components/modals/SuccessfulModal.vue";
import ErrorModal from "@/components/modals/ErrorModal.vue";
import StateModal from "@/components/modals/StateModal.vue";
import { usePersonasStore } from "@/stores/personasStore";
import { useFichasStore } from "@/stores/fichasStore";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  setup() {
    const personasStore = usePersonasStore();
    const pacienteEncontrado = false;
    const fichasStore = useFichasStore();
    return {
      personasStore,
      pacienteEncontrado,
      fichasStore,
    };
  },
  components: {
    NavbarComponentVue,
    SuccessfulModalVue,
    ErrorModal,
    StateModal,
    Loading,
  },
  data() {
    return {
      ciInput: "",
      modalVisible: false,
      modalErrorVisible: false,
      modalStateVisible: false,
      botonVerificar: false,
      botonPatientFound: false,

      checkboxLaboratorio: false,
      checkboxMuestras: false,
      checkboxAtencionCliente: false,
      checkboxPrioritario: false,
      fichaObjeto: {
        idFicha: null,
        servicio: "",
        estado: "",
        fingreso: "",
        filamada: "",
        idPaciente: null,
        idPersonal: null,
      },
      isLoading: false,
      fullPage: true,
    };
  },

  methods: {
    async registrarFicha() {
      var stringServicio = null;
      this.isLoading = true;

      const idPersona = await this.personasStore.verificarExistenciaPaciente2(
        this.ciInput
      );

      const datosPersona = await this.personasStore.getPersona(idPersona);
      //console.log("Datos Persona: ", datosPersona);

      // Verify if the birthdate is greater than 60 years
      var fechaNacimiento = new Date(datosPersona.fechaNacimiento); // Convert to Date object
      //console.log("Fecha Nacimiento: ", fechaNacimiento);
      var edad = 0;

      // Check if fechaNacimiento is a valid Date object
      if (!isNaN(fechaNacimiento.getTime())) {
        var fechaActual = new Date();

        edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        var mes = fechaActual.getMonth() - fechaNacimiento.getMonth();

        if (
          mes < 0 ||
          (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())
        ) {
          edad--;
        }

        //console.log("Edad: ", edad);
      } else {
        console.error(
          "Invalid date string or unable to parse into a Date object"
        );
      }

      if (edad >= 60) {
        await this.registrarFichaPreferencial();
        return;
      }

      if (this.checkboxMuestras) {
        stringServicio = "Muestras Pendientes";
      }
      if (this.checkboxLaboratorio) {
        stringServicio = "Atención General";
      }

      this.fichaObjeto.estado = "Pendiente";

      this.fichaObjeto.idFicha = null;
      this.fichaObjeto.servicio = stringServicio;
      //this.fichaObjeto.estado = "Pendiente";

      this.fichaObjeto.fingreso = new Date().toISOString().slice(0, 19);
      this.fichaObjeto.fllamada = this.fichaObjeto.fingreso;

      this.fichaObjeto.idPaciente = idPersona;
      this.fichaObjeto.idPersonal = idPersona;

      //console.log("Ficha: ", this.fichaObjeto);

      const response = await this.fichasStore.createFicha(this.fichaObjeto);
      //console.log("Response: ", response);

      if ((response.data.code = "200")) {
        alert("Ficha Registrada con Exito");
        //this.personasStore.borrarStorage();
        window.location.reload();
      } else {
        alert("Error al registrar la ficha");
      }
      this.isLoading = false;
    },

    async registrarFichaPreferencial() {
      var stringServicio = null;
      this.isLoading = true;

      if (this.checkboxMuestras) {
        stringServicio = "Muestras Pendientes";
      }
      if (this.checkboxLaboratorio) {
        stringServicio = "Atención General";
      }
      this.fichaObjeto.estado = "Prioritario";

      this.fichaObjeto.idFicha = null;
      this.fichaObjeto.servicio = stringServicio;
      //this.fichaObjeto.estado = "Pendiente";

      this.fichaObjeto.fingreso = new Date().toISOString().slice(0, 19);
      this.fichaObjeto.fllamada = this.fichaObjeto.fingreso;

      const idPersona = await this.personasStore.verificarExistenciaPaciente2(
        this.ciInput
      );
      this.fichaObjeto.idPaciente = idPersona;
      this.fichaObjeto.idPersonal = idPersona;

      //console.log("Ficha: ", this.fichaObjeto);

      const response = await this.fichasStore.createFicha(this.fichaObjeto);
      //console.log("Response: ", response);

      if ((response.data.code = "200")) {
        alert("Ficha Preferencial Registrada con Exito");
        //this.personasStore.borrarStorage();
        //reload page withput router push
        window.location.reload();
      } else {
        alert("Error al registrar la ficha");
      }
      this.isLoading = false;
    },

    async verificarExistenciaPaciente() {
      try {
        //console.log("CI: ", this.ciInput);
        this.isLoading = true;

        const rol = await this.personasStore.verificarRolUsuario(this.ciInput);
        const idPersona = await this.personasStore.verificarExistenciaPaciente2(
          this.ciInput
        );
        //console.log("Rol: ", rol);
        if (rol == "recepcionista") {
          alert("Bienvenido Operador Plexus");
          this.$router.push({
            name: "table-fichas",
            params: { id: idPersona },
          });
        }

        this.pacienteEncontrado =
          await this.personasStore.verificarExistenciaPaciente(this.ciInput);
        //console.log("Paciente Encontrado: ", this.pacienteEncontrado);
        this.fichaObjeto.idPaciente = this.pacienteEncontrado.idPersona;

        if (this.pacienteEncontrado) {
          this.modalVisible = true;
          this.botonVerificar = true;
          this.botonPatientFound = true;
        } else {
          this.modalStateVisible = true;
          this.botonVerificar = true;
        }
      } catch (error) {
        this.modalErrorVisible = true;
        this.botonVerificar = true;
      }
      this.isLoading = false;
    },
    borrarDatos() {
      this.ciInput = "";
      this.modalVisible = false;
      this.modalErrorVisible = false;
    },
    cerrarStateModal() {
      this.modalStateVisible = false;
      this.$router.push({ name: "new-patient" });
    },
    cerrarModal() {
      this.modalVisible = false;
      this.modalErrorVisible = false;
    },
    registrarPaciente() {
      this.$router.push({ name: "new-patient" });
    },
  },
  async mounted() {
    this.isLoading = true;

    this.verificarPersona = await this.personasStore.getPersonas();
    //console.log("Personas: ", this.verificarPersona);
    this.ciInput = await this.personasStore.ci;
    //console.log("CI: ", this.ciInput);
    // Obtener y mostrar los datos de 'personaGuardada' desde el localStorage
    const personaGuardada = localStorage.getItem("personaGuardada");
  
    if (personaGuardada != null) {
      this.ciInput = JSON.parse(personaGuardada).ci;
    } else {
      this.ciInput = "";
    }
    this.isLoading = false;

    //console.log("CI: ", this.ciInput);
  },
}; */
</script>
<style scoped>
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.background-container img {
  width: 100%;
  height: 110vh;
  object-fit: cover;
  filter: blur(5px);
  /**  
 */
}
:root {
  --primary-color: rgb(16, 118, 173);
  --primary-color-dark: rgb(11, 91, 134);
}
.services {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/**FORM STYLES */

.form-signin {
  width: 100%;
  max-width: 330px;
  margin: auto;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
.form-signin h1 {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
  margin-top: 0px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #fff;
  padding: 15px;
  text-align: center;
}
.form-signin #form {
  padding: 15px;
}
.form-signin #form .btn {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
  color: #fff;
}
.form-signin #form .btn:hover,
.form-signin #form .btn:focus {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: none;
}
.form-signin #form .form-control:focus {
  border-color: #ced4da;
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
}
.form-signin .copyright {
  text-align: center;
  color: rgba(255, 255, 255, 0.65);
}
.form-signin .form-control {
  background: rgba(255, 255, 255, 0.9);
}
.form-signin .form-check {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.65);
}
.form-signin .form-check label {
  font-size: 0.9em;
}
.form-signin .form-check input {
  margin-right: 0.5em;
}
.form-signin .form-check input:checked {
  background-color: #9ce060;
  border-color: #81c63f;
}
.form-signin .form-floating:focus-within {
  z-index: 2;
}
.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="text"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
