<template>
  <div>
    <Navbar/>
    <div class="row">
      <AddVisitCard/>
    </div>
  </div>

</template>

<script>
import Navbar from "@/components/navbar/NavbarDoctor";
import AddVisitCard from "@/components/doctor/AddVisitCard";

export default {
  name: 'NewVisit',
  components: {
    Navbar,
    AddVisitCard
  }
}
</script>