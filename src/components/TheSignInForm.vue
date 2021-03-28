<template>
  <div class="wrapper">
    <transition name="fetch">
      <Popup v-if="requestFailed" text-class="text-wrong" icon-class="icon-wrong" text="Something went wrong" />
    </transition>
    <transition name="fetch">
      <Popup v-if="requestSuccess" text-class="text-verified" icon-class="icon-verified" text="Account verified" />
    </transition>
    <transition name="fade">
      <form v-if="form.status" class="form">
        <label class="label-input-text">
          <span :class="{ 'dot--hide': isActiveEmail }" class="dot"></span>
          <input
            v-model="form.email"
            class="input-text"
            type="text"
            placeholder="Email"
          />
          <p class="validate">{{ validate[0] }}</p>
        </label>
        <label class="label-input-text">
          <div @click="getEye" class="eye">
            <span :class="{ 'eye-slash': eyeSlash }" class="eye-inner"></span>
            <span :class="{ 'eye-show': !eyeSlash }" class="eye-inner"></span>
          </div>
          <span :class="{ 'dot--hide': isActivePassword }" class="dot"></span>
          <input
            v-model="form.password"
            class="input-text password"
            :type="eyeSlash ? typePassword : typeText"
            placeholder="Password"
          />
          <p class="validate">{{ validate[1] }}</p>
        </label>
        <p class="text-info">
          Don't have an account yet ?
          <router-link to="/signup" class="signup" href="#">Sign up</router-link>
        </p>
        <input
          @click.prevent="getAuthenticate"
          class="input-submit"
          type="submit"
          value="Sign in"
        />
      </form>
    </transition>
  </div>
</template>
<script>
import Popup from "./Popup.vue";
import verifyUser from "../api/verifyUser.js";
import authenticateUser from "../api/authenticateUser.js";

export default {
  name: "TheSignInForm",
  components: {
    Popup
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        status: false
      },
      validate: ["", ""],
      eyeSlash: true,
      typeText: 'text',
      typePassword: 'password',
      request: [
        {
          name: 'loading',
          status: false
        },
        {
          name: 'success',
          status: false
        },
        {
          name: 'failed',
          status: false
        }
      ]
    };
  },
  methods: {
    getEye(){
      return this.eyeSlash = !this.eyeSlash;
    },
    async getAuthenticate() {
      try {
        const body = await authenticateUser(this.form);
        const result = await body.json()

        if (result.error) {
          this.validate = result.error.data;
        } else {
          localStorage.setItem("tokens", JSON.stringify(result.data.tokens));
          this.validate = ["", ""];

          return this.$router.push("/dashboard");
        }
      } catch {
        this.request = this.request.map(req => req.name === 'failed' ? { ...req, status: true } : { ...req, status: false })
      }

    },
    async getVerifyUser(queryVerify) {
      const result = await verifyUser(queryVerify);

      if (result.error) {
        this.request = this.request.map(req => req.name === 'success' ? { ...req, status: false } : { ...req, status: false })
      } else {
        this.request = this.request.map(req => req.name === 'success' ? { ...req, status: true } : { ...req, status: false })
      }
    },
  },
  computed: {
    requestSuccess(){
      return this.request.find(req => req.name === 'success').status;
    },
    requestFailed(){
      return this.request.find(req => req.name === 'failed').status;
    },
    isActiveEmail() {
      return this.form.email.length > 0;
    },
    isActivePassword() {
      return this.form.password.length > 0;
    }
  },

  mounted() {
    if (this.$route.query.verify) {
      this.getVerifyUser(this.$route.query.verify);
    }
    this.form.status = true
  },
};
</script>
<style scoped>
.wrapper {
  padding-top: 62px;
}

.form {
  max-width: 330px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
  margin: 0 auto;
  border-radius: 8px;
  padding: 39.5px;
  padding-bottom: 48px;
}

.input-text {
  height: 40px;
  border: none;
  outline: 0;
  color: #dddcdc;
  font-family: inherit;
  font-size: 15px;
}

.password {
  width: 205px;
}

.label-input-text {
  display: block;
  position: relative;
}

.label-input-text:nth-child(2) {
  margin-top: 17px;
  margin-bottom: 34px;
}

::placeholder {
  color: #dddcdc;
}

.text-info {
  font-size: 13px;
  font-weight: 300;
  position: relative;
  color: #999999;
}

.text-info::before {
  content: "";
  width: 100%;
  display: block;
  height: 1px;
  background: #f1f1f1;
  position: absolute;
  bottom: -33px;
}

.signup {
  color: #9bbeff;
  margin-top: 12px;
  text-decoration: none;
}

.input-submit {
  width: 100%;
  height: 40px;
  border: none;
  background: #9bbeff;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 500;
  font-family: inherit;
  font-size: 15px;
  margin-top: 60px;
  outline: 0;
  cursor: pointer;
}

.dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: rgb(155, 190, 255);
  position: absolute;
  left: 0;
  top: 12px;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.label-input-text .dot--hide {
  opacity: 0;
}

.label-input-text:nth-child(1) .dot {
  left: 53px;
}

.label-input-text:nth-child(2) .dot {
  left: 86px;
}

.validate {
  font-size: 11px;
  color: #ff2966;
  position: absolute;
  bottom: -9px;
  left: 9px;
  font-weight: 300;
}

.eye {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.eye-inner::before {
  font-family: 'Font Awesome 5 Free';
  font-weight: 400;
  color: #dddcdc;
  font-size: 18px;
}

.eye-show::before {
  content: '\f06e';
}

.eye-show {
  position: relative;
  left: -1px;
}

.eye-slash::before {
  content: '\f070';
}

.fade-enter-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-150px);
}

.fetch-enter-active, .fetch-leave-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}

.fetch-enter-from, .fetch-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
