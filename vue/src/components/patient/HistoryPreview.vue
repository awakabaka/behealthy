<template>
  <div>
    <div class="profile" style="width: 1050px; max-width: 1050px">
      <div style="margin-left: 20px; text-align: start; font-size: 18px; color: #2c3e50">{{ $t('history') }}</div>
      <b-card-group class="row">
        <div style="margin-left: 36px" v-if="stories.length < 1">{{$t('not-found')}}</div>
      <HistoryPreviewCard
          v-for="history in stories"
          :key="history._id"
          :patient_data="history"/>
    </b-card-group>
    </div>
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
  padding-bottom: 20px;
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
import HistoryPreviewCard from "@/components/patient/HistoryPreviewCard";

import axios from "axios";

const url = "http://localhost:5000/"

export default {
  name: 'HistoryPreview',
  data() {
    return {
      stories: []
    }
  },
  components: {
    HistoryPreviewCard
  },
  mounted() {
    axios
        .get(url + "visit/preview/" + localStorage.patientId)
        .then(response => this.stories = response.data.visits)
        .catch(err => {
          if (err.response.status === 404) {

            this.$toast.warning(this.$t('history-not-found'), {
              duration: 7000,
              pauseOnHover: true
            })

          } else if (err.request) {
            alert(this.$t('err-lost-connection'))
          } else {
            alert(this.$t('err-other'))
          }
        })
  }
}
</script>