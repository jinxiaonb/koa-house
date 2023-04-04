<template>
  <div>Home</div>
  <h1>{{ userObj.userName }}</h1>
  <button class="home-btn" @click="updateStore">更改store</button>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const userObj = computed(() => store.state.user.userInfo);

function updateStore() {
  store.dispatch("user/getUserInfo");
}
</script>
