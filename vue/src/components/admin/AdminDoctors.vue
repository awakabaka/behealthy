<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <AdminDoctorCard
          v-for="doctor in doctors"
          :key="doctor._id"
          :doctor_data="doctor"/>
    </b-card-group>
  </div>
</template>

<script>
import AdminDoctorCard from "@/components/admin/AdminDoctorCard";
import NavBar from "@/components/navbar/NavbarAdmin"

import axios from "axios";

const url = "http://localhost:5000/"

export default {
  name: 'AdminDoctor',
  data() {
    return {
      doctors: [],
    }
  },
  components: {
    NavBar,
    AdminDoctorCard
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