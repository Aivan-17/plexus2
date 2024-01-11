<template>
  <NavbarComponentVue />
  <body>
    <div class="background-container">
      <img src="../assets/bg-services-plexus.jpg" alt="" />
    </div>
    <div class="services">
      <div class="buttons">
        <div class="button-square">
          <div class="circle-button">
            <img src="../assets/tubo-de-ensayo.png" alt="" />
          </div>
          <div class="description-service">
            <h1>TOMA DE MUESTRA</h1>
            <h4>Toma de muestras para laboratorio</h4>
          </div>
        </div>
        <div class="button-square">
          <div class="circle-button">
            <img src="../assets/orina-oscura.png" alt="" />
          </div>
          <div class="description-service">
            <h1>MUESTRA PENDIENTE CONSULTA</h1>
            <h4>Entrega de muestra pendiente</h4>
          </div>
        </div>
        <div class="button-square">
          <div class="circle-button">
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

import NavbarComponentVue from "@/components/NavbarComponent.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  setup() {
    return {};
  },
  components: {
    NavbarComponentVue,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
    };
  },
  async mounted() {
    this.isLoading = true;

    this.isLoading = false;
  },
  methods: {},
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
