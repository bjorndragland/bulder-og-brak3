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

  <div v-for="(value, key) in firebaseSets" :key="key">
    {{ value.name }} og {{ key }} og {{ value.image }}
  </div>


</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSvgMarkerStore } from '../../stores/SvgMarkerStore'
const svgMarkerStore = useSvgMarkerStore();
const file = ref(null);

const firebaseSets = computed(() => {
  return svgMarkerStore.setsFB
})

</script>

<style scoped></style>