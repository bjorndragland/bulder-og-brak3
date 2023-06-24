<template>
  <div class="row flex-lg-wrap">
    <div class="col-12 col-md-6"></div>
    <div class="col-12 col-md-6">
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
              <SvgIconWall />
            </q-tab>

            <q-tab
              name="tab2"
              class="q-px-xs text-black"
            >
              <SvgIconWallList />
            </q-tab>

            <q-tab
              name="tab3"
              class="q-px-xs text-black"
            >
              <SvgIconWallClimber />
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

          <q-tab-panel
            name="tab2"
            class="q-pt-xs"
          >
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
            <UiTabUser />

          </q-tab-panel>
        </q-tab-panels>
      </q-page-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSvgMarkerStore } from '../../stores/SvgMarkerStore'
import SvgIconWall from '@/components/SvgComponents/SvgIconWall.vue'
import SvgIconWallList from '@/components/SvgComponents/SvgIconWallList.vue'
import SvgIconWallClimber from '@/components/SvgComponents/SvgIconWallClimber.vue'
import SvgIconClimber from '@/components/SvgComponents/SvgIconClimber.vue'
import theLogo from '../../assets/logo_3.1.svg';
import UiTabWallSettings from './UiTabWallSettings.vue'
import UiTabProblemList from './UiTabProblemList.vue'
import UiTabProblemClimb from './UiTabProblemClimb.vue'
import UiTabUser from './UiTabUser.vue'

const siteLogo = theLogo;
const svgMarkerStore = useSvgMarkerStore();

</script>

<style scoped>
.non-scroll {
  overflow-y: hidden;
}
</style>