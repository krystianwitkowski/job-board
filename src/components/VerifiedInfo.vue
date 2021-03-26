<template>
  <div
    :class="{ show: successVerify }" class="verified"
  >
    <p class="verified-text">Account verified</p>
  </div>
</template>

<script>
export default {
  name: "VerifiedInfo",
  props: {
    successVerify: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.verified {
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
  color: #9bbeff;
  font-size: 15px;
  padding-left: 32px;
  margin-top: -68px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s ease, margin 0.5s ease;
}

.wrapper .show {
  opacity: 1;
  margin-top: 0;
  margin-bottom: 17px;
  visibility: visible;
}

.verified-text::before {
  content: "\f00c";
  color: #62fdda;
  font-weight: 900;
  font-family: "Font Awesome 5 Free";
  font-size: 18px;
  margin-right: 16px;
}
</style>
