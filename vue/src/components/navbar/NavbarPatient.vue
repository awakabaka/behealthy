<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" style="height: 75px; background: #55C8D4; border-radius: 20px; margin: 5px">
      <b-navbar-brand style="color: aliceblue; font-family: Brush Script MT, cursive; font-size: 35px; padding-left: 40px;">
        BeHealthy</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-on:click="move_to_main" right>{{ $t('main') }}</b-nav-item>
          <b-nav-item v-on:click="move_to_history" right>{{ $t('history') }}</b-nav-item>
          <b-nav-item v-on:click="move_to_visits" right>{{ $t('visits') }}</b-nav-item>
          <b-nav-item v-on:click="move_to_questionnaire" right>{{ $t('questionnaire') }}</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-on:click="move_to_choose_children" right>{{ $t('children') }}</b-nav-item>
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
    move_to_main() {
      this.$router.push('../home')
    },
    move_to_history() {
      this.$router.push('../history')
    },
    move_to_visits() {
      this.$router.push('../myvisits')
    },
    move_to_choose_children() {
      this.$router.push('../children')
    },
    move_to_questionnaire() {
      this.$router.push('../questionnaire')
    }
  }
}
</script>