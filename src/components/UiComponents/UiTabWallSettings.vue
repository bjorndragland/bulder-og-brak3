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

  <q-file
    v-model="file"
    dense
    
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSvgMarkerStore } from '../../stores/SvgMarkerStore'
const svgMarkerStore = useSvgMarkerStore();
const file = ref(null);


</script>

<style scoped></style>