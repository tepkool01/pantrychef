<template>
  <div class="login">
    <h1>Login</h1>
    <login-main></login-main>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginMain from "@/components/LoginMain.vue";

export default {
  name: "login",
  components: {
    LoginMain
  }
};
</script>
