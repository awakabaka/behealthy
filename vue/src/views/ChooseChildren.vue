<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <ChooseChild
          v-for="patient in patients"
          :key="patient._id"
          :patient_data="patient"/>
      <b-icon-plus v-on:click="add_child"
                   font-scale="7.5"
                   style="margin-top: 5rem;"/>
    </b-card-group>
  </div>
</template>

<script>
import ChooseChild from "@/components/patient/ChooseChild";
import NavBar from "@/components/navbar/Navbar"

import axios from "axios";
import jwt_decode from "jwt-decode";

const url = "http://localhost:5000/"

export default {
  name: 'ChooseChildren',
  data() {
    return {
      patients: []
    }
  },
  components: {
    NavBar,
    ChooseChild
  },
  methods: {
    add_child() {
      this.$router.push('/addchild')
    },
  },
  mounted() {
    const token = localStorage.jwt
    const decoded = jwt_decode(token)
    const parentId = decoded.parentId
    axios
        .get(url + "patient/children/" + parentId)
        .then(response => this.patients = response.data.patient)
  }

}
</script>