<template>
  <q-card flat class="my-card">
    <div class="q-mt-sm q-mb-none">
      <UiGradeBadge problemGrade="6A+" :problemGradeNum="value" />
    </div>
    <q-card-section class="q-mt-none">
      <q-slider
        v-model="value"
        color="black"
        markers
        :marker-labels="objGradeLabel"
        :min="0"
        :max="16"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import UiGradeBadge from "./UiGradeBadge.vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Number,
    required: false,
    default: 0,
  },
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

// const gradeModel = ref(0);
const objGradeLabel = {
  0: "3",
  2: "4",
  4: "5",
  6: "6A",
  8: "6B",
  10: "6C",
  12: "7A",
  14: "7B",
  16: "7C",
};
</script>

<style scoped></style>
