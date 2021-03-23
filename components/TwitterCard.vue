<template>
  <div class="twitter-card">
    <div class="twitter-card__header">
      <div class="avatar">
        <img :src="avatar" :alt="name" />
      </div>
      <div class="title">
        <h6>{{ name }}</h6>
        <p>{{ handle }}</p>
      </div>
      <div class="icon">
        <i class="mdi mdi-twitter"></i>
      </div>
    </div>
    <div class="twitter-card__body">
      <p>{{ tweet }}</p>
    </div>
    <div class="twitter-card__footer">
      <p>{{ place }} {{ place && '|' }} {{ time }}</p>
    </div>
  </div>
</template>
<style scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
</style>
<script>
export default {
  props: {
    avatar: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    handle: {
      type: String,
      default: ''
    },
    tweet: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    place: {
      type: String,
      default: ''
    }
  }
}
</script>
