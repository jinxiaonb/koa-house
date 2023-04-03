<template>
  <div>{{ queryObj.name }}</div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "App",
  setup() {
    const queryObj = reactive({
      name: "test", //模板名称
    });

    return {
      queryObj,
    };
  },
};
</script>
