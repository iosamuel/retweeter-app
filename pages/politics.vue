<template>
  <div class="container politics">
    <h2>Politica de tratamiento de Datos de Retweeter</h2>
    <div class="politics__content">
      <p>
        Una vez te logeas en nuestra aplicacion con Twitter, Retweeter se
        reserva el derecho de usar tus token de acceso de Twitter para hacer
        retweet en tu nombre de manera automatica.
      </p>
      <p>
        Este comportamiento puede ser modificado desde el apartado de Permisos
        en tu perfil en cualquier momento, asi puedes controlar cuando la
        aplicacion puede retwittear en tu nombre.
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.politics {
  @apply p-8;

  h2 {
    @apply text-xl font-bold;
  }
}
</style>
