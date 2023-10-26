<template>
  <!-- flat -->
  <!-- bordered -->
  <q-card flat :class="currentClass">
    <div class="row">
      <SvgThumbnail :problemId="props.problemId" />

      <div class="q-ml-sm">
        <div class="row">
          <UiGradeBadge
            :problemGrade="props.problemGrade"
            :problemGradeNum="props.problemGradeNum"
          />
          <div class="text-subtitle2 text-weight-bold q-ml-sm">
            {{ truncatedText }}
          </div>
        </div>
        <div class="text-caption q-mt-xs">
          {{ props.problemDate }}
        </div>
        <div class="text-caption">
          {{ props.problemCreator }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import UiGradeBadge from "./UiGradeBadge.vue";
import SvgThumbnail from "../SvgComponents/SvgThumbnail.vue";

const currentClass = computed(() => {
  if (props.currentProblem == props.problemId) {
    return "my-card q-my-md bg-blue-grey-1";
  } else {
    return "my-card q-my-md";
  }
});

const truncatedText = computed(() => {
  if (props.problemName.length > 26) {
    const truncString = `${props.problemName.slice(0, 24)}..`;
    return truncString;
  } else {
    return props.problemName;
  }
});

const props = defineProps({
  problemId: {
    required: true,
    type: String,
  },
  problemName: {
    required: true,
    type: String,
  },
  problemGrade: {
    required: true,
    type: String,
  },
  problemGradeNum: {
    required: true,
    type: Number,
  },
  problemDate: {
    required: true,
    type: String,
  },
  problemCreator: {
    required: false,
    type: String,
    default: "Bjørn",
  },
  problemDescription: {
    required: false,
    type: String,
    default: "",
  },
  currentProblem: {
    required: true,
    type: String,
    default: "",
  },
  showDetails: {
    required: true,
    type: Boolean,
    default: false,
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
