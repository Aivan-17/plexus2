<template>
  <NavbarComponentVue />
  <div
    class="say"
    style="
      height: 20vh;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      padding: 0 10.35rem;
    "
  >
    <div
      class="notes"
      style="
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    ></div>
    <div class="baby-register" @click="actualizarTabla">
      <button class="button2">Actualizar Tabla</button>
    </div>
  </div>
  <body>
    <div class="cuerpo">
      <table class="container">
        <thead>
          <tr>
            <th>
              <h1>#</h1>
            </th>
            <th>
              <h1>C.I.</h1>
            </th>
            <th>
              <h1>Nombre</h1>
            </th>
            <th>
              <h1>Fecha Ingreso</h1>
            </th>
            <th>
              <h1>Fecha Atención</h1>
            </th>
            <th>
              <h1>Servicio</h1>
            </th>
            <th>
              <h1>Estado</h1>
            </th>
            <th>
              <h1>Frontend</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ficha in this.fichasTotales"
            :key="ficha.idFicha"
            :id="ficha.idFicha"
            :style="{ 'background-color': getColorByEstado(ficha.estado) }"
          >
            <td>{{ ficha.idFicha }}</td>
            <td>{{ ficha.persona.ci }}</td>
            <td>{{ ficha.persona.nombre }}</td>
            <td>{{ ficha.fingreso.slice(0, 19) }}</td>
            <td>{{ ficha.fllamada.slice(0, 19) }}</td>
            <td>{{ ficha.servicio }}</td>
            <td>{{ ficha.estado }}</td>
            <td>{{ ficha.personaPersonal.nombre }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="baby-register">
      <button
        class="button2"
        @click="unclickedBabyRegister"
        v-if="babyRegister"
      >
        Registrar un Paciente
      </button>
    </div>
  </body>
  <div>
    <StateModalVue :visible="modalVisible" @cerrar-modal="cerrarModal" />
  </div>
  <Loading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="fullPage"
  />
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

/**import StateModalVue from "@/components/modals/StateModal.vue";
import { useFichasStore } from "@/stores/fichasStore";
import { usePersonasStore } from "@/stores/personasStore";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  setup() {
    const fichasStore = useFichasStore();
    const personasStore = usePersonasStore();
    return {
      fichasStore,
      personasStore,
    };
  },
  components: {
    NavbarComponentVue,
    StateModalVue,
    Loading,
  },
  data() {
    return {
      modalVisible: false,
      fichasTotales: [],
      isLoading: false,
      fullPage: true,
    };
  },
  async mounted() {
    this.isLoading = true;

    this.fichasTotales = await this.fichasStore.getFichasTotales();
    //console.log("fichas totales");
    //console.log(this.fichasTotales);
    //console.log(this.usuarioActual);
    this.isLoading = false;

    this.intervalId = setInterval(() => {
      this.actualizarTabla();
    }, 10000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    mostrarModal() {
      this.modalVisible = true;
    },
    cerrarModal() {
      this.modalVisible = false;
    },
    async actualizarTabla() {
      this.fichasTotales = await this.fichasStore.getFichasTotales();
    },
    getColorByEstado(estado) {
      switch (estado) {
        case "En espera":
          return "#ffcccc";
        case "Abandono":
          return "#ffffcc";
        case "Atendido":
          return "#ccffcc";
        default:
          return "white";
      }
    },
  },
}; */
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
:root {
  --primary-color: rgb(16, 118, 173);
  --primary-color-dark: rgb(11, 91, 134);
}

.container {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  margin: 0 auto;
  text-align: center;
  display: table;
  padding: 0 0 8em 0;
}
.container th h1 {
  font-weight: bold;
  font-size: 1rem;
  text-align: left;
  color: var(--primary-color);
}

.container td {
  font-weight: normal;
  font-size: 1em;
  -webkit-box-shadow: 0 2px 2px -2px #fff;
  -moz-box-shadow: 0 2px 2px -2px #fff;
  box-shadow: 0 2px 2px -2px #fff;
}

.container {
  text-align: left;
  overflow: hidden;
  width: 80%;
  margin: 0 auto;
  display: table;
  padding: 0 0 8em 0;
}

.container td,
.container th {
  padding-bottom: 2%;
  padding-top: 2%;
  padding-left: 2%;
}

.container tr:nth-child(odd) {
  background-color: var(--primary-color);
}

.container tr:nth-child(even) {
  background-color: var(--primary-color-dark);
}

.container th {
  background-color: #1f2739;
}

.container td:first-child {
  color: #1f2739;
  font-size: 1.7rem;
}

.container tr:hover {
  background-color: #464a52;
  -webkit-box-shadow: 0 6px 6px -6px #0e1119;
  -moz-box-shadow: 0 6px 6px -6px #0e1119;
  box-shadow: 0 6px 6px -6px #0e1119;
}

.container td:hover {
  background-color: #fff842;
  color: #403e10;
  font-weight: bold;

  box-shadow: #7f7c21 -1px 1px, #7f7c21 -2px 2px, #7f7c21 -3px 3px,
    #7f7c21 -4px 4px, #7f7c21 -5px 5px, #7f7c21 -6px 6px;
  transform: translate3d(6px, -6px, 0);

  transition-delay: 0s;
  transition-duration: 0.4s;
  transition-property: all;
  transition-timing-function: line;
}

@media (max-width: 800px) {
  .container td:nth-child(4),
  .container th:nth-child(4) {
    display: none;
  }
}

.baby-register {
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 100px;
}

.button2 {
  display: inline-block;
  width: auto;
  height: 100%;
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  z-index: 1;
  color: #090909;
  padding: 0.45em 1.7em;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
}

.button2:active {
  color: #666;
  box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.button2:before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.button2:after {
  content: "";
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: var(--primary-color-dark);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.button2:hover {
  color: #ffffff;
  border: 1px solid var(--primary-color-dark);
}

.button2:hover:before {
  top: -35%;
  background-color: var(--primary-color-dark);
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.button2:hover:after {
  top: -45%;
  background-color: var(--primary-color-dark);
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}
</style>
