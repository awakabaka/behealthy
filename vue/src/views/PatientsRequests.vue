<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <b-card-text style="margin: auto; font-size: 25px; color: #248F99"
      >{{$t('requests')}}</b-card-text>
      <PatientRequestCard
          v-for="request in requests"
          :key="request._id"
          :request_data="request"/>
    </b-card-group>
    <div v-if="requests.length < 1">{{$t('not-found')}}</div>
  </div>
</template>

<script>
import PatientRequestCard from "@/components/doctor/ParientRequestCard";
import NavBar from "@/components/navbar/NavbarDoctor"

import axios from "axios";

const url = "http://localhost:5000/"

export default {
  name: 'PatientsRequests',
  data() {
    return {
      requests: [],
    }
  },
  components: {
    NavBar,
    PatientRequestCard
  },
  mounted() {
    axios
        .get(url + "patientrequest/" + localStorage.doctorId)
        .then(response => {
          this.requests = response.data.request
        })
  },
}
</script>