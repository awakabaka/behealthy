<template>
  <div>
    <NavBar/>
    <div class="row" style="max-width: 1500px">
      <div class="flex-column">
        <ProfileCard/>
        <ParentCard/>
      </div>
      <div class="flex-column">
        <HistoryPreview/>
        <Metrics/>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "@/components/patient/ProfileCard";
import NavBar from "@/components/navbar/NavbarPatient";
import ParentCard from "@/components/patient/ParentCard";
import HistoryPreview from "@/components/patient/HistoryPreview";
import Metrics from "@/views/Metrics";

export default {
  name: 'PatientHome',
  components: {
    NavBar,
    ProfileCard,
    ParentCard,
    HistoryPreview,
    Metrics
  }
}
</script>

