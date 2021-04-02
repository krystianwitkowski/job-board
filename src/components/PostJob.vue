<template>
  <div class="post-job">
    <div class="wrapper">
      <div class="top">
        <div class="post-job-header">
          <h2 class="post-job-header__title">Post a job</h2>
        </div>
        <div @click="closeCreate" class="hamburger">
          <span class="hamburger__line"></span>
          <span class="hamburger__line"></span>
        </div>
      </div>
      <label
        class="label-input-text label-job"
        :class="{ 'label-active': getActiveLabelJob }"
      >
        <input v-model="form.job" class="input-text" placeholder="job" />
        <p class="validate">{{ validateJob }}</p>
      </label>
      <div class="technologies">
        <a @click.prevent="getTag" :class="{ 'technologies__active' : form.tags[0].active }" class="technologies__tag html5" href="#" data-tag="html5"></a>
        <a @click.prevent="getTag" :class="{ 'technologies__active' : form.tags[1].active }" class="technologies__tag css3" href="#" data-tag="css3"></a>
        <a @click.prevent="getTag" :class="{ 'technologies__active' : form.tags[2].active }" class="technologies__tag js" href="#" data-tag="js"></a>
        <a @click.prevent="getTag" :class="{ 'technologies__active' : form.tags[3].active }" class="technologies__tag python" href="#" data-tag="python"></a>
        <a @click.prevent="getTag" :class="{ 'technologies__active' : form.tags[4].active }" class="technologies__tag php" href="#" data-tag="php"></a>
        <a @click.prevent="getTag" :class="{ 'technologies__active' : form.tags[5].active }" class="technologies__tag java" href="#" data-tag="java"></a>
        <a @click.prevent="getTag" :class="{ 'technologies__active' : form.tags[6].active }" class="technologies__tag rust" href="#" data-tag="rust"></a>
        <a @click.prevent="getTag" :class="{ 'technologies__active' : form.tags[7].active }" class="technologies__tag swift" href="#" data-tag="swift"></a>
        <p class="validate">{{ validateTechnologies }}</p>
      </div>
      <label
        class="label-input-text label-location"
        :class="{ 'label-active': getActiveLabelLocation }"
      >
        <input
          v-model="form.location"
          class="input-text"
          placeholder="location"
        />
        <p class="validate">{{ validateLocation }}</p>
      </label>
      <div class="salary">
        <label
          class="label-input-text label-min-salary"
          :class="{ 'label-active': getActiveLabelMinSalary }"
        >
          <input
            v-model="form.minSalary"
            class="input-text"
            placeholder="min-salary"
          />
          <p class="validate">{{ validateMinSalary }}</p>
        </label>
        <label class="label-input-text label-max-salary">
          <input
            v-model="form.maxSalary"
            class="input-text"
            placeholder="max-salary"
          />
          <p class="validate">{{ validateMaxSalary }}</p>
        </label>
        <p class="salary-currency">
          <span
            @click="getCurrencyPln"
            :class="{ 'currency--active': form.currency[0].active }"
            class="salary-currency__pln currency"
            >PLN</span
          >
          <span class="slash">/</span>
          <span
            @click="getCurrencyUsd"
            :class="{ 'currency--active': form.currency[1].active }"
            class="salary-currency__usd currency"
            >USD</span
          >
        </p>
      </div>
      <div class="work-place">
        <button
          @click="getRemote"
          :class="{ 'work-place--active': form.workPlace[0].active }"
          class="work-place__remote remote"
        >
          Remote
        </button>
        <button
          @click="getOffice"
          :class="{ 'work-place--active': form.workPlace[1].active }"
          class="work-place__office office"
        >
          Office
        </button>
      </div>
      <div class="business-plan">
        <div
          @click="getBusinessPlan7days"
          :class="{ 'business-plan--active': form.businessPlan[0].active }"
          class="business-plan-item business-plan-7days"
        >
          7 days
        </div>
        <div
          @click="getBusinessPlan14days"
          :class="{ 'business-plan--active': form.businessPlan[1].active }"
          class="business-plan-item business-plan-14days"
        >
          14 days
        </div>
        <div
          @click="getBusinessPlan30days"
          :class="{ 'business-plan--active': form.businessPlan[2].active }"
          class="business-plan-item business-plan-30days"
        >
          30 days
        </div>
      </div>
      <div class="editor-wrapper">
        <Editor
          v-model="form.textarea"
          api-key="tykm08j6qep9ljz0zogotwrprkn3vex1q55ocfdl2ebvqsst"
          :init="{
            selector: 'textarea',
            menubar: false,
            toolbar: 'bold italic',
            invalid_elements: 'span'
          }"
        />
        <p class="validate">{{ validateTextarea }}</p>
      </div>
      <button @click="getPost" class="post-job-send">Send</button>
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import createPost from "../api/createPost.js";

export default {
  name: "PostJob",
  components: {
    Editor
  },
  data() {
    return {
      form: {
        job: "",
        tags: [
          {
            name: 'html5',
            active: false,
            fullName: 'HTML5'
          },
          {
            name: 'css3',
            active: false,
            fullName: 'CSS3'
          },
          {
            name: 'js',
            active: false,
            fullName: 'JavaScript'
          },
          {
            name: 'python',
            active: false,
            fullName: 'Python'
          },
          {
            name: 'php',
            active: false,
            fullName: 'PHP'
          },
          {
            name: 'java',
            active: false,
            fullName: 'Java'
          },
          {
            name: 'rust',
            active: false,
            fullName: 'Rust'
          },
          {
            name: 'swift',
            active: false,
            fullName: 'Swift'
          }
        ],
        location: "",
        minSalary: "",
        maxSalary: "",
        currency: [
          {
            name: 'PLN',
            active: true
          },
          {
            name: 'USD',
            active: false
          }
        ],
        workPlace: [
          {
            name: 'Remote',
            class: 'remote',
            active: true
          },
          {
            name: 'Office',
            class: 'office',
            active: false
          },
        ],
        businessPlan: [
          {
            name: "7days",
            active: true,
          },
          {
            name: "14days",
            active: false,
          },
          {
            name: "30days",
            active: false,
          },
        ],
        textarea: "",
      },
      validate: ['', '', '', '', '', '']
    };
  },
  methods: {
    async getPost() {
        try {
          const result = await createPost(this.form);

            if(result.error){
              this.validate = result.error.data
            }

            else {
              this.validate = ["", "", "", "", "", ""]
              this.$store.commit('updateCreatePost', false)
            }
            
        } catch {
          console.log('Something went wrong');
        }
    },
    getTag(e){
      const targetTag = e.target.getAttribute('data-tag');
      return this.form.tags = this.form.tags.map(tag => tag.name === targetTag ? {...tag, active: !tag.active } : tag)
    },
    closeCreate() {
      return (this.$store.state.createPost = false);
    },
    getRemote() {
      return this.form.workPlace[0].active = !this.form.workPlace[0].active;
    },
    getOffice() {
      return this.form.workPlace[1].active = !this.form.workPlace[1].active;
    },
    getCurrencyPln() {
      this.form.currency[0].active = true;
      this.form.currency[1].active = false;
    },
    getCurrencyUsd() {
      this.form.currency[0].active = false;
      this.form.currency[1].active = true;
    },
    getBusinessPlan7days() {
      this.form.businessPlan.map((plan) => (plan.active = false));
      this.form.businessPlan[0].active = true;
    },
    getBusinessPlan14days() {
      this.form.businessPlan.map((plan) => (plan.active = false));
      this.form.businessPlan[1].active = true;
    },
    getBusinessPlan30days() {
      this.form.businessPlan.map((plan) => (plan.active = false));
      this.form.businessPlan[2].active = true;
    }
  },
  computed: {
    getActiveLabelJob() {
      return this.form.job.length > 0;
    },
    getActiveLabelLocation() {
      return this.form.location.length > 0;
    },
    getActiveLabelMinSalary() {
      return this.form.minSalary.length > 0;
    },
    getActiveLabelMaxSalary() {
      return this.form.maxSalary.length > 0;
    },
    validateJob(){
      return this.validate[0];
    },
    validateTechnologies(){
      return this.validate[1];
    },
    validateLocation(){
      return this.validate[2];
    },
    validateMinSalary(){
      return this.validate[3];
    },
    validateMaxSalary(){
      return this.validate[4];
    },
    validateTextarea(){
      return this.validate[5];
    }
  },
};
</script>

<style scoped>
.post-job {
  position: absolute;
  top: 52px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  max-width: 650px;
  width: 100%;
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
  z-index: 999;
}

.post-job-header__title {
  font-size: 24px;
  color: #717171;
}

.wrapper {
  max-width: 524px;
  margin: 0 auto;
  padding-top: 61px;
  padding-bottom: 40px;
}

.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.hamburger {
  cursor: pointer;
}

.hamburger__line {
  height: 23px;
  width: 2px;
  background: #717171;
  position: absolute;
  display: block;
}

.hamburger__line:nth-child(1) {
  transform: rotate(45deg);
}

.hamburger__line:nth-child(2) {
  transform: rotate(135deg);
}

.label-input-text {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ff00a2;
  position: relative;
}

.validate {
  position: absolute;
  bottom: -20px;
  font-size: 11px;
  font-weight: 300;
  color: #ff2966;
  padding-left: 15px;
}

.label-input-text::before {
  content: "";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  font-size: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #e6e6e6;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.post-job .label-active::before {
  opacity: 0;
}

.label-job::before {
  content: "\f303";
  left: 74px;
}

.label-location::before {
  content: "\f3c5";
  left: 111px;
}

.label-input-text:nth-child(1n + 3) {
  margin-top: 34px;
}

.label-job {
  margin-top: 58px;
}

.input-text {
  width: 100%;
  height: 51px;
  border: none;
  font-family: inherit;
  font-size: 16px;
  color: #e6e6e6;
  outline: 0;
  padding: 0 17px;
}

::placeholder {
  color: #e6e6e6;
}

.salary {
  margin-top: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.label-min-salary .input-text {
  padding-left: 31px;
}

.label-min-salary::before {
  content: "\f155";
  left: 9px;
}

.label-min-salary,
.label-max-salary {
  max-width: 139px;
}

.label-max-salary {
  margin-left: 27px;
}

.salary-currency {
  margin-left: 36px;
  font-size: 16px;
  color: #e6e6e6;
  cursor: pointer;
}

.salary-currency .currency--active {
  color: #ff00a2;
}

.work-place {
  margin-top: 49px;
}

.work-place .work-place--active {
  background: #ff00a2;
  color: #ffffff;
}

.work-place__remote,
.work-place__office {
  font-size: 16px;
  width: 133px;
  height: 40px;
  color: #ff00a2;
  border: 1px solid #ff00a2;
  outline: 0;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
}

.work-place__office {
  margin-left: 24px;
}

.business-plan {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 82px;
  margin-bottom: 50px;
}

.business-plan .business-plan--active {
  border: 1px solid #ff00a2;
  color: #ff00a2;
}

.business-plan-item {
  width: 168px;
  height: 96px;
  border-radius: 8px;
  border: 1px solid rgb(241, 241, 241);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  color: #e6e6e6;
  cursor: pointer;
}

.post-job-send {
  width: 116px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background: #ff00a2;
  font-family: inherit;
  font-size: 16px;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  outline: 0;
  margin-top: 50px;
  cursor: pointer;
}

.post-job-send::after {
  content: "\f1d8";
  color: #ffffff;
  font-size: 14px;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  margin-left: 12px;
}

.post-job-send::before {
  content: "";
  position: absolute;
  top: 0;
  right: -65px;
  height: 100%;
  background-color: rgb(0, 0, 0);
  opacity: 0.051;
  width: 100px;
}

.technologies {
  display: flex;
  flex-direction: row;
  margin-top: 37px;
  position: relative;
}

.technologies .technologies__active {
  background: #ff00a2;
  color: #ffffff;
}

.technologies__tag {
  content: '';
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'Font Awesome 5 Brands';
  font-size: 22px;
  color: #dbdbdb;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f7f7f7;
  text-decoration: none;
}

.technologies__tag:nth-child(1n+2){
  margin-left: 9px;
}

.html5::before {
    content: '\f13b';
}

.css3:before {
    content: '\f13c';
}

.js:before {
    content: '\f3b9';
}

.python:before {
    content: '\f3e2';
}

.php:before {
    content: '\f457';
}

.java:before {
    content: '\f4e4';
}

.rust:before {
    content: '\e07a';
}

.swift:before {
    content: '\f8e1';
}

.editor-wrapper {
  position: relative;
}

</style>
