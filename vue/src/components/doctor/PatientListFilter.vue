<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <div style="margin-left: 50px">
        <b-dropdown id="dropdown-grouped" text="Фільтрувати за:" class="m-2"
                    variant="outline-info" :disabled="patients.length < 1">
          <b-dropdown-item-button >Всі </b-dropdown-item-button>
          <b-dropdown-item-button>
            Another Non-grouped Item
          </b-dropdown-item-button>
        </b-dropdown>
      </div>
      <b-card-text variant="info"
                   style="margin-left: auto; font-size: 25px; color: #248F99"
      >{{$t('patients')}}</b-card-text>
      <b-button variant="info" style="margin-left: auto; margin-right: 50px" v-on:click="move_to_requests">{{$t('requests')}}</b-button>
      <div v-if="patients.length < 1">{{$t('not-found')}}</div>

      <PatientsListFilterCard
          v-for="patient in patients"
          :key="patient._id"
          :patient_data="patient"/>
    </b-card-group>
  </div>
</template>

<script>
import PatientsListFilterCard from "@/components/doctor/PatientsListFilterCard";
import NavBar from "@/components/navbar/NavbarDoctor"

import axios from "axios";

const url = "http://localhost:5000/"

export default {
  name: 'Patients',
  data() {
    return {
      patients: [],
      state: [],
      questionnaire: []
    }
  },
  components: {
    NavBar,
    PatientsListFilterCard
  },
  methods: {
    move_to_requests() {
      this.$router.push('/requests')
    },
    patients_state() {
      for (let i=0; i<this.patients.length; i++) {
        axios.get( 'http://localhost:5000/pulse/now/' + this.patients[i]._id)
        .then(response => {
          this.patients[i].pulse = response.data.pulse
          this.patients[i].temperature = response.data.temperature
        })
        .catch(err => {
        if (err.response.status === 404) {
          this.patients[i].pulse = this.$t('undefined')
          this.patients[i].temperature = this.$t('undefined')
        }
        })
      }
      }
  },
  mounted() {
    axios
        .get(url + "patient/search/" + localStorage.doctorId)
        .then(response => {
          this.patients = response.data.patient
          this.patients_state()
          console.log(this.patients)
        })
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