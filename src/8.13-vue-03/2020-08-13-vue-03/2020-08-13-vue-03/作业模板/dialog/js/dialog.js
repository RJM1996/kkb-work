Vue.component("kkb-dialog", {
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
    title: {
      type: String,
      default() {
        return '标题'
      }
    }
  },
  watch: {
    visible(val) {
      if(val) {
        this.open()
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    open() {
      this.$emit('open')
    }
  },
  template: `
        <div class="dialog" v-show="visible">
            <div class="dialog-header">
                <span class="dialog-title">{{title}}</span>
                <i class="dialog-close" @click="close">x</i>
            </div>
            <div class="dialog-body">
                <slot></slot>
            </div>
        </div>
    `,
});
