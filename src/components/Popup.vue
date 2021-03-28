<template>
    <div class="popup">
        <p :class="textClass" class="popup-text"><span :class="iconClass" class="popup-icon"></span>{{ text }}</p>
    </div>
</template>

<script>
export default {
  name: "Popup",
    props: {
        textClass: {
            type: String,
            required: true
        },
        iconClass: {
            type: String,
            required: true
        },
        text: {
          type: String,
          required: true
        }
    }
}
</script>

<style scoped>
.popup {
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
  font-size: 15px;
  padding-left: 32px;
  margin-bottom: 17px;
}

.text-wrong {
  color: #ff6792;
}

.text-activation {
  color: #9bbeff;
}

.text-success {
  color: #9bbeff;
}

.text-verified {
  color: #9bbeff;
}

.popup-text {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.popup-icon:before {
  font-family: "Font Awesome 5 Free";
  font-weight: 400;
  font-size: 21px;
  margin-right: 16px;
}

.icon-wrong:before {
    content: "\f057";
    color: #ff6792;
}

.icon-activation:before {
    content: "\f2b6";
    color: #62fdda;
}

.icon-success:before {
    content: "\f2b6";
    color: #62fdda;
}

.icon-verified:before {
    content: "\f00c";
    color: #62fdda;
    font-weight: 900;
}
</style>
