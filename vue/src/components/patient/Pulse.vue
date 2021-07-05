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
            label: this.$t('pulse'),
            backgroundColor: '#EEA7AE',
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
          let pulse = []
          let time = []
          for (let i = 0; i < res.data.puls.length; i++) {
            pulse[i] = res.data.puls[i].pulse
            time[i] = this.$d(new Date(res.data.puls[i].time), "newType")
          }

          this.chartData.labels = time
          this.chartData.datasets[0].data = pulse
          this.loaded = true
        })
  }
}
</script>