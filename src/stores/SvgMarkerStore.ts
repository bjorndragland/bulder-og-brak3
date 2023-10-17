// import type HoldMarker from '../types/HoldMarker'
import type State from "../types/State";
import type HoldMarkerFB from "../types/HoldMarkerFB";

import { defineStore } from "pinia";
import db from "../firebase/init";
import { get, set, ref as dbRef } from "firebase/database";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export const useSvgMarkerStore = defineStore("SvgMarkerStore", {
  state: (): State => ({
    lastSize: "S",
    lastSizeNum: 1,
    lastType: "middle",
    lastTypeNum: 1,
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
    addSetDialog: true,
  }),
  getters: {
    getHoldSizeOfSelected: (state: State) => {
      if (state.problemHoldsFB[state.selectedHoldFBId]) {
        return state.problemHoldsFB[state.selectedHoldFBId].sizeNum;
      } else {
        return 0;
      }
    },
    getHoldTypeOfSelected: (state: State) => {
      if (state.problemHoldsFB[state.selectedHoldFBId]) {
        return state.problemHoldsFB[state.selectedHoldFBId].typeNum;
      } else {
        return 0;
      }
    },
  },
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
        this.selectedHoldFBId = Number(
          Object.keys(this.problemsFB[firstProblemId].problemHolds)[0],
        );
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
        createdAt: this.inputTodaysDate(),
        setter: "Bjørn",
        image: "",
        set: "334",
        updatedAt: this.inputTodaysDate(),
        userId: userIdFB,
        problemHolds: {} as Record<string, HoldMarkerFB>,
      };

      const tempHoldSpecArray = [
        { sizeNum: 3, typeNum: 2 },
        { sizeNum: 2, typeNum: 1 },
        { sizeNum: 2, typeNum: 0 },
        { sizeNum: 1, typeNum: 3 },
      ];

      for (let i = 0; i < 4; i++) {
        let randomId = Math.floor(Math.random() * 10000000).toString();
        newProbObject.problemHolds[randomId] = {
          posX: 300,
          posY: 300 + i * 180,
          size: "XS",
          sizeNum: tempHoldSpecArray[i].sizeNum,
          // sizeNum: 1,
          type: "foot",
          typeNum: tempHoldSpecArray[i].typeNum,
          // typeNum: 1,
        };
      }

      const idRandom = Math.round(Math.random() * 1000000000).toString();
      console.log(idRandom);

      this.problemsFB[idRandom] = newProbObject;
      this.currentProblem = idRandom;
      this.fetchProblemHoldsFromObject();

      this.appState = "edit";
      this.tab = "tab3";
    },

    inputTodaysDate: function () {
      let curDate = new Date();
      let inputYear = curDate.getFullYear();
      let inputMonth = curDate.getMonth() + 1;
      let inputMonthString;
      let inputDay = curDate.getDate();
      let inputDayString;
      if (inputMonth < 10) {
        inputMonthString = `0${inputMonth}`;
      } else {
        inputMonthString = inputMonth.toString();
      }
      if (inputDay < 10) {
        inputDayString = `0${inputDay}`;
      } else {
        inputDayString = inputDay.toString();
      }
      let fullInputDate = `${inputDayString}/${inputMonthString}/${inputYear}`;
      return fullInputDate;
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

    setHoldSizeOfSelected: function (value: number) {
      this.problemHoldsFB[this.selectedHoldFBId].sizeNum = value;
      this.lastSizeNum = value;
    },

    // changeHoldSizeOfSelected: function (holdSizeNum: number) {
    //   const result = this.holdSizeDefaults.find(({ id }) => id === holdSizeNum);
    //   this.problemHoldsFB[this.selectedHoldFBId].size = result!.name;
    //   this.lastSize = result!.name;
    // },

    setHoldTypeOfSelected: function (value: number) {
      this.problemHoldsFB[this.selectedHoldFBId].typeNum = value;
      this.lastTypeNum = value;
    },
    // changeHoldTypeOfSelected: function (holdType: string) {
    //   this.problemHoldsFB[this.selectedHoldFBId].type = holdType;
    //   this.lastType = holdType;
    // },

    deleteSelectedHold: function () {
      delete this.problemHoldsFB[this.selectedHoldFBId];
    },

    // sortProblems: function (sorting: string) {
    // }
  },
});
