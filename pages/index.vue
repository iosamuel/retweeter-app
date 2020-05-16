<template>
  <div class="home">
    <div>
      <logo />
      <h2>
        Lista de tweets con el hastag #EStreamerCoders
      </h2>
    </div>
    <div class="tweets">
      <div v-for="tweet in tweets" :key="tweet.id" class="twitter-card__data">
        <div class="twitter-card__data--left">
          <img
            :src="getImageURL(tweet.user.profile_image_url)"
            :alt="tweet.user.name"
          />
        </div>
        <div class="twitter-card__data--right">
          <p><span>Nombre:</span> {{ tweet.user.name }}</p>
          <p><span>Lugar:</span> {{ tweet.user.location }}</p>
          <p class="tweets__tweet">{{ tweet.full_text }}</p>
        </div>
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
      // console.log(context.req.session)
    }
  },
  data() {
    return {
      tweets: []
    }
  },
  mounted() {
    this.getTweets()
  },
  methods: {
    getTweets() {
      fetch('/api/get-tweets', {
        method: 'get'
      })
        .then((res) => res.json())
        .then((data) => (this.tweets = data))
    },
    getImageURL(url) {
      return url.replace('_normal', '')
    }
  }
}
</script>

<style lang="scss" src="@/assets/css/pages/home.scss"></style>
