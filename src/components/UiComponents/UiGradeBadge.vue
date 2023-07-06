<template>
  <div :class="arrayOfColors[props.problemGradeNum].color">
    {{ arrayOfColors[props.problemGradeNum].grade }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps(
  {
    problemGrade: {
      required: true,
      type: String
    },
    problemGradeNum: {
      required: true,
      type: Number,
      default: 3
    }
  }
)

const arrayOfColors = [
  { grade: "3", color: "white-grade col-4 text-weight-bold" },
  { grade: "3+", color: "white-grade col-4 text-weight-bold" },
  { grade: "4", color: "green-grade col-4 text-weight-bold" },
  { grade: "4+", color: "green-grade col-4 text-weight-bold" },
  { grade: "5", color: "blue-grade col-4 text-weight-bold" },
  { grade: "5+", color: "blue-grade col-4 text-weight-bold" },
  { grade: "6A", color: "blue-grade col-4 text-weight-bold" },
  { grade: "6A+", color: "yellow-grade col-4 text-weight-bold" },
  { grade: "6B", color: "yellow-grade col-4 text-weight-bold" },
  { grade: "6B+", color: "yellow-grade col-4 text-weight-bold" },
  { grade: "6C", color: "red-grade col-4 text-weight-bold" },
  { grade: "6C+", color: "red-grade col-4 text-weight-bold" },
  { grade: "7A", color: "red-grade col-4 text-weight-bold" },
  { grade: "7A+", color: "red-grade col-4 text-weight-bold" },
  { grade: "7B", color: "black-grade col-4 text-weight-bold" },
  { grade: "7B+", color: "black-grade col-4 text-weight-bold" },
  { grade: "7C", color: "black-grade col-4 text-weight-bold" },
  { grade: "7C+", color: "black-grade col-4 text-weight-bold" },
  { grade: "8A", color: "black-grade col-4 text-weight-bold" },
  { grade: "8A+", color: "black-grade col-4 text-weight-bold" },
  { grade: "8B", color: "black-grade col-4 text-weight-bold" },
  { grade: "8B+", color: "black-grade col-4 text-weight-bold" },
  { grade: "8C", color: "black-grade col-4 text-weight-bold" },
  { grade: "8C+", color: "black-grade col-4 text-weight-bold" },
  { grade: "9A", color: "black-grade col-4 text-weight-bold" },
]

</script>

<style scoped>
.black-grade {
  background-color: rgb(0, 0, 0);
  height: 24px;
  width: 38px;
  border: 1px solid grey;
  border-radius: 4px;
  text-align: center;
  color: white;
}

.white-grade {
  background-color: rgb(255, 255, 255);
  height: 24px;
  width: 38px;
  border: 1px solid grey;
  border-radius: 4px;
  text-align: center;
}

.red-grade {
  background-color: rgb(255, 173, 173);
  height: 24px;
  width: 38px;
  border: 1px solid grey;
  border-radius: 4px;
  text-align: center;
}

.green-grade {
  background-color: rgb(168, 251, 168);
  height: 24px;
  width: 38px;
  border: 1px solid grey;
  border-radius: 4px;
  text-align: center;
}

.blue-grade {
  background-color: rgb(152, 205, 255);
  height: 24px;
  width: 38px;
  border: 1px solid grey;
  border-radius: 4px;
  text-align: center;
}

.yellow-grade {
  background-color: rgb(253, 255, 159);
  height: 24px;
  width: 38px;
  border: 1px solid grey;
  border-radius: 4px;
  text-align: center;
}
</style>