<template>
  <div>
    <NavBar/>
    <ParentCard/>
  </div>
</template>

<script>
import ParentCard from "@/components/patient/ParentCard";
import NavBar from "@/components/navbar/NavbarPatient"
export default {
  name: 'ParentCard',
  components: {
    NavBar,
    ParentCard
  }
}
</script>