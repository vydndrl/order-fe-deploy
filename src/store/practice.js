function initState() {
  return {
    count: 0,
    message: "",
  };
}

const practice = {
  // state : 상태를 의미하는 객체로서 initState를 통해 상태 초기화
  state: initState,
  //   mutations는 상태를 변경하기 위한 함수들의 집합
  //   mutation은 컴포넌트에서 직접 호출되기 보다는, actions를 통해 mutation이 호출
  // 그 이유는 여러 mutation을 연속적으로 호출하는 등의 경우가 있을 수 있기 때문
  mutations: {
    increment(state) {
      state.count++;
    },
    updateMessage(state, newMessage) {
      state.message = newMessage;
    },
  },
  actions: {
    // 아래와 같이 actions의 함수를 통해 mutation 의 함수로 이동
    // 그러면 결국, 컴포넌트에서는 actions 함수 호출
    incrementCount(context) {
      context.commit("increment");
    },
    updateMessage(context, newMessage) {
      context.commit("updateMessage", newMessage);
    },
  },
  //   상태(변수)를 get하기 위한 함수들의 집합
  getters: {
    getCount: (state) => state.count,
    getMessage: (state) => state.message,
  },
};

export default practice;
