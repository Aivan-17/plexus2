<template>
  <!-- OLD NAVBAR
  
  <nav>
    <div class="nav__logo">
      <img
        style="height: auto; width: 150px"
        src="../assets/plexus.png"
        alt="logo-laboratorio-plexus"
      />
    </div>
    <ul class="nav__links">
      <RouterLink to="/" data-nav-link
        ><li class="link">
          <a>Inicio</a>
        </li></RouterLink
      >
      <RouterLink to="/new-patient" data-nav-link
        ><li class="link"><a>Registrar Paciente</a></li></RouterLink
      >
      <RouterLink to="/table-que" data-nav-link
        ><li class="link"><a>Tabla de Espera</a></li></RouterLink
      >
      <RouterLink to="/admin-register" data-nav-link
        ><li class="link"><a>Registro de Operador</a></li></RouterLink
      >
      <RouterLink to="/dashboard" data-nav-link
        ><li class="link"><a>Dashboard</a></li></RouterLink
      >
    </ul>
    <button style="opacity: 0" class="btn">Contactar</button>
  </nav>
  
  -->

  <!--NEW NAVBAR-->
  <nav>
    <div class="nav__logo">
      <img
        style="height: auto; width: 150px"
        src="../assets/plexus.png"
        alt="logo-laboratorio-plexus"
      />
    </div>
    <ul class="nav__links">
      <RouterLink to="/" data-nav-link
        ><li class="link"><a>Registrar Paciente</a></li></RouterLink
      >
      <RouterLink to="/register-service" data-nav-link
        ><li class="link"><a>Registrar Servicio</a></li></RouterLink
      >
      <RouterLink to="/table-fichas-pendientes" data-nav-link
        ><li class="link"><a>Tabla de espera</a></li></RouterLink
      >
      <RouterLink to="/table-que" data-nav-link
        ><li class="link"><a>Table QUE</a></li></RouterLink
      >
      <Router-link to="/success"
        ><li class="link"><a>Success View</a></li></Router-link
      >
    </ul>
    <button style="opacity: 0" class="btn">Contactar</button>
  </nav>
</template>
<script></script>
<style scoped>
.link a {
  text-decoration: none;
}
</style>
