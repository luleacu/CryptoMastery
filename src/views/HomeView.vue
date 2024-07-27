<template>
  <div class="home">
    <LogIn />
    <LogOut/>
  </div>
</template>

<script>

import LogIn from "@/components/LogIn.vue";
import LogOut from "@/components/LogOut.vue";




export default {
  name: 'HomeView',
  components: {
    LogIn,
    LogOut
}
}
</script>
