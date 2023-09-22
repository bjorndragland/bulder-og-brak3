<template>
  <!-- flat -->
  <!-- bordered -->
  <q-card
    flat
    class="my-card q-my-md"
    bordered
  >
    <q-card-section>

      {{ props.setName }}
      {{ props.setActive }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
// import { computed } from 'vue';

const props = defineProps(
  {
    setName: {
      required: true,
      type: String
    },
    setActive: {
      required: true,
      type: Boolean
    },
  }
)



</script>

<style scoped>
.my-card:hover {
  /* max-width: 250px; */
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
  /* Slightly darken the background on hover */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Add a box-shadow on hover */
  transition: background-color 0.3s, box-shadow 0.3s;
  /* Animate the hover effect */

}
</style>