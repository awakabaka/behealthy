<template>
  <div>
    <NavBar/>
    <RegisterForm/>
  </div>
</template>

<script>
import RegisterForm from "@/components/forms/RegisterFormPatient";
import NavBar from "@/components/navbar/NavbarLogin"
export default {
  name: 'Register',
  components: {
    NavBar,
    RegisterForm
  }
}
</script>