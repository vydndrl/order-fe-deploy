<template>
  <h1>store test component2</h1>

  <p>Count : {{ getCount }}</p>
  <v-btn @click="incrementCount" color="red">increment count </v-btn>

  <input type="text" v-model="message" />
  <v-btn @click="updateMessage" color="red">update message </v-btn>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      count: 0,
      message: "",
    };
  },
  computed: {
    ...mapGetters(["getCount"]),
  },
  methods: {
    incrementCount() {
      //   this.count++;
      this.$store.dispatch("incrementCount");
    },
    updateMessage() {
      this.$store.dispatch("updateMessage", this.message);
    },
  },
};
</script>
