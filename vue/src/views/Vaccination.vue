<template>
  <div>
    <NavBar/>
    <VaccinationCard/>
  </div>
</template>

<script>
import VaccinationCard from "@/components/patient/VaccinationCard";
import NavBar from "@/components/navbar/NavbarPatient"
export default {
  name: 'Vaccination',
  components: {
    NavBar,
    VaccinationCard
  }
}
</script>