<template>
  <div class="flex-row justify-content-md-center" style="margin: 20px">
    <b-card
        tag="article"
        style="width: 25rem;"
        class="profile"
    >
      <b-img :src="image" style="width: 150px; height: 150px;"></b-img>
      <b-card-group class="flex-column justify-content-center">
          <b-card-text style="margin: 0px; padding-bottom: 5px">{{patient_data.name}}</b-card-text>
          <b-card-text style="margin: 0px;">{{ $d(new Date(patient_data.birthday), "short") }}</b-card-text>
        </b-card-group>
      <b-button href="#" variant="outline-info" style="margin-top: 15px"
                v-on:click="move_to_profile"
      >{{ $t('choose-child-btn') }} </b-button>
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
</style>

<script>

import image from "@/assets/child.png";

export default {
  data() {
    return {
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
  computed: {
    image() {
      return image
    }
  },
  methods: {
    move_to_profile() {
      localStorage.patientId = this.patient_data._id
      this.$router.push('../home')
    }
  }
}
</script>