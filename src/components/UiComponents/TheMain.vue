<template>
  <q-header
    class="body--light text-primary"
    elevated
  >
    <q-toolbar>
      <q-img
        :src="siteLogo"
        spinner-color="white"
        style="height: 34px; max-width: 56px"
      />
      <q-space />

      <q-tabs
        v-model="svgMarkerStore.tab"
        shrink
      >
        <q-tab
          name="tab1"
          class="q-px-xs text-black"
        >
          <SvgIconWall2 />
        </q-tab>

        <q-tab
          name="tab2"
          class="q-px-xs text-black"
        >
          <SvgIconWallList2 />
        </q-tab>

        <q-tab
          name="tab3"
          class="q-px-xs text-black"
        >
          <SvgIconWallClimber2 />
        </q-tab>

        <q-tab
          name="tab4"
          class="q-px-xs text-black"
        >
          <SvgIconClimber />
        </q-tab>
      </q-tabs>
    </q-toolbar>
  </q-header>

  <q-page-container>
    <q-tab-panels
      v-model="svgMarkerStore.tab"
      animated
    >
      <q-tab-panel name="tab1">
        <UiTabWallSettings />
      </q-tab-panel>

      <q-tab-panel name="tab2">
        <UiTabProblemList />
      </q-tab-panel>

      <q-tab-panel
        name="tab3"
        class="q-pt-xs"
      >
        <UiTabProblemClimb />
      </q-tab-panel>

      <q-tab-panel
        name="tab4"
        class="bg-light-blue-9"
      >
        <q-img
          :src="bigLogo"
          style="height: 200px; max-width: 300px"
        />
        <q-btn
          label="lagre i firebase"
          @click="saveInFirebase"
        />

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



      </q-tab-panel>
    </q-tab-panels>
  </q-page-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSvgMarkerStore } from '../../stores/SvgMarkerStore'
import { useUserStore } from '../../stores/UserStore';

import SvgIconWall2 from '@/components/SvgComponents/SvgIconWall2.vue'
import SvgIconWallList2 from '@/components/SvgComponents/SvgIconWallList2.vue'
import SvgIconWallClimber2 from '@/components/SvgComponents/SvgIconWallClimber2.vue'
import SvgIconClimber from '@/components/SvgComponents/SvgIconClimber.vue'
import theLogo from '../../assets/logo_3.1.svg';
import theBigLogo from '../../assets/logo_1.svg';
import UiTabWallSettings from './UiTabWallSettings.vue'
import UiTabProblemList from './UiTabProblemList.vue'
import UiTabProblemClimb from './UiTabProblemClimb.vue'


const bigLogo = theBigLogo
const siteLogo = theLogo;
const svgMarkerStore = useSvgMarkerStore();
const userStore = useUserStore();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  await userStore.login(email.value, password.value);
};

const handleLogout = async () => {
  await userStore.logout()
}


const saveInFirebase = () => {
  let date = Date.now() + 9900000
  console.log(date)
}



</script>

<style scoped>
</style>