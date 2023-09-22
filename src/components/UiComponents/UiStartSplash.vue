<template>
  <div class="splash-screen">
    <div class="splash-item1">
      <q-img :src="bigLogo" height="240px" width="300px" />
      <!-- class="splash-logo" -->
    </div>
    <div class="splash-item2">
      <p class="loading-text">Laster buldere...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import theBigLogo from "../../assets/logo_1.svg";
const bigLogo = theBigLogo;
</script>

<style scoped>
.splash-screen {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #0277bd;
}

.splash-item1 {
  margin: 5px;
  width: 100%;
  height: 230px;
  text-align: center;
}

.splash-logo {
  height: 230px;
  max-width: 300px;
  text-align: center;
}

.splash-item2 {
  align-self: flex-start;
  margin: 5px;
  width: 100%;
  height: 90px;
}

.loading-text {
  text-align: center;
  color: white;
  font-size: 1.3em;
}
</style>
