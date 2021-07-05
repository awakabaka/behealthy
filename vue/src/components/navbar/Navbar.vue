<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" style="height: 75px; background: #55C8D4; border-radius: 20px; margin: 5px">
      <b-navbar-brand style="color: aliceblue; font-family: Brush Script MT, cursive; font-size: 35px; padding-left: 40px;">
        BeHealthy</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-on:click="move_to_choose_children" right>{{ $t('children') }}</b-nav-item>
          <b-nav-item-dropdown :text="language" right>
            <b-dropdown-item v-on:click="changeLangEN">{{ $t('english') }}</b-dropdown-item>
            <b-dropdown-item v-on:click="changeLangUA">{{ $t('ukrainian') }}</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-on:click="logout" right>{{ $t('logout') }}</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      language: this.$t('language')
    }
  },
  methods: {
    changeLangEN() {
      localStorage.lang = "en"
      this.$router.go(0)
    },
    changeLangUA() {
      localStorage.lang = "ua"
      this.$router.go(0)
    },
    logout() {
      localStorage.jwt = ""
      localStorage.patientId = ""
      this.$router.push('../')
    },
    move_to_choose_children() {
      this.$router.push('../children')
    },
  }
}
</script>