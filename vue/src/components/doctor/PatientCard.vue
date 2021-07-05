<template>
  <div class="justify-content-center" style="margin: auto; max-width: 1550px">
    <b-card class="profile" style="width: 1400px;">
      <div class="row">
        <div class="column">
          <b-card-text style="width: 150px; text-align: start">{{ patient_data.name }}</b-card-text>
      </div>
        <div class="column" style="margin-left: 100px;">
        <b-card-text class="itempl">{{ $d(new Date(patient_data.birthday), "short") }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 100px;">
        <b-card-text class="itempl">{{ $t(patient_data.male) }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 100px; width: 100px">
        <b-card-text id="temperature" class="itempl">{{ temperature }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 100px; width: 100px">
          <b-card-text id="pulse" class="itempl">{{ pulse }}</b-card-text>
        </div>
        <div class="flex-column" style="margin-left: auto; margin-bottom: auto; margin-top: -5px; margin-bottom: 7px;">
          <b-button variant="outline-info" style="margin-right: 20px" v-on:click="move_to_add_visit">{{ $t('create-visit') }}</b-button>
          <b-button variant="outline-info" v-on:click="move_to_see_profile">{{ $t('see-profile') }}</b-button>
        </div>
      </div>
    </b-card>
  </div>
</template>

<style>
.profile {
  border: 1px;
  border-style: solid;
  border-color: #5FDBE9;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  margin-left: 50px;
  margin-top: 20px;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}

.itempl {
  text-align: left;
  margin-bottom: 10px;
  color: #355454;
}
</style>

<script>
import axios from "axios"
export default {
  data() {
    return {
      pulse: "",
      temperature: ""
    }
  },
  props: {
    patient_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkPulse() {
        this.pulse = this.$t('not-found')
    },
    checkTemperature() {
        this.temperature = this.$t('not-found')
    },
    move_to_add_visit() {
      localStorage.patientId = this.patient_data._id
      this.$router.push('/newvisit')
    },
    move_to_see_profile() {
      localStorage.patientId = this.patient_data._id
      this.$router.push('/seepatient')
    },
    getMessageInfo() {

    }
  },
  mounted() {
    axios.get("http://localhost:5000/pulse/now/" + this.patient_data._id)
    .then(res => {
      this.pulse = res.data.pulse
      this.temperature = res.data.temperature
    })
    .catch(err => {
      if (err.response.status === 404) {
        this.checkPulse()
        this.checkTemperature()
      } else if (err.request) {
        alert(this.$t('err-lost-connection'))
      } else {
        alert(this.$t('err-other'))
      }
    })
  }
}
</script>