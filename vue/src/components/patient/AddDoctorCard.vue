<template>
  <div class="justify-content-center" style="margin: auto; max-width: 1500px">
    <b-card class="profile" style="width: 1400px;">
      <div class="row">
        <div class="column" style="margin: auto; width: 200px;">
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ doctor_data.name }}</b-card-text>
        </div>
        <div class="column" style="margin: auto; width: 150px;">
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ doctor_data.specialization }}</b-card-text>
        </div>
        <div class="column" style="margin: auto; width: 150px;">
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ doctor_data.city }}</b-card-text>
        </div>
        <div class="column" style="margin: auto; width: 150px;">
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ doctor_data.workAddress }}</b-card-text>
        </div>
        <div class="column" style="margin: auto; width: 150px;">
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ doctor_data.email }}</b-card-text>
        </div>
        <div class="column" style="margin: auto; width: 200px;">
          <b-button variant="info" v-on:click="addRequest">{{ $t('send-request') }}</b-button>
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
//import image from '../patient/Test/doctor.jpg'
import axios from "axios";
//import { createToast } from "mosha-vue-toastify";

export default {
  data() {
    return {
      doctor: "",
      mainProps: { blank: true, blankColor: '#A6CEE3', width: 75, height: 75, class: 'm1' }
    }
  },
  props: {
    doctor_data: {
      type: Object,
      default() {
        return {

        }
      }
    }
  },/*
  setup () {
    const toast = () => {
      createToast(""+ this.$t('err-wrong-request'),
          {
            position: 'bottom-right',
            type: 'info',
            transition: 'slide',
            hideProgressBar: 'true'
          })
    }
    return { toast }
  },*/
  methods: {
    addRequest() {
      let patientId = localStorage.patientId

      axios
          .post( 'http://localhost:5000/patientrequest/', {
            patientId: patientId,
            doctorId: this.doctor_data._id
          })
          .then(response => {
            if (response.data) {
              this.$router.push('/home')
              this.$toast.success(this.$t('add-success'))
            }
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 409) {
                alert(this.$t('err-wrong-request'));
               // this.setap.toast
              } else if (err.request) {
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