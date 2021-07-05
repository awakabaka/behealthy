<template>
  <div>
    <NavBar/>
    <div class="row" style="max-width: 1500px">
      <div class="flex-column">
        <ProfileCard/>
      </div>
      <div class="flex-column">
        <HistoryPreview/>
        <Metrics/>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "@/components/doctor/ProfilePatientWithPatent";
import NavBar from "@/components/navbar/NavbarDoctor";
import HistoryPreview from "@/components/patient/HistoryPreview";
import Metrics from "@/views/Metrics";

export default {
  name: 'SeeProfilePatient',
  components: {
    NavBar,
    ProfileCard,
    HistoryPreview,
    Metrics
  }
}
</script>

