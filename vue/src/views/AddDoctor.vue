<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <AddDoctorCard
          v-for="doctor in doctors"
          :key="doctor._id"
          :doctor_data="doctor"/>
    </b-card-group>
  </div>
</template>

<script>
import AddDoctorCard from "@/components/patient/AddDoctorCard";
import NavBar from "@/components/navbar/NavbarPatient"

import axios from "axios";

const url = "http://localhost:5000/"

export default {
  name: 'AddDoctor',
  data() {
    return {
      doctors: [],
    }
  },
  components: {
    NavBar,
    AddDoctorCard
  },
  mounted() {
    axios
        .get(url + "doctor/")
        .then(response => {
          this.doctors = response.data.doctor
        })
  },
}
</script>