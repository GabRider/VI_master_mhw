<template>
<div>
  <h1>{{ this.test }}</h1>
</div>
</template>

<script>
export default {
  name: "Box",
  props: ["test"],
};
</script>