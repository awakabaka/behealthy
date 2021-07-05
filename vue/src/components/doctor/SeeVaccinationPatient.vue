<template>
  <div>
    <NavBar/>
    <VaccinationCard/>
  </div>
</template>

<script>
import VaccinationCard from "@/components/patient/VaccinationCard";
import NavBar from "@/components/navbar/NavbarDoctor"
export default {
  name: 'SeeVaccinationPatient',
  components: {
    NavBar,
    VaccinationCard
  }
}
</script>