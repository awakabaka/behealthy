<template>
  <div>
    <b-card
        tag="article"
        style="max-width: 20rem; width: 20rem;"
        class="profile"
    >
      <b-img :src="image" style="width: 150px; height: 150px;"></b-img>
      <b-card-text style="margin: 0px; padding-bottom: 5px">{{ patient.name }}</b-card-text>
      <b-card-text style="margin: 0px; padding-bottom: 5px">{{ $d(new Date(patient.birthday), "short") }} {{this.birthday_label}} </b-card-text>
      <div class="row justify-content-center">
        <div class="flex-column" style="margin: auto;">
          <b-card-text style="margin-bottom: 0px">{{ $t('height') }}</b-card-text>
          <b-card-text style="margin-top: 0px">{{ patient.height }}</b-card-text>
        </div>
        <div class="flex-column" style="margin: auto;">
          <b-card-text style="margin-bottom: 0px">{{ $t('weight') }}</b-card-text>
          <b-card-text style="margin-top: 0px">{{ patient.weight }}</b-card-text>
        </div>
        <div class="flex-column" style="margin: auto; margin-top: 0px;">
          <b-card-text style="margin-bottom: 0px">{{ $t('blood') }}</b-card-text>
          <b-card-text style="margin-top: 0px;">{{ patient.blood }}</b-card-text>
        </div>
      </div>
      <b-card-text>{{this.$t(patient.fullTerm)}}</b-card-text>
      <b-card-text v-if="patient.doctorId != null" v-on:click="move_to_doctor"> {{doctorName}} </b-card-text>
      <b-card-text v-else-if="request != ''" >{{$t('request-found')}}</b-card-text>
      <b-button v-else v-on:click="moveToSearchDoctor" variant="outline-info"
                style="width: 80%">{{$t("add-doctor")}}</b-button>
    </b-card>
  </div>
</template>

<style>
.profile {
  border: 1px;
  border-style: solid;
  border-color: #5FDBE9;
  padding-top: 20px;
  padding-bottom: 0px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  margin-left: 50px;
  margin-top: 20px;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}
</style>

<script>

import axios from "axios";
import image from "@/assets/child.png";

export default {
  data() {
    return {
      birthday_label: "",
      doctorId: "",
      doctorName: "",
      request: "",
      patient: []
    }
  },

  methods: {
    countMonth() {
      let months = ((Date.now() - new Date(this.patient.birthday))/1000/60/60/24/30).toString()
      this.birthday_label = " (" + months.split(".")[0] + " " + this.$t('month') + ")"
    },
    moveToSearchDoctor() {
      this.$router.push('/add')

    },
    chechRequest() {
      axios
          .get("http://localhost:5000/patientrequest/patient/" + this.patient._id)
          .then(response => {
            this.request = response.data.request._id
          })
          .catch(err => {
            if (err.response.status === 404) {
              this.request = ''
            } else if (err.request.status === 404) {
              alert(this.$t('err-lost-connection'))
            } else {
              alert(this.$t('err-other'))
            }
          })
    },
    checkDoctor() {
      if (this.patient.doctorId != null) {
        axios
            .get("http://localhost:5000/doctor/" + this.doctorId)
            .then(response => {
              this.doctorName = response.data.name
            })
      }
    },
    move_to_doctor() {
      localStorage.doctorId = this.patient.doctorId
      this.$router.push('/seedoctor')
    }
  },
  computed: {
    image() {
      return image
    }
  },
  mounted() {
    axios
        .get("http://localhost:5000/patient/profile/" + localStorage.patientId)
        .then(response => {
          this.patient = response.data
          this.doctorId = response.data.doctorId
          this.countMonth()
          this.chechRequest()
          this.checkDoctor()
        })
        .catch(err => {
          if (err.response) {
            alert(this.$t('message'));
          } else if (err.request) {
            alert(this.$t('err-lost-connection2'))
          } else {
            alert(this.$t('err-other'))
          }
        })
  }
}
</script>