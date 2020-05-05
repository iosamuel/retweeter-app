<template>
  <div class="main">
    <header>
      <h3><nuxt-link to="/">Retweeter</nuxt-link></h3>
      <div class="side-header">
        <template v-if="user">
          <span>
            <nuxt-link to="/profile">{{ user.displayName }}</nuxt-link>
          </span>
          <img :src="userPhoto" :alt="user.displayName" />
        </template>
        <template v-else>
          <span><nuxt-link to="/login">Login</nuxt-link></span>
          <fa :icon="['fas', 'user-circle']"></fa>
        </template>
      </div>
    </header>
    <div class="main__container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userPhoto'])
  }
}
</script>

<style lang="scss" src="@/assets/css/layouts/default.scss"></style>
