import { type DirectiveBinding } from "vue";

// Directive, which is used to detect when the user clicks outside of the element.
// Example usage: <div v-click-outside="myFunction">Some content</div>
export const vClickOutside = {
  mounted: function (el: any, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: function (el: any) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};
