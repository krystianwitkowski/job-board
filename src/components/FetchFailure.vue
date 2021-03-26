<template>
  <div class="failure">
    <p class="failure-text">Something went wrong</p>
  </div>
</template>

<script>
export default {
  name: "FetchFailure"
};
</script>

<style scoped>
.failure {
  max-width: 330px;
  margin: 0 auto;
  height: 68px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 300;
  color: #ff6792;
  font-size: 15px;
  padding-left: 32px;
  margin-bottom: 17px;
}

.failure-text {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.failure-text::before {
  content: "\f057";
  color: #ff6792;
  font-weight: 400;
  font-family: "Font Awesome 5 Free";
  font-size: 21px;
  margin-right: 16px;
}
</style>
