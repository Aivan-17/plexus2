<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css"
      rel="stylesheet"
    />

    <title>Bienvenido a Laboratorios Plexus</title>
  </head>
  <NavbarComponentVue />
  <body>
    <div class="background-container">
      <!--<img src="../assets/bg-plexus.jpg" alt="" />-->
    </div>
    <div class="services">
      <div class="notification">
        <div class="tittle-text">
          <h1>Gracias, en un momento te atenderemos</h1>
        </div>
        <div class="logo-img"><img src="../assets/plexus.png" alt="" /></div>
      </div>
    </div>
  </body>
  <div></div>
  <!--<Loading<
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
  height: 85vh;
  width: 100vw;
}

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
</style>
