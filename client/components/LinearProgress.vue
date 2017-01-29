<template>
  <div class="container">
    <div class="loading">
    	<div class="loading-bar"></div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'linear-progress',
  components: {
  },
  props: {
  }
}
</script>
<style lang="css" scoped>
.container {
  width: 100%;
  position: relative;
}
.loading{
	width: 100%;
	height: 5px;
	overflow: hidden;
	position: absolute;
}

.loading-bar{
	right: 0;
	position: absolute;
	width: 200%;
	height: 100%;
	background: blue;
	background-image: -webkit-linear-gradient(45deg, white 0%, white 30%, #7ad0e2 30%, #7ad0e2 70%, white 70%);
	background-image: -webkit-moz-gradient(45deg, white 0%, white 30%, #7ad0e2 30%, #7ad0e2 70%, white 70%);
	background-image: -webkit-o-gradient(45deg, white 0%, white 30%, #7ad0e2 30%, #7ad0e2 70%, white 70%);
	background-image: linear-gradient(45deg, white 0%, white 30%, #7ad0e2 30%, #7ad0e2 70%, white 70%);
	background-size: 25px 10px;
	animation: slide 3s linear infinite;
}
@keyframes slide{
	from{right: 0%;}
	to{right: -100%;}
}

</style>
