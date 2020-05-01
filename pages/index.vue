<template>
  <div class="container">
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
          Login
        </a>
        <a href="/logout" class="button--grey">
          Logout
        </a>
      </div>
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
      console.log(context.req.user)
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
