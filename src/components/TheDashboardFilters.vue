<template>
  <ul class="filters">
    <li class="filter-item">
      <a @click.prevent="filterClick" class="filter-item-icon all" href="#" data-filter="all"></a>
    </li>
    <li class="filter-item">
      <a @click.prevent="filterClick" :class="{ 'html5-active' : bg[0].active }" class="filter-item-icon html5" href="#" data-filter="html5"></a>
    </li>
    <li class="filter-item">
      <a @click.prevent="filterClick" :class="{ 'css3-active' : bg[1].active }" class="filter-item-icon css3" href="#" data-filter="css3"></a>
    </li>
    <li class="filter-item">
      <a @click.prevent="filterClick" :class="{ 'js-active' : bg[2].active }" class="filter-item-icon js" href="#" data-filter="js"></a>
    </li>
    <li class="filter-item">
      <a @click.prevent="filterClick" :class="{ 'python-active' : bg[3].active }" class="filter-item-icon python" href="#" data-filter="python"></a>
    </li>
    <li class="filter-item">
      <a @click.prevent="filterClick" :class="{ 'php-active' : bg[4].active }" class="filter-item-icon php" href="#" data-filter="php"></a>
    </li>
    <li class="filter-item">
      <a @click.prevent="filterClick" :class="{ 'java-active' : bg[5].active }" class="filter-item-icon java" href="#" data-filter="java"></a>
    </li>
    <li class="filter-item">
      <a @click.prevent="filterClick" :class="{ 'rust-active' : bg[6].active }" class="filter-item-icon rust" href="#" data-filter="rust"></a>
    </li>
    <li class="filter-item">
      <a @click.prevent="filterClick" :class="{ 'swift-active' : bg[7].active }" class="filter-item-icon swift" href="#" data-filter="swift"></a>
    </li>
  </ul>
</template>
<script>
import getPostsFilter from '../api/getPostsFilter.js';

export default {
  name: "TheDashboardFilters",
  data(){
    return {
      bg: [
        {
          name: 'html5',
          active: false
        },
        {
          name: 'css3',
          active: false
        },
        {
          name: 'js',
          active: false
        },
        {
          name: 'python',
          active: false
        },
        {
          name: 'php',
          active: false
        },
        {
          name: 'java',
          active: false
        },
        {
          name: 'rust',
          active: false
        },
        {
          name: 'swift',
          active: false
        }
      ]
    }
  },
  methods: {
    async filterClick(e) {
        const targetFilter = e.target.getAttribute('data-filter');
    
        try {
          this.$store.commit('updateSplashscreen', true)
          const result = await getPostsFilter({ filter: targetFilter });
          
          this.bg = this.bg.map(bg => bg.name === targetFilter ? {...bg, active: true } : {...bg, active: false })
          this.$store.commit('getPosts', result)
          this.$store.commit('updatePostsFilter', targetFilter)
          this.$store.commit('updateSplashscreen', false)
        } catch {
          console.log('Something went wrong');
        }

    },
  }
};
</script>
<style scoped>
.filters {
  display: flex;
  flex-direction: row;
}

.filter-item:nth-child(1n + 2) {
  margin-left: 9px;
}

.filter-item:nth-child(1) {
  margin-left: 35px;
}

.filter-item-icon {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-decoration: none;
  background: #f7f7f7;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #dbdbdb;
  cursor: pointer;
}

.filter-item-icon::before {
  content: "";
  align-items: center;
  font-family: "Font Awesome 5 Brands";
  font-size: 22px;
  z-index: 2;
}

.filters .all::before {
  content: "\f7a2";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}

.html5-active {
  background: #ff8d70;
  color: #ffffff;
}

.css3-active {
  background: #70adff;
  color: #ffffff;
}

.html5::before {
  content: "\f13b";
}

.css3::before {
  content: "\f38b";
}

.js-active {
  background: #ffdf70;
  color: #ffffff;
}

.js::before {
  content: "\f3b9";
}

.python-active {
  background: #708bff;
  color: #ffffff;
}

.python:before {
  content: "\f3e2";
}

.php-active {
  background: #9f70ff;
  color: #ffffff;
}

.php:before {
  content: "\f457";
}

.java-active {
  background: #ff275a;
  color: #ffffff;
}

.java:before {
  content: "\f4e4";
}

.rust-active {
  background: #4f4f4f;
  color: #ffffff;
}

.rust:before {
  content: "\e07a";
}

.swift-active {
  background: #ff4a4a;
  color: #ffffff;
}

.swift:before {
  content: "\f8e1";
}
</style>
