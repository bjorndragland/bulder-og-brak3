<template>
  <!-- flat -->
  <!-- bordered -->
  <q-card flat class="my-card q-my-md" bordered>
    <div class="row">
      <q-img
        :src="$props.setImage"
        style="height: 120px; max-width: 130px"
      ></q-img>
      <div class="q-ml-md">
        <div class="text-subtitle2 text-weight-bold q-pt-xs">
          {{ props.setCreatedAt }} - {{ props.setEndedAt }}
        </div>

        {{ props.setName }}
        {{ props.setActive }}
        <br />
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
// import { computed } from 'vue';

const props = defineProps({
  setName: {
    required: true,
    type: String,
  },
  setImage: {
    required: true,
    type: String,
  },
  setActive: {
    required: true,
    type: Boolean,
  },
  setCreatedAt: {
    required: true,
    type: String,
  },
  setEndedAt: {
    required: true,
    type: String,
  },
});
</script>

<style scoped>
.my-card:hover {
  /* max-width: 250px; */
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
  /* Slightly darken the background on hover */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Add a box-shadow on hover */
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  /* Animate the hover effect */
}
</style>
