export const vClickOutside = {
  mounted: function (el, binding, vnode, prevVnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: function (el, binding, vnode, prevVnode) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
