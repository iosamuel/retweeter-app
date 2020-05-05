<template>
  <div class="home">
    <div>
      <logo />
      <h2>
        Lista de tweets con el hastag #EStreamerCoders
      </h2>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  asyncData(context) {
    if (process.server) {
      // eslint-disable-next-line
      // console.log(context.req.session)
    }
  }
}
</script>

<style>
.home {
  @apply flex items-center justify-center;
}
</style>
