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
          <b-card-text style="margin-bottom: 10px; color: #355454">{{ doctor_data.licence }}</b-card-text>
        </div>
        <div class="column" style="margin-left: auto;">
          <b-button variant="info" v-on:click="move_to_delete">{{ $t('remove') }}</b-button>
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
    return {
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
  },
  methods: {
    move_to_delete() {
      axios
          .delete( 'http://localhost:5000/doctor/' + this.doctor_data._id)
          .then(response => {
            if (response.data) {
              window.location.reload();
              this.$toast.success(this.$t('delete-success'))
            }
          })
          .catch(err => {
            if (err.response) {
              if (err.request) {
                this.$toast.error(this.$t('err-lost-connection'))
              } else {
                this.$toast.error(this.$t('err-other'))
              }
            }
          })
    }
  }
}
</script>