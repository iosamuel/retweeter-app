<template>
  <div class="container login">
    <div>
      <logo />
      <h1 class="title">
        #EStreamerCoders Retweeter
      </h1>
      <h2 class="subtitle">
        Retweet App from Different users
      </h2>
      <div class="links">
        <a href="/retweeter/auth" class="button--green">
          <fa :icon="['fab', 'twitter']" />
          Login
        </a>
      </div>
      <div class="privacy">
        <span>
          Al hacer login con Twitter aceptas nuestra
          <nuxt-link to="/politics">Politica</nuxt-link> de tratamiento de datos
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" src="@/assets/css/pages/login.scss"></style>
