<template>
  <h1>store test component3</h1>
  <p>Count : {{ getCount }}</p>
  <p>Message : {{ getMessage }}</p>
  <input type="text" v-model="message" />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getCount", "getMessage"]),
  },
};
</script>
