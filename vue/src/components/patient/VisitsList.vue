<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <b-card-text style="color: #248F99; font-size: 25px;  margin-right: auto; margin-left: 700px;">{{$t('visits')}}</b-card-text>
      <div style="width: 100%; text-align: center" v-if="visists.length < 1">{{$t('not-found')}}</div>
      <VisitsListCard
          v-for="visit in visists"
          :key="visit._id"
          :visit_data="visit"/>
    </b-card-group>
  </div>
</template>

<script>
import VisitsListCard from "@/components/patient/VisitsListCard";
import NavBar from "@/components/navbar/NavbarPatient"

import axios from "axios";


export default {
  name: 'VisitsList',
  data() {
    return {
      visists: [],
    }
  },
  components: {
    NavBar,
    VisitsListCard
  },
  mounted() {
    axios
        .get("http://localhost:5000/schedule/patient/" + localStorage.patientId)
        .then(response => {
          this.visists = response.data.schedule
        })
  },
}
</script>