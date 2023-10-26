<template>
  <q-dialog
    v-model="svgMarkerStore.addSetDialog"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Vegg / sett
          <q-btn
            @click="svgMarkerStore.addSetDialog = false"
            round
            flat
            class="q-px-xs q-mr-xs bg-white float-right"
            icon="close"
          ></q-btn>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <p class="q-mb-none q-mt-xs">Bilde</p>
        <q-btn @click="uploadImage">lastopp</q-btn>
        <q-file v-model="file" dense outlined>
          <template v-slot:append>
            <q-icon name="image" />
          </template>
        </q-file>
        <!-- :src="svgMarkerStore.setImageUrls[svgMarkerStore.showSet]" -->
        <q-img
          class="q-mt-xs"
          :src="imageUrl?.toString()"
          style="height: 50%; max-width: 50%"
        >
        </q-img>

        <p class="q-mb-none q-mt-md">Beskrivelse</p>
        <q-input
          v-model="selectedSetFB.description"
          color="black"
          dense
          outlined
        />

        <p class="q-mb-none q-mt-md">Aktiv</p>
        <q-checkbox keep-color v-model="val" color="blue-8" />

        <p class="q-mb-none q-mt-md">Startdato</p>
        <div class="row">
          <q-input
            class="q-pr-sm"
            dense
            outlined
            hide-bottom-space
            v-model="createDate"
            mask="##/##/####"
            :rules="[dateRule]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="createDate"
                    color="light-blue-9"
                    mask="DD/MM/YYYY"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="light-blue-9"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-btn
            disabled
            class="q-px-xs q-mr-xs"
            padding="sm"
            @click="
              selectedSetFB.createdAt =
                svgMarkerStore.inputTodaysDate().dateString
            "
            >i dag</q-btn
          >
        </div>

        <p class="q-mb-none q-mt-md">Sluttdato</p>
        <div class="row">
          <!-- v-model="selectedSetFB.endedAt" -->
          <q-input
            class="q-pr-sm"
            dense
            outlined
            hide-bottom-space
            v-model="endDate"
            mask="##/##/####"
            :rules="[dateRule]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <!-- v-model="selectedSetFB.endedAt" -->
                  <q-date
                    v-model="endDate"
                    dateForPicker
                    color="light-blue-9"
                    mask="DD/MM/YYYY"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="light-blue-9"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-btn
            disabled
            class="q-px-xs q-mr-xs"
            padding="sm"
            @click="
              selectedSetFB.endedAt =
                svgMarkerStore.inputTodaysDate().dateString
            "
            >i dag</q-btn
          >
        </div>

        <q-btn
          class="q-mb-none q-mt-md"
          color="red"
          label="Slett"
          icon="delete"
          @click="deleteCurrentSet"
        />

        <q-btn class="q-mb-none q-mt-md" color="black" label="avbryt" />

        <q-btn
          class="q-mb-none q-mt-md"
          color="green"
          label="lagre"
          icon="done"
          @click="saveSetBackToFirebase"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
import {
  getStorage,
  ref as storageRefFB,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const svgMarkerStore = useSvgMarkerStore();
const file = ref<File | null>(null);
const imageUrl = ref<string | null>(null);
// const desc = ref("halloen");
const val = ref(false);
// const dateStarted = ref("01/02/2023");
// const dateEnded = ref("23/07/2023");

const dateRule = (val: string) => {
  const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return pattern.test(val) || "Date format must be DD/MM/YYYY";
};

const createDate = computed({
  get() {
    const date = new Date(
      svgMarkerStore.setsFB[svgMarkerStore.showSet].createdAtNum,
    );
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  },
  set(value) {
    const [day, month, year] = value.split("/").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    svgMarkerStore.setsFB[svgMarkerStore.showSet].createdAtNum = date.getTime();
  },
});

const endDate = computed({
  get() {
    const date = new Date(
      svgMarkerStore.setsFB[svgMarkerStore.showSet].endedAtNum,
    );
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  },
  set(value) {
    const [day, month, year] = value.split("/").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    svgMarkerStore.setsFB[svgMarkerStore.showSet].endedAtNum = date.getTime();
  },
});

const selectedSetFB = computed(() => {
  return svgMarkerStore.setsFB[svgMarkerStore.showSet];
});

const deleteCurrentSet = () => {
  console.log("deletos");
};

const uploadImage = async () => {
  if (!file.value) return;
  const storage = getStorage();
  const imageRef = storageRefFB(storage, "images/" + file.value.name);
  try {
    uploadBytesResumable(imageRef, file.value).then(async () => {
      imageUrl.value = await getDownloadURL(imageRef);
      console.log(imageUrl);
    });
  } catch {
    console.log("feilet!");
  }
};

const saveSetBackToFirebase = () => {
  console.log("saveos");
};
</script>

<style scoped></style>
