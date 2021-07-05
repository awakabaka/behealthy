<template>
  <div>
    <b-card
        tag="article"
        style="max-width: 20rem; width: 20rem; height: 640px"
        class="profile"
    >
      <b-img :src="image" style="width: 150px; height: 150px;"></b-img>
      <b-card-text style="margin: 0px; padding-bottom: 5px; color: #2c3e50">{{ patient.name }}</b-card-text>
      <b-card-text style="margin: 0px; padding-bottom: 5px; color: #2c3e50">{{ $d(new Date(patient.birthday), "short") }} {{this.birthday_label}} </b-card-text>
      <div class="row justify-content-center">
        <div class="flex-column" style="margin: auto;">
          <b-card-text style="margin-bottom: 0px; color: #2c3e50">{{ $t('height') }}</b-card-text>
          <b-card-text style="margin-top: 0px; color: #2c3e50">{{ patient.height }}</b-card-text>
        </div>
        <div class="flex-column" style="margin: auto;">
          <b-card-text style="margin-bottom: 0px; color: #2c3e50">{{ $t('weight') }}</b-card-text>
          <b-card-text style="margin-top: 0px; color: #2c3e50">{{ patient.weight }}</b-card-text>
        </div>
        <div class="flex-column" style="margin: auto; margin-top: 0px;">
          <b-card-text style="margin-bottom: 0px; color: #2c3e50">{{ $t('blood') }}</b-card-text>
          <b-card-text style="margin-top: 0px; color: #2c3e50">{{ patient.blood }}</b-card-text>
        </div>
      </div>
      <b-card-text style="color: #2c3e50">{{this.$t(patient.fullTerm)}}</b-card-text>
      <div class="flex-row" style="border: 1px; border-style: dotted; border-color: #355454; margin-bottom: 15px;"/>
      <b-card-text style="font-size: 18px">{{$t('patent')}}</b-card-text>
      <b-card-text style="margin-bottom: 10px; padding-bottom: 5px; text-align: center; color: #2c3e50">{{ parent.name }}</b-card-text>
      <b-card-text style="margin-bottom: 10px; text-align: left; color: #2c3e50">{{ $t('address') }}: {{ parent.city }}, {{ parent.address }}</b-card-text>
      <b-card-text style="margin-bottom: 10px; text-align: left; color: #2c3e50">{{ $t('phone') }}: {{ parent.phone }}</b-card-text>
      <b-card-text style="margin-bottom: 0px; text-align: left; color: #2c3e50">{{ $t('email') }}: {{ parent.email }}</b-card-text>
      <div class="flex-row" style="margin-top: 20px">
        <b-button variant="info"  v-on:click="move_to_history" style="margin-right: 5px">{{$t('see-history')}}</b-button>
        <b-button variant="info" v-on:click="move_to_questionnaire" style="margin-left: 5px">{{$t('see-questionnaire')}}</b-button>
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
      parent: [],
      patient: []
    }
  },

  methods: {
    move_to_history() {
      this.$router.push('/seehistory')
    },
    move_to_questionnaire() {
      this.$router.push('/seequestionnaire')
    },
    countMonth() {
      let months = ((Date.now() - new Date(this.patient.birthday))/1000/60/60/24/30).toString()
      this.birthday_label = " (" + months.split(".")[0] + " " + this.$t('month') + ")"
    },
    getParent() {
      axios.get("http://localhost:5000/account/" + this.patient.parentId)
          .then(res => {
            this.parent = res.data.parent
          })
          .catch(err => {
            if (err.response.status === 404) {
              this.$toast(this.$t('parent-not-found'), {
                duration: 5000,
                pauseOnHover: true
              })
            } else if (err.request.status === 404) {
              alert(this.$t('err-lost-connection'))
            } else {
              alert(this.$t('err-other'))
            }
          })
    }
  },
  computed: {
    image() {
      return image
    }
  },
  mounted() {
    axios
        .get("http://localhost:5000/patient/" + localStorage.patientId)
        .then(response => {
          this.patient = response.data.patient
          this.countMonth()
          this.getParent()
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