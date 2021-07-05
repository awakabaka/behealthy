<template>
  <div>
    <b-table striped hover :items="patient_data" :fields="fields"></b-table>
    <div v-if="patient_data.length < 1">{{$t('vaccination-not-found')}}</div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      fields: [{key: 'doctorId', label: this.$t('doctor-name')},
        {key: 'name', label: this.$t('name-vaccination')} ,
        {key: 'dose', label: this.$t('dose')},
        {key: 'series', label: this.$t('series')},
        {key: 'reaction', label: this.$t('reaction')},
        {key: 'time', label: this.$t('time')}],
      patient_data: [],
    }
  },
  created() {
    axios
        .get("http://localhost:5000/vaccination/search/" + localStorage.patientId)
        .then(response => {
          this.patient_data = response.data.vaccination
          this.countMonth()
        })
        .catch(err => {
          if (err.response) {
            alert(this.$t('err-wrong-credentials'));
          } else if (err.request) {
            alert(this.$t('err-lost-connection'))
          }
        })
  }
}
</script>