<template>
  <div class="profile" style="width: 1050px; max-width: 1050px; height: 395px">
    <div style="margin-left: 20px; margin-bottom: 20px; text-align: start; font-size: 18px; color: #2c3e50">{{ $t('metrics') }}</div>
    <div class="row justify-content-center">
      <div class="flex-column" style="margin: auto">
    <div id="pulseData" style="color: #2c3e50">{{ $t('current-heart-rate') }} {{ pulse }} {{ $t('bpm')}}</div>
      <Pulse/>
      </div>
      <div class="flex-column" style="margin: auto">
        <div id="temperatureData" style="color: #2c3e50">{{ $t('current-temperature-indicators') }} {{ temperature }} ℃</div>
      <Temperature/>
      </div>
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
  margin: 10px;
  text-align: center;

}
</style>

<script>
import Pulse from "@/components/patient/Pulse";
import Temperature from "@/components/patient/Temperature";

import axios from "axios";
export default {
  data() {
    return {
      pulse: "",
      pulseBefore: "",
      temperature: "",
      temperatureBefore: "",
      interval: null
    }
  },
  name: 'Metrics',
  components: {
    Pulse,
    Temperature,
  },
    methods: {
    async getInfo() {
      this.interval = setInterval(async () => {
        axios.get("http://localhost:5000/pulse/now/" + localStorage.patientId)
            .then(response => {
              this.pulse = response.data.pulse
              this.temperature = response.data.temperature
              console.log("p1: ", this.pulse)
              this.checkInfo()
            })
      }, 5000)
    },
      checkInfo() {
      console.log("p2", this.pulseBefore)
      if (this.pulse !== this.pulseBefore) {
        this.getMessageInfo()
        this.pulseBefore = this.pulse
      }
      },
      getMessageInfo() {
        if (this.pulse < 120 || this.pulse > 140) {
          document.getElementById('pulseData').style.color = "red"
          this.$toast.error(this.$t('pulse-warn'), {
            duration: 5000,
            pauseOnHover: true
          })
        } else {
          document.getElementById('pulseData').style.color = "#2c3e50"
        }
        if (this.temperature < 36 || this.temperature > 36.9) {
          document.getElementById('temperatureData').style.color = "red"
          this.$toast.error(this.$t('temperature-warn'), {
            duration: 5000,
            pauseOnHover: true
          })
        } else {
          document.getElementById('temperatureData').style.color = "#2c3e50"
        }
      }
  },
  created() {
    this.getInfo()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    axios.get("http://localhost:5000/pulse/now/" + localStorage.patientId)
        .then(response => {
          this.pulse = response.data.pulse
          this.pulseBefore = response.data.pulse
          this.temperature = response.data.temperature
          this.temperatureBefore = response.data.temperature
          this.getMessageInfo()
        })
        .catch(err => {
          if (err.response.status === 404) {

              this.$toast.warning(this.$t('iot-not-found'), {
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