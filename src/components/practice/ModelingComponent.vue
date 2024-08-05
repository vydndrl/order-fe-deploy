<template>
  <!-- html 요소의 동적 값 표시 -->
  <!-- html 요소 안에 중괄호 2번을 사용함으로써 scrip에 정의된 변수값을 화면에 표시 -->
  <h1>hello world {{ language }}</h1>

  <!-- value 문법을 사용하면 단방향 데이터 바인딩 -->
  <input type="text" v-model="value1" />
  <!-- v-model은 양방향 데이터 바인딩 -->
  <input type="text" v-model="value2" />

  <h1>{{ count1 }}</h1>
  <button @click="plusNum1">increment</button><br /><br />

  <h1>{{ doubleCount }}</h1>

  <input type="text" v-model="count2" />
  <button @click="plusNum2">increment</button>

  <button @click="showValue">변수 변경 사항 확인</button> <br />
</template>

<script>
export default {
  data() {
    return {
      language: "python",
      value1: "python",
      value2: "java",
      count1: 0,
      count2: 0,
    };
  },
  //   computed는 종속된 반응형 데이터가 변경될때에 함수를 다시 실행하여 값을 계산하는 함수
  computed: {
    doubleCount() {
      return this.count1 * 2;
    },
  },
  created() {
    alert("CREATE 함수 호출");
  },
  methods: {
    showValue() {
      alert(this.value2);
    },
    plusNum1() {
      this.count1++;
    },
    plusNum2() {
      this.count2++;
    },
  },
};
</script>
