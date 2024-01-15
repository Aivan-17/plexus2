<template>
  <body>
    <div class="container" v-if="estadoServicio == true">
      <h1 style="font-size: 3rem; font-weight: 700">SISTEMA DE FICHAS</h1>
      <!--<input
        type="text"
        placeholder="Ingrese su nombre"
        v-model="fichaRegistrar.nombre"
      />-->
      <br />
      <input
        type="text"
        autocomplete="off"
        name="text"
        class="input"
        placeholder="Ingrese su nombre"
        v-model="fichaRegistrar.nombre"
      />
      <div class="buttons-collection">
        <div class="normal-button">
          <div class="imagen">
            <img src="../assets/normal-patient.png" alt="" />
          </div>
          <button
            type="button"
            @click="setTipo('Normal')"
            style="font-weight: 800; font-size: 2.5rem"
          >
            NORMAL
          </button>
        </div>
        <br />
        <div class="preferential-button">
          <div class="imagen"><img src="../assets/patient.png" alt="" /></div>
          <button
            type="button"
            @click="setTipo('Preferencial')"
            style="font-weight: 800; font-size: 2.5rem"
          >
            PREFERENCIAL
          </button>
        </div>
      </div>
    </div>

    <div class="background-container">
      <img src="../assets/bg-services-plexus.jpg" alt="" />
    </div>

    <div class="services" v-if="estadoSucces == true" @click="reinicio()">
      <div class="notification">
        <div class="tittle-text">
          <h1>Gracias, en un momento te atenderemos</h1>
        </div>
        <div class="logo-img"><img src="../assets/plexus.png" alt="" /></div>
      </div>
    </div>

    <div class="services" v-if="estadoServicio == false && estadoSucces == false">
      <div class="buttons">
        <div class="button-square">
          <div class="circle-button" @click="setServicio('Toma de Muestra')">
            <img src="../assets/tubo-de-ensayo.png" alt="" />
          </div>
          <div class="description-service">
            <h1>TOMA DE MUESTRA</h1>
            <h4>Toma de muestras para laboratorio</h4>
          </div>
        </div>

        <div class="button-square">
          <div class="circle-button" @click="setServicio('Muestra Pendiente')">
            <img src="../assets/orina-oscura.png" alt="" />
          </div>
          <div class="description-service">
            <h1>MUESTRA PENDIENTE</h1>
            <h4>Entrega de muestra pendiente</h4>
          </div>
        </div>

        <div class="button-square">
          <div class="circle-button" @click="setServicio('Consulta')">
            <img src="../assets/consulta.png" alt="" />
          </div>
          <div class="description-service">
            <h1>CONSULTA</h1>
            <h4>Realiza cualquier consulta, precios, cotizaciones y demás</h4>
          </div>
        </div>
      </div>
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
import axios from "axios";
export default {
  methods: {
    reinicio() {
      this.estadoServicio = true;
      this.estadoSucces = false;
      this.fichaRegistrar.nombre = "";
      this.fichaRegistrar.tipo = "";
      this.fichaRegistrar.servicio = "";
    },
    setTipo(aux) {
      this.fichaRegistrar.tipo = aux;
      this.estadoServicio = false;
    },
    async setServicio(aux) {
      this.fichaRegistrar.servicio = aux;
      await this.postFicha();
    },

    async postFicha() {
      await axios
        .post("https://prueba-plexus-backend.serverbb.online/fichas/agregar", this.fichaRegistrar)
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            this.estadoSucces = true;
          } else {
            alert("Error al registrar la ficha");
            this.reinicio();
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error al registrar la ficha");
          this.reinicio();
        });
    },
  },

  data() {
    return {
      fichaRegistrar: {
        nombre: "",
        tipo: "",
        servicio: "",
      },
      estadoServicio: true,
      estadoSucces: false,
    };
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
/**input css */

.input {
  border: none;
  outline: none;
  border-radius: 15px;
  height: 100px;
  padding: 1em;
  background-color: #ccc;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.3);
  transition: 300ms ease-in-out;
  width: 100%;
  font-size: 1.5rem;
}

.input:focus {
  background-color: white;
  transform: scale(1.05);
  box-shadow: 13px 13px 100px #969696, -13px -13px 100px #ffffff;
}

/**end input css */

.notification {
  border-radius: 10px;
  padding: 20px;
  width: 1000px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: #000;
  text-align: center;
  position: relative;
  animation: show 5s ease-in-out;
}

.tittle-text {
  color: var(--primary-color-dark);
  margin: 40px 0;
}

.tittle-text h1 {
  font-size: 3rem;
  font-weight: 600;
}

.logo-img {
  bottom: 0;
  right: 0;
  margin: 20px;
}

.logo-img img {
  width: 100%;
  height: 100%;
  transform: scale(1.5);
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  padding: 0;
  width: 100vw;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  width: 800px;
  height: 800px;
  padding: 5%;
}

.buttons-collection {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5%;
}

.normal-button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
}

.normal-button .imagen {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px 0px var(--primary-color-dark);
  background-color: var(--primary-color-dark);
}

.normal-button .imagen img {
  width: 60%;
  height: 60%;
  transform: translateX(15%);
  margin-right: 10px;
}

.normal-button button {
  width: 520px;
  height: 100px;
  border-radius: 10px;
  background-color: var(--primary-color-dark);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.preferential-button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
}

.preferential-button .imagen {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px 0px var(--primary-color-dark);
  background-color: var(--primary-color-dark);
}

.preferential-button .imagen img {
  width: 60%;
  height: 60%;
  transform: translateX(20%);
  margin-right: 10px;
}

.preferential-button button {
  width: 520px;
  height: 100px;
  border-radius: 10px;
  background-color: var(--primary-color-dark);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

input {
  padding: 10px;
  margin-bottom: 10px;
  width: 200px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  cursor: pointer;
  background-color: #2196f3; /* Azul */
  color: #fff;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #1565c0; /* Azul oscuro al pasar el mouse */
}

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
  filter: blur(10px);
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

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.button-square {
  width: 300px;
  height: 450px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  padding: 1%;
}

.button-square:hover {
  transform: scale(1.1);
}

.circle-button {
  width: 100%;
  height: 65%;
  background-color: var(--primary-color-dark);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px 0px var(--primary-color-dark);
  cursor: pointer;
  transition: 0.3s;
  padding: 7%;
}

.circle-button img {
  width: auto;
  height: 80%;
  object-fit: cover;
  padding: 5%;
}

.description-service {
  width: 100%;
  height: 35%;
  padding: 1% 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.description-service h1 {
  font-size: 1.7rem;
  color: var(--primary-color-dark);
  text-align: center;
  margin-bottom: 1vh;
  font-weight: 600;
}

.description-service h4 {
  font-size: 1.2rem;
  color: var(--primary-color-dark);
  text-align: center;
}
</style>
