
const isElementInViewport = (el) => {
	var rect = el.getBoundingClientRect()
	return rect.bottom > 0
		&& rect.right > 0
		&& rect.top < (window.innerHeight || document.documentElement.clientHeight)
		&& rect.left < (window.innerWidth || document.documentElement.clientWidth)
}

const onScroll = (el, binding, evt) => {
  if (isElementInViewport(el)) {
    binding.value(Date.now())
  } else {

  }
}

const lazyloadImg = (el, src) => {
  let img = new Image()
  img.onload = () => {
    switch(el.tagName) {
      case 'IMAGE': {
        el.src = src
        break
      }
      default: {
        el.style.backgroundImage = `url(${src})`
        break
      }
    }
  }
  img.src = src
}

const onScrollEnd = (el, binding) => {
  if((el.scrollHeight === el.scrollTop + el.clientHeight) &&
		typeof binding.value === 'function' ){
		binding.value()
	}
}


const infinityScroll = {
  bind(el, binding) {
    el.addEventListener('scroll', onScrollEnd.bind(this, el, binding))
  },
  unbind(el) {
    el.removeEventListener('scroll', onScrollEnd)
  }
}

const visibleDetect = {
  bind(el, binding) {
    window.addEventListener('scroll', onScroll.bind(this, el, binding))
  },
  unbind(el) {
    window.removeEventListener('scroll', onScroll)
  }
}

const lazyimg = {
  bind(el, binding) {
    lazyloadImg(el, binding.value)
  },
  update(el, binding){
    if (binding.value !== binding.oldValue) {
      lazyloadImg(el, binding.value)
    }
  },
  unbind(el){

  }
}


export default {
  install(Vue) {
    Vue.directive('lazyimg', lazyimg)
    Vue.directive('visibleDetect', visibleDetect)
    Vue.directive('infinityScroll', infinityScroll)
  }
}
