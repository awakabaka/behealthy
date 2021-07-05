<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" style="height: 75px; background: #55C8D4; border-radius: 20px; margin: 5px">
      <b-navbar-brand style="color: aliceblue; font-family: Brush Script MT, cursive; font-size: 35px; padding-left: 40px;">
        BeHealthy</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-on:click="move_to_profile" right>{{ $t('doctor-requests') }}</b-nav-item>
          <b-nav-item v-on:click="move_to_patients" right>{{ $t('patients') }}</b-nav-item>
          <b-nav-item v-on:click="move_to_parents" right>{{ $t('parents') }}</b-nav-item>
          <b-nav-item v-on:click="move_to_doctors" right>{{ $t('doctors') }}</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="language" right>
            <b-dropdown-item v-on:click="changeLangEN">{{ $t('english') }}</b-dropdown-item>
            <b-dropdown-item v-on:click="changeLangUA">{{ $t('ukrainian') }}</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-on:click="logout" right>{{ $t('logout') }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBarAdmin",
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
      localStorage.doctorId = ""
      this.$router.push('../')
    },
    move_to_profile() {
      this.$router.push('../request/doctor')
    },
    move_to_patients() {
      this.$router.push('../adminpatients')
    },
    move_to_doctors() {
      this.$router.push('../doctors')
    },
    move_to_parents() {
      this.$router.push('../adminparents')
    },

  }
}
</script>