<template>
  <div>
    <NavBar/>
    <div class="row" style="max-width: 1500px">
      <div class="flex-column">
        <ProfileCard/>
    </div>
  </div>
  </div>
</template>

<script>
import ProfileCard from "@/components/patient/ProfileCard";
import NavBar from "@/components/navbar/NavbarDoctor";


export default {
  name: 'PatientProfile',
  components: {
    NavBar,
    ProfileCard,
  }
}
</script>

