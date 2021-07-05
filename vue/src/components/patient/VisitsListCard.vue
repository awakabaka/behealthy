<template>
  <div class="justify-content-center" style="margin: auto; max-width: 1500px">
    <b-card class="profile" style="width: 1400px;">
      <div class="row">
        <div class="column" style="margin: auto; width: 200px;">
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ visit_data.doctorId.name }}</b-card-text>
        </div>
        <div class="column" style="margin: auto; width: 150px;">
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ visit_data.doctorId.workAddress }}</b-card-text>
        </div>
        <div class="column" style="margin: auto; width: 150px;">
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ visit_data.doctorId.city }}</b-card-text>
        </div>
        <div class="column" style="margin: auto; width: 150px;">
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ $d(new Date(visit_data.date), "short") }}</b-card-text>
        </div>
        <div class="column" style="margin: auto; width: 150px;">
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ visit_data.time }}</b-card-text>
        </div>
        <div class="column" style="margin: auto; width: 200px;">
          <b-button id="btn" variant="info" :disabled="visit_data.date.split('T', 10)[0] < tomorrowDate" v-on:click="removeRequest">{{ $t('remove-request') }}</b-button>
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
import axios from "axios";

export default {
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    return {
      tomorrowDate: now.getFullYear()+'-'+
          (now.getMonth() + 1 > 9 ? now.getMonth() + 1 : '0'+(now.getMonth() + 1))+'-'+
          (today.getDate() > 9 ? today.getDate() + 1 : '0'+ today.getDate() - 1),
    }
  },
  props: {
    visit_data: {
      type: Object,
      default() {
        return {

        }
      }
    }
  },
  created() {
    const newDate = this.visit_data.date.split('T', 10)
    console.log(newDate[0])
    console.log(this.tomorrowDate)
    this.checkDate()
  },
  methods: {
    removeRequest() {
      axios
          .delete('http://localhost:5000/schedule/' + this.visit_data._id)
          .then(response => {
            if (response.data) {
              window.location.reload();
              this.$toast.info("Візит відмінено. Будь-ласка, перезавантажте сторінку для оновлення інформації!", {
                duration: 10000,
                pauseOnHover: true
              })
            }
          })
          .catch(err => {
            if (err.response) {
              if (err.request) {
                alert(this.$t('err-lost-connection'))
              } else {
                alert(this.$t('err-other'))
              }
            }
          })
    }
  }
}
</script>