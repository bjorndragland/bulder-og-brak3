<template>
  <div>toom så lenge</div>
  <p class="q-mb-none q-mt-md">
    Ca vist bredde på bildet i virkeligheten i meter
  </p>
  <q-input
    v-model="svgMarkerStore.wallWidth"
    color="black"
    dense
    outlined
  />
</template>

<script setup lang="ts">
import { useSvgMarkerStore } from '../../stores/SvgMarkerStore'
const svgMarkerStore = useSvgMarkerStore();

</script>

<style scoped></style>