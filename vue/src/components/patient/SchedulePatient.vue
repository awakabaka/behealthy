<template>
  <div>
    <b-card
        style="width: 500px; padding-top: 0px; padding-bottom: 5px"
        class="profile">

      <div class="row" style="margin: auto;">
        <b-button v-on:click="set_one" id="08:00" class="slot">08:00</b-button>
        <b-button v-on:click="set_two" id="08:30" class="slot">08:30</b-button>
        <b-button v-on:click="set_three" id="09:00" class="slot">09:00</b-button>
        <b-button v-on:click="set_four" id="09:30" class="slot">09:30</b-button>
      </div>
      <div class="row" style="margin: auto; margin-top: 0px;">
        <b-button v-on:click="set_five" id="10:00" class="slot">10:00</b-button>
        <b-button v-on:click="set_six" id="10:30" class="slot">10:30</b-button>
        <b-button v-on:click="set_seven" id="11:00" class="slot">11:00</b-button>
        <b-button v-on:click="set_eight" id="11:30" class="slot">11:30</b-button>
      </div>
      <div class="row" style="margin: auto; margin-top: 0px;">
        <b-button v-on:click="set_nine" id="13:00" class="slot">13:00</b-button>
        <b-button v-on:click="set_ten" id="13:30" class="slot">13:30</b-button>
        <b-button v-on:click="set_eleven" id="14:00" class="slot">14:00</b-button>
        <b-button v-on:click="set_twelve" id="14:30" class="slot">14:30</b-button>
        <b-button v-on:click="set_thirteen" id="15:00" class="slot">15:00</b-button>
        <b-button v-on:click="set_fourteen" id="15:30" class="slot">15:30</b-button>
        <b-button v-on:click="set_fifeteen" id="16:30" class="slot">16:30</b-button>
        <b-button v-on:click="set_sixteen" id="16:00" class="slot">16:00</b-button>

      </div>
      <div class="flex-row">
        <b-button v-on:click="send_visit" style="width: 60%; margin-top: 10px"
                  :variant="acceptableVerificationStyle" :disabled="acceptableVerification">{{$t('make-an-appointment')}}</b-button>
      </div>
    </b-card>
  </div>
</template>

<style>
.profile {
  margin-left: 50px;
  margin-top: 20px;
  background-color: #FFFFFF;
  color: #248F99;
}
.slot {
  border: 1px;
  border-style: solid;
  border-color: #5FDBE9;
  border-radius: 50px;
  padding-right: 1rem;
  padding-left: 1rem;
  margin: 15px;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      arrayTime: [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30"
      ],
    }
  },
  props: {
    schedule_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    set_one() {
      this.time = "08.00"
    },
    set_two() {
      this.time = "08.30"
    },
    set_three() {
      this.time = "09.00"
    },
    set_four() {
      this.time = "09.30"
    },
    set_five() {
      this.time = "10.00"
    },
    set_six() {
      this.time = "10.30"
    },
    set_seven() {
      this.time = "11.00"
    },
    set_eight() {
      this.time = "11.30"
    },
    set_nine() {
      this.time = "13.00"
    },
    set_ten() {
      this.time = "13.30"
    },
    set_eleven() {
      this.time = "14.00"
    },
    set_twelve() {
      this.time = "14.30"
    },
    set_thirteen() {
      this.time = "15.00"
    },
    set_fourteen() {
      this.time = "15.30"
    },
    set_fifeteen() {
      this.time = "16.00"
    },
    set_sixteen() {
      this.time = "16.30"
    },

  mounted() {
    axios
        .get("http://localhost:5000/schedule/doctor/" + localStorage.doctorId + '/date', {
          date: this.schedule_data.date
        })
        .then(response => {
          this.schedule = response.data
          for (let i=0; i<this.schedule.length; i++) {
            for (let j=0; j<this.arrayTime.length; j++) {
              if (this.schedule[i].time === this.arrayTime[j]) {
                document.getElementById(this.arrayTime[j]).style.background = "#58ABB7"
                document.getElementById(this.arrayTime[j]).style.color = "#FFFFFF"
                document.getElementById(this.arrayTime[j]).disabled = true
              }
            }
          }
        })
        .catch(err => {
          if (err.request) {
            this.$toast(this.$t('err-lost-connection'), {
                  position: "bottom-right",
                  duration: 7000,
                  pauseOnHover: true
                }
            )
          } else {
            this.$toast(this.$t('err-other'), {
              position: "bottom-right",
              duration: 7000,
              pauseOnHover: true
            })

          }
        })
  }}
}
</script>

