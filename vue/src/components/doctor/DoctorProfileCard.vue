<template>
  <div>
    <b-card
        style="width: 900px;"
        class="profile"
    >
      <div class="row">
        <div class="flex-column" style="margin-bottom: auto; max-width: 200px">
          <div class="column" style="margin-left: 60px; width: 100px;">
            <img :src="image" rounded="circle" style="max-width: 200px; max-height: 200px">
          </div>
        </div>
          <div class="flex-column" style="margin-left: 200px">
            <b-card-text class="text">{{ $t('name') }}</b-card-text>
            <b-card-text class="text" style="padding-top: 24px">{{ $t('specialty') }}</b-card-text>
            <b-card-text class="text">{{ $t('specialization') }}</b-card-text>
            <b-card-text class="text">{{ $t('university') }}</b-card-text>
            <b-card-text class="text">{{ $t('city') }}</b-card-text>
            <b-card-text class="text">{{ $t('workAddress') }}</b-card-text>
            <b-card-text class="text">{{ $t('phone') }}</b-card-text>
            <b-card-text class="text">{{ $t('email') }}</b-card-text>
          </div>
        <div class="flex-column" style="width: 250px">
      <b-card-text class="text">{{ doctor.name }}</b-card-text>
      <b-card-text class="text">{{ doctor.specialty }}</b-card-text>
          <b-card-text class="text">{{ doctor.specialization }}</b-card-text>
          <b-card-text class="text">{{ doctor.university }}</b-card-text>
          <b-card-text class="text">{{ doctor.city }}</b-card-text>
        <b-card-text class="text">{{ doctor.workAddress }}</b-card-text>
        <b-card-text class="text">{{ doctor.phone }}</b-card-text>
        <b-card-text class="text">{{ doctor.email }}</b-card-text>
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
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  margin-left: 50px;
  margin-top: 20px;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}
.text {
  text-align: left;
  width: 200px;
  margin-right: auto;
}
</style>

<script>

import axios from "axios";
import jwt_decode from "jwt-decode";
import image from "@/assets/doctor.jpg"

export default {
  data() {
    return {
      doctor: [],
      mainProps: { blank: true, blankColor: '#A6CEE3', width: 150, height: 150, class: 'm1' }

    }
  },
  computed: {
    image() {
      return image
    }
  },
  mounted() {
    const token = localStorage.jwt
    const decoded = jwt_decode(token)
    const doctorId = decoded._id
    localStorage.doctorId = doctorId
    axios
        .get("http://localhost:5000/doctor/" + doctorId)
        .then(response => {
          this.doctor = response.data
        })
        .catch(err => {
           if (err.request) {
            alert(this.$t('err-lost-connection'))
          } else {
            alert(this.$t('err-other'))
          }
        })
  }
}
</script>

