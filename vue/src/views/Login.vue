<template>
  <div>
    <NavBar/>
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from "@/components/forms/LoginForm";
import NavBar from "@/components/navbar/NavbarLogin"
export default {
  name: 'Login',
  components: {
    NavBar,
    LoginForm
  }
}
</script>