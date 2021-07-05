<template>
  <div>
    <b-card
        style="width: 500px; padding-top: 0px; padding-bottom: 5px; height: 412px"
        class="profile">
      <b-card-text style="text-align: left; margin-left: 15px; font-size: 20px">{{$t('schedule')}}</b-card-text>
      <div class="row justify-content-center">
        <div class="column" style="margin: auto;">
          <b-card-text id="08:00" class="slot">08:00</b-card-text>
          <b-card-text id="09:30" class="slot">09:30</b-card-text>
          <b-card-text id="11:00" class="slot">11:00</b-card-text>
          <b-card-text id="13:30" class="slot">13:30</b-card-text>
          <b-card-text id="15:00" class="slot">15:00</b-card-text>
          <b-card-text id="16:30" class="slot">16:30</b-card-text>
        </div>
        <div class="column" style="margin: auto; margin-top: 0px;">
          <b-card-text id="08:30" class="slot">08:30</b-card-text>
          <b-card-text id="10:00" class="slot">10:00</b-card-text>
          <b-card-text id="11:30" class="slot">11:30</b-card-text>
          <b-card-text id="14:00" class="slot">14:00</b-card-text>
          <b-card-text id="15:30" class="slot">15:30</b-card-text>
        </div>
        <div class="column" style="margin: auto; margin-top: 0px;">
          <b-card-text id="09:00" class="slot">09:00</b-card-text>
          <b-card-text id="10:30" class="slot">10:30</b-card-text>
          <b-card-text id="13:00" class="slot">13:00</b-card-text>
          <b-card-text id="14:30" class="slot">14:30</b-card-text>
          <b-card-text id="16:00" class="slot">16:00</b-card-text>
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
  border-radius: 20px;
  margin-left: 50px;
  margin-top: 20px;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}
.slot {
  border: 1px;
  border-style: solid;
  border-color: #5FDBE9;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2em;
  padding-right: 2em;
  border-radius: 50px;
  margin-bottom: 1em;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}
.slotChecked {
  border: 1px;
  border-style: solid;
  border-color: #5FDBE9;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2em;
  padding-right: 2em;
  border-radius: 50px;
  margin-bottom: 1em;
  background-color: #5FDBE9;
  color: #FFFFFF;
  box-shadow: 0px 4px 8px  #58ABB7;
}
</style>

<script>

import axios from "axios";

export default {
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    return {
      schedule: [],
      tomorrowDate: now.getFullYear()+'-'+
          (now.getMonth() + 1 > 9 ? now.getMonth() + 1 : '0'+(now.getMonth() + 1))+'-'+
          (today.getDate() > 9 ? today.getDate() + 1 : '0'+today.getDate() + 1),
      arrayTime: [
          "08:00",
          "08:30",
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30"
      ],
      is800: false
    }
  },
  mounted() {
    console.log(this.tomorrowDate)
    axios
        .post("http://localhost:5000/schedule/doctor/" + localStorage.doctorId + "/date", {
          date: this.tomorrowDate
    })
        .then(response => {
          this.schedule = response.data
          for (let i=0; i<this.schedule.length; i++) {
            for (let j=0; j<this.arrayTime.length; j++) {
              if (this.schedule[i].time === this.arrayTime[j]) {
                document.getElementById(this.arrayTime[j]).style.background = "#58ABB7"
                document.getElementById(this.arrayTime[j]).style.color = "#FFFFFF"
              }
            }
          }
        })
        .catch(err => {
          if (err.request) {
            this.$toast.info(this.$t('schedules-today-not-found'), {
              duration: 5000,
              pauseOnHover: true
            })
          }
        })
  }
}
</script>

