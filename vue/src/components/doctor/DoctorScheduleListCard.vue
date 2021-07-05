<template>
  <div class="justify-content-center" style="margin: auto; max-width: 1550px">
    <b-card class="profile" style="width: 1400px;">
      <div class="row">
      </div>
      <div class="row">
        <div class="column">
          <b-card-text style="margin-bottom: 10px; line-break: strict; width: 250px">{{ $t('name') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ $t(schedule_data.patientId.name) }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 100px">
          <b-card-text style="margin-bottom: 10px">{{ $t('birthday') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ $d(new Date(schedule_data.patientId.birthday), "short") }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 100px">
          <b-card-text style="margin-bottom: 10px">{{ $t('date') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ $d(new Date(schedule_data.date), "short") }}</b-card-text>

        </div>
        <div class="column" style="margin-left: 150px">
          <b-card-text style="margin-bottom: 10px">{{ $t('time') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ $t(schedule_data.time) }}</b-card-text>
        </div>
        <div class="column" style="margin-left: auto">
          <b-button variant="info" :disabled="schedule_data.status === true" v-on:click="move_to_create_visit">{{$t('create-visit')}}</b-button>
          <b-button variant="info" style="margin-left: 10px" v-on:click="move_to_see_profile">{{$t('see-profile')}}</b-button>
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
.column {
  margin-left: 30px;
  text-align: left;

}
</style>

<script>

import axios from 'axios'

export default {
  data() {
    return {
    }
  },
  props: {
    schedule_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    updateStatus() {
      axios.patch("http://localhost:5000/schedule/" + this.schedule_data._id)
      .then(res => {
        console.log(res.status)
      })
    },
    move_to_create_visit() {
      localStorage.patientId = this.schedule_data.patientId._id
      this.updateStatus()
      this.$router.push('/newvisit')
    },
    move_to_see_profile () {
      localStorage.patientId = this.schedule_data.patientId._id
      this.$router.push('/seepatient')
    }
  }
}
</script>