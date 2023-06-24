<template>
  <q-img
    :src="bigLogo"
    style="height: 200px; max-width: 300px"
  />
  <!-- <q-btn
    label="lagre i firebase"
    @click="saveInFirebase"
  /> -->

  <q-card style="width: 300px;">
    <q-card-section>
      <div class="text-h6">Login</div>
      <q-input
        outlined
        v-model="email"
        label="Email"
        class="q-mt-md"
      />
      <q-input
        outlined
        v-model="password"
        label="Password"
        type="password"
        class="q-mt-md"
      />
      <q-btn
        @click="handleLogin"
        color="primary"
        class="full-width q-mt-md text-black"
      >Sign in</q-btn>

      <q-btn
        @click="handleLogout"
        color="primary"
        class="full-width q-mt-md text-black"
      >Log out</q-btn>

    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../../stores/UserStore';

import theBigLogo from '../../assets/logo_1.svg';
const userStore = useUserStore();

const bigLogo = theBigLogo

// const saveInFirebase = () => {
//   let date = Date.now() + 9900000
//   console.log(date)
// }

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  await userStore.login(email.value, password.value);
};

const handleLogout = async () => {
  await userStore.logout()
}

</script>

<style scoped></style>