<template>
  <div class="profile">
    <h2>ESTreamer - @{{ user.username }}</h2>
    <hr />
    <div class="profile__data">
      <div class="profile__data--left">
        <img :src="userPhotoXL" :alt="user.displayName" />
      </div>
      <div class="profile__data--right">
        <p><span>Nombre:</span> {{ user.displayName }}</p>
        <p><span>Lugar:</span> {{ user._json.location }}</p>
        <p><span>Descripcion:</span> {{ user._json.description }}</p>
      </div>
    </div>

    <div class="profile__permissions">
      <h2>Permisos</h2>
      <hr />
      <div class="profile__permissions--data">
        <MSwitch
          :checked="permissions.retweet"
          label="Retweet"
          @switch-change="setUserPermission($event)"
        />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MSwitch from '@/components/MSwitch'

export default {
  components: {
    MSwitch
  },
  middleware: ['authenticated'],
  data() {
    return {
      permissions: {}
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userPhotoXL'])
  },
  mounted() {
    this.getUserPermissions()
  },
  methods: {
    getUserPermissions() {
      fetch('/api/get-permissions', {
        method: 'get'
      })
        .then((res) => res.json())
        .then((data) => (this.permissions = data))
    },
    setUserPermission(check) {
      this.permissions.check = check
      fetch('/api/change-permission', {
        method: 'post',
        body: JSON.stringify({
          permissions: {
            retweet: check
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
}
</script>

<style lang="scss" src="@/assets/css/pages/profile.scss"></style>
