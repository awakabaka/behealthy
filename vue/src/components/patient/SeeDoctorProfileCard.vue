<template>
  <div>
    <b-card
        style="width: 900px; height: 500px"
        class="profiledc">
      <div class="row">
        <div class="flex-column" style="margin-bottom: auto; max-width: 200px;">
          <div class="column" style="margin-left: 60px; width: 100px;">
            <img :src="image" rounded="circle" style="max-width: 200px; max-height: 200px">
          </div>
        </div>
        <div class="flex-column" style="margin-left: 200px">
          <b-card-text class="textdc">{{ $t('name') }}</b-card-text>
          <b-card-text class="textdc">{{ $t('specialty') }}</b-card-text>
          <b-card-text class="textdc">{{ $t('specialization') }}</b-card-text>
          <b-card-text class="textdc">{{ $t('university') }}</b-card-text>
          <b-card-text class="textdc">{{ $t('city') }}</b-card-text>
          <b-card-text class="textdc">{{ $t('workAddress') }}</b-card-text>
          <b-card-text class="textdc">{{ $t('phone') }}</b-card-text>
          <b-card-text class="textdc">{{ $t('email') }}</b-card-text>
        </div>
        <div class="flex-column">
          <b-card-text class="textdc">{{ doctor.name }}</b-card-text>
          <b-card-text class="textdc">{{ doctor.specialty }}</b-card-text>
          <b-card-text class="textdc">{{ doctor.specialization }}</b-card-text>
          <b-card-text class="textdc">{{ doctor.university }}</b-card-text>
          <b-card-text class="textdc">{{ doctor.city }}</b-card-text>
          <b-card-text class="textdc">{{ doctor.workAddress }}</b-card-text>
          <b-card-text class="textdc">{{ doctor.phone }}</b-card-text>
          <b-card-text class="textdc">{{ doctor.email }}</b-card-text>
        </div>
      </div>
    </b-card>
  </div>
</template>

<style>
.profiledc {
  border: 1px;
  border-style: solid;
  border-color: #5FDBE9;
  padding-top: 31px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  margin-left: 50px;
  margin-top: 20px;
  padding-bottom: 35px;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}
.textdc {
  text-align: left;
  width: 200px;
  margin-right: auto;
  font-size: 20px;
  margin-bottom: 15px;
}
</style>

<script>

import axios from "axios";
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
    axios
        .get("http://localhost:5000/doctor/" + localStorage.doctorId)
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

