<template>
  <LineChart v-if="loaded" :chartData="chartData" :options="options"
             style="max-width: 300px; max-height: 300px"/>
</template>

<script>
import LineChart from './Chart'
import axios from 'axios'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      loaded: false,
      data: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: this.$t('temperature'),
            backgroundColor: '#E2B3F9',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.loaded = false
    axios.get("http://localhost:5000/pulse/" + localStorage.patientId)
        .then(res => {
          let temperature = []
          let time = []
          for (let i = 0; i < res.data.puls.length; i++) {
            temperature[i] = res.data.puls[i].temperature
            time[i] = this.$d(new Date(res.data.puls[i].time), "newType")
          }

          this.chartData.labels = time
          this.chartData.datasets[0].data = temperature
          this.loaded = true
        })
  }
}
</script>