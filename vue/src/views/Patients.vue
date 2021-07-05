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

      <PatientsCard
          v-for="patient in patients"
          :key="patient._id"
          :patient_data="patient"/>
    </b-card-group>
  </div>
</template>

<script>
import PatientsCard from "@/components/doctor/PatientCard";
import NavBar from "@/components/navbar/NavbarDoctor"

import axios from "axios";

const url = "http://localhost:5000/"

export default {
  name: 'Patients',
  data() {
    return {
      patients: []
    }
  },
  components: {
    NavBar,
    PatientsCard
  },
  methods: {
    move_to_requests() {
      this.$router.push('/requests')
    }
  },
  mounted() {
    axios
        .get(url + "patient/search/" + localStorage.doctorId)
        .then(response => {
          this.patients = response.data.patient
        })
  }
}
</script>