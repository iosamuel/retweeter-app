<template>
  <div class="home">
    <div>
      <h2 class="title">
        Lista de tweets con el hastag
        <a
          target="_blank"
          href="https://twitter.com/search?q=%23EStreamerCoders&src=typed_query"
          >#EStreamerCoders</a
        >
      </h2>
    </div>
    <div class="tweets">
      <div v-for="tweet in tweets" :key="tweet.id">
        <TwitterCard
          :place="tweet.user.location"
          :tweet="tweet.full_text"
          :name="tweet.user.name"
          :handle="getHandle(tweet.user.screen_name)"
          :avatar="getImageURL(tweet.user.profile_image_url)"
          :time="getTime(tweet.created_at)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TwitterCard from '~/components/TwitterCard.vue'

export default {
  components: {
    TwitterCard
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
    },
    getTime(time) {
      return new Date(time).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    },
    getHandle(handle) {
      return `@${handle}`
    }
  }
}
</script>

<style lang="scss" src="@/assets/css/pages/home.scss"></style>
