<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <AdminDoctorRequestCard
          v-for="doctor in doctors"
          :key="doctor._id"
          :doctor_data="doctor"/>
    </b-card-group>
    <div v-if="doctors.length < 1">{{$t('not-found')}}</div>
  </div>
</template>

<script>
import AdminDoctorRequestCard from "@/components/admin/AdminDoctorRequestCard";
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
    AdminDoctorRequestCard
  },
  mounted() {
    axios
        .get(url + "doctorrequest/")
        .then(response => {
          this.doctors = response.data.doctor
        })
  },
}
</script>