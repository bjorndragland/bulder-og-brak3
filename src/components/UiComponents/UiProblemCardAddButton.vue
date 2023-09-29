<template>
  <!-- flat -->
  <q-card bordered class="my-card q-my-md" @click="onClick">
    <q-card-section class="q-py-sm row bg-grey-3">
      <div class="col-2">
        <q-icon color="green-10" name="add_circle" size="32px" />
      </div>
      <div class="col-10 text-subtitle2 q-pt-xs text-weight-bold">
        Legg til nytt problem
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const emit = defineEmits<(event: "clicked") => void>();

const onClick = () => {
  emit("clicked");
};
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
