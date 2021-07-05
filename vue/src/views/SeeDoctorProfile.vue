<template>
  <div>
    <NavBar/>
    <div class="row">
      <SeeDoctorProfileCard/>
      <MakeAnVisit/>
    </div>
  </div>
</template>

<script>

import NavBar from "@/components/navbar/NavbarPatient"
import SeeDoctorProfileCard from "@/components/patient/SeeDoctorProfileCard";
import MakeAnVisit from "@/components/patient/MakeAnVisit";

export default {
  name: 'SeeDoctorProfile',
  components: {
    NavBar,
    SeeDoctorProfileCard,
    MakeAnVisit
  }
}
</script>