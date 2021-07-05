<template>
  <div>
    <Navbar/>
    <div class="row">
    <DoctorProfileCard/>
    <DoctorScheduleCard/>
    </div>
  </div>

</template>

<script>
import Navbar from "@/components/navbar/NavbarDoctor";
import DoctorProfileCard from "@/components/doctor/DoctorProfileCard";
import DoctorScheduleCard from "@/components/doctor/DoctorScheduleCard";

export default {
  name: 'DoctorProfile',
  components: {
    Navbar,
    DoctorProfileCard,
    DoctorScheduleCard
  }
}
</script>