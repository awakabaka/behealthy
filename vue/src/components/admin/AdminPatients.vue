<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <AdminPatientCard
          v-for="patient in patients"
          :key="patient._id"
          :patient_data="patient"/>
    </b-card-group>
  </div>
</template>

<script>
import AdminPatientCard from "@/components/admin/AdminPatientCard";
import NavBar from "@/components/navbar/NavbarAdmin"

import axios from "axios";

const url = "http://localhost:5000/"

export default {
  name: 'AdminPatients',
  data() {
    return {
      patients: [],
    }
  },
  components: {
    NavBar,
    AdminPatientCard
  },
  mounted() {
    axios
        .get(url + "patient")
        .then(response => {
          this.patients = response.data.patient
        })
  },
}
</script>