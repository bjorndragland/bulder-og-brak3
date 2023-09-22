// import type HoldMarker from '../types/HoldMarker'
import type State from "../types/State";

import { defineStore } from "pinia";
import db from "../firebase/init";
import { get, set, ref as dbRef } from "firebase/database";
import { getAuth } from "firebase/auth";
// import { useUserStore } from "./UserStore"
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export const useSvgMarkerStore = defineStore("SvgMarkerStore", {
  state: (): State => ({
    lastSize: "S",
    lastType: "middle",
    selectedHoldId: "",
    selectedHoldFBId: 0,
    appState: "info",
    currentSet: "s10001",
    currentProblem: 0,
    problemsFB: {},
    problemsLocal: {},
    problemSortOrder: [],
    problemHoldsFB: {},
    setsFB: {},
    newProblem: {},
    newProblemHolds: {},
    wallWidth: 3.1,
    markerScale: 4,
    zoomFactor: 100,
    isLoading: true,
    holdSizeDefaults: [
      { id: 0, name: "XS", radius: 10 },
      { id: 1, name: "S", radius: 13 },
      { id: 2, name: "M", radius: 16 },
      { id: 3, name: "L", radius: 21 },
      { id: 4, name: "XL", radius: 26 },
    ],
    imageUrl: "null",
    tab: "tab2",
  }),
  getters: {},
  actions: {
    async fetchImageUrl(imagePath: string) {
      const storage = getStorage();
      const imageRef = storageRef(storage, imagePath);

      try {
        const url = await getDownloadURL(imageRef);
        this.imageUrl = url;
      } catch (error) {
        console.error("error");
      }
    },

    async fetchUserData() {
      const auth = getAuth();
      if (auth.currentUser) {
        // await this.fetchUser(auth.currentUser.uid);
        console.log("User is authenticated");
      } else {
        console.log("User is not authenticated");
      }
    },

    async fetchProblemsFromFB() {
      const problemsRef = dbRef(db, "problems");
      const snapshot = await get(problemsRef);
      if (snapshot.exists()) {
        this.problemsFB = snapshot.val();
        // hent holds fra første problem
        const firstProblemId = Object.keys(snapshot.val())[0];
        this.currentProblem = firstProblemId;
        this.isLoading = false;
        this.fetchProblemHoldsFromObject();
      } else {
        this.isLoading = false;
      }
    },

    async fetchProblemHoldsFromObject() {
      this.problemHoldsFB = this.problemsFB[this.currentProblem].problemHolds;
    },

    async fetchSetsFromFB() {
      console.log("hello y");
      const setsRef = dbRef(db, "sets");
      const snapshot = await get(setsRef);
      if (snapshot.exists()) {
        this.setsFB = snapshot.val();
      }
    },

    async saveInfoBackToFirebase() {
      const idToRef = this.currentProblem;
      const objProbToSave = this.problemsFB[this.currentProblem];
      objProbToSave.problemHolds = this.problemHoldsFB;
      set(dbRef(db, "problems/" + idToRef), objProbToSave);
    },

    deleteCurrentProblemFromFB: function () {
      const idToRef = this.currentProblem;
      // set(dbRef(db, 'problemHolds/' + idToRef),
      //   null
      // )
      set(dbRef(db, "problems/" + idToRef), null);
    },
    deleteCurrentProblemFromLocal: function () {
      const idToRef = this.currentProblem;
      this.problemHoldsFB = {};
      delete this.problemsFB[idToRef];
    },

    createNewProblem: function () {
      const auth = getAuth();
      let userIdFB: string;
      if (auth.currentUser) {
        userIdFB = auth.currentUser.uid;
      } else {
        userIdFB = "tom";
      }
      const newProbObject = {
        name: "ny bulder",
        description: "",
        grade: "5",
        gradeNum: 4,
        createdAt: "i dag",
        setter: "Bjørn",
        image: "",
        set: "334",
        updatedAt: "i dag",
        userId: userIdFB,
        problemHolds: {},
      };

      const idRandom = Math.round(Math.random() * 1000000000).toString();
      console.log(idRandom);

      this.problemsFB[idRandom] = newProbObject;
      this.currentProblem = idRandom;

      this.appState = "edit";
      this.tab = "tab3";
    },

    moveMarkerFBX: function (id: number, valueX: number) {
      this.problemHoldsFB[id].posX = Math.round(valueX);
    },
    moveMarkerFBY: function (id: number, valueY: number) {
      this.problemHoldsFB[id].posY = Math.round(valueY);
    },

    nudgeMarkerXPlusFB: function () {
      this.problemHoldsFB[this.selectedHoldFBId].posX += 3;
    },

    nudgeMarkerXMinusFB: function () {
      this.problemHoldsFB[this.selectedHoldFBId].posX -= 3;
    },

    nudgeMarkerYPlusFB: function () {
      this.problemHoldsFB[this.selectedHoldFBId].posY -= 3;
    },

    nudgeMarkerYminusFB: function () {
      this.problemHoldsFB[this.selectedHoldFBId].posY += 3;
    },

    changeHoldSizeOfSelected: function (holdSizeNum: number) {
      const result = this.holdSizeDefaults.find(({ id }) => id === holdSizeNum);
      this.problemHoldsFB[this.selectedHoldFBId].size = result!.name;
      this.lastSize = result!.name;
    },

    changeHoldTypeOfSelected: function (holdType: string) {
      this.problemHoldsFB[this.selectedHoldFBId].type = holdType;
      this.lastType = holdType;
    },

    deleteSelectedHold: function () {
      delete this.problemHoldsFB[this.selectedHoldFBId];
    },

    // sortProblems: function (sorting: string) {
    // }
  },
});
