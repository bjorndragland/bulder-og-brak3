<template>
  <!-- <UiStartSplash v-if="svgMarkerStore.isLoading" /> -->
  <!-- <TheMain v-else /> -->
  <TheMain />
</template>

<script setup lang="ts">
import TheMain from "../components/UiComponents/TheMain.vue";
// import UiStartSplash from '../components/UiComponents/UiStartSplash.vue'
// import { ref } from 'vue';
import { useSvgMarkerStore } from "@/stores/SvgMarkerStore";
import { onMounted } from "vue";
const svgMarkerStore = useSvgMarkerStore();

onMounted(async () => {
  // svgMarkerStore.createTimeStampForFirebase()
  await svgMarkerStore.fetchUserData();
  // await svgMarkerStore.fetchImageUrl("images/hjemmeveggen_2_red.jpg");
  await svgMarkerStore.fetchSetsFromFB();
  await svgMarkerStore.fetchSetImageUrlsFromFB();
  await svgMarkerStore.fetchProblemsFromFB();
});

// const isLoading = ref(false)
</script>

<style scoped></style>
