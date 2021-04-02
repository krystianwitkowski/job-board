<template>
    <div class="dots">
        <span class="dots-item dot-item-1"></span>
        <span class="dots-item dot-item-2"></span>
        <span class="dots-item dot-item-3"></span>
    </div>
</template>
<script>
export default {
    name: 'Spinner'
}
</script>
<style>
.dots {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 95px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

@keyframes dots-item-1 {
  0%{
      transform: translateY(0);
  }

  70% {
    transform: translateY(-7px);
  }

  100% {
    transform: translateY(0);
  }
}

.dots-item {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #91b8ff;
  display: block;
}

.dot-item-1{
  animation: dots-item-1 1.2s ease infinite;
}

.dot-item-2{
  animation: dots-item-1 1.2s ease 0.84s infinite;
}

.dot-item-3{
  animation: dots-item-1 1.2s ease infinite;
}

.dots-item:nth-child(2){
  margin: 0 10px;
}
</style>