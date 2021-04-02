<template>
  <div class="wrapper">
    <div @click="getUndo" class="webhistory"></div>
    <div class="content">
        <div class="scroll-hidden">
            <div class="job-post-header">
                <h2 class="job-post-header__title">{{ post.job }}</h2>
                <div class="job-post-info">
                    <p class="job-post-info__company">{{ post.company }}</p>
                    <p class="job-post-info__place">{{ post.location }}</p>
                </div>
            </div>
            <div class="job-post-status">
                <div class="job-post-tags">
                    <span v-for="(tag, index) in post.tags" :key="index" class="job-post-tag">{{ tag.fullName }}</span>
                </div>
                <div class="salary">
                    <p class="salary-name">Salary</p>
                    <p class="salary-value">{{ Number(post.minSalary).toLocaleString() + ' - ' + Number(post.maxSalary).toLocaleString() + ' ' + (post.currency ? currency : null )}}</p>
                </div>
            </div>
            <div class="work-place">
                <p v-for="(workplace, index) in (post.workPlace ? post.workPlace.filter(workplace => workplace.active) : [])" :key="index" :class="workplace.class" class="work-place-item">{{ workplace.name }}</p>
            </div>
            <h2 class="job-description-title">Description</h2>
            <div class="job-post-description">
                <p v-html="post.textarea" class="job-post-text"></p>
            </div>
        </div>
    </div>
  </div>
</template>


<script>
export default {
    name: 'DashboardJobPost',
    computed: {
        post(){
            return this.$store.state.posts.find(post => post.id === Number(this.$store.state.articleId));
        },
        currency(){
            return this.post.currency.find(currency => currency.active).name;
        }
    },
    methods: {
        getUndo(){
            return this.$store.commit('updateArticleId', null)
        }
    }
}
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  max-width: 1050px;
  width: 90%;
  position: relative;
}

.content {
  max-width: 685px;
  width: 100%;
  background: #fcfcfc;
  padding: 25px;
  padding-top: 52px;
  padding-bottom: 37px;
}

.webhistory {
    position: absolute;
    left: 44px;
    top: 14px;
    width: 24px;
    height: 24px;
    background: #f0f0f0;
    border-radius: 3.5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.webhistory::before {
    content: '\f0e2';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    color: #cecccc;
    font-size: 11px;
}

.job-post-header {
    background: #ffffff;
    border-radius: 10.5px;
    padding: 43px;
    height: 155px;
    box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
}

.job-post-header__title {
    font-size: 21px;
    color: #6a6a6a;
}

.job-post-info {
    font-size: 16px;
    color: #d2d2d2;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 24px;
}

.job-post-info__company::before, .job-post-info__place::before {
    font-family: 'Font Awesome 5 Free';
    margin-right: 10px;
}

.job-post-info__company::before {
    content: '\f1ad';
}

.job-post-info__place::before {
    content: '\f3c5';
    font-weight: 900;
}

.job-post-info__place {
    margin-left: 25px;
}

.job-post-status {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    padding: 0 12px;
}

.job-post-tags {
    background: #ffffff;
    color: #ffffff;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 57px;
    border-radius: 10.5px;
    padding: 0 25px;
    font-weight: 300;
    box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
}

.job-post-tag{
    background: #aecbfe;
    height: 21px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 10.5px;
    padding: 0 12px;
}

.job-post-tag:nth-child(1n+2){
    margin-left: 16px;
}

.salary {
    display: flex;
    flex-direction: row;
    margin-left: 20px;
    width: 100%;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
    padding: 0 25px;
}

.salary-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #6a6a6a;
}

.salary-value {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #aecbfe;
    padding-left: 15px;
}

.work-place {
    display: flex;
    flex-direction: row;
    font-weight: 300;
    margin-top: 47px;
    margin-left: 12px;
}

.work-place-item:nth-child(1n+2){
    margin-left: 9px;
}

.work-place-item {
    font-size: 12px;
    height: 21px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 10.5px;
    padding: 0 12px;
}

.remote {
    border: 1px solid #ff00a2;
    color: #ff00a2;
}

.office {
    border: 1px solid #b400ff;
    color: #b400ff;
}

.job-post-text {
    font-weight: 300;
    margin-top: 13px;
    font-size: 14px;
    color: #7f7f7f;
    line-height: 1.8;
    padding: 30px;
}

.job-description-title {
    font-size: 18px;
    color: #6a6a6a;
    margin-top: 50px;
    padding-left: 49px;
}

.job-post-description {
    background: #ffffff;
    box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    width: 611px;
    margin: 0 auto;
    
}
</style>