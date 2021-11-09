<template>
  <div class="modal-page">
    <el-dialog
      v-for="(modal, index) of modals"
      :id="modal._id"
      :key="index"
      :ref="modal._id"
      top="60px"
      v-bind="modal.options"
      :visible="modal._visible"
      @closed="modal._closed"
      @opened="modal._opened"
      :before-close="() => modal._close()"
    >
      <component
        :is="modal.component"
        v-bind="modal.props"
        @dismiss="_close($event, modal)"
      />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  data() {
    return { modals: [] }
  },

  methods: {
    create(component, props, options, id) {
      options = options || {}
      if (options.closeOnClickModal === undefined) {
        options.closeOnClickModal = false
      }
      if (options.customClass) {
        options.customClass += ' modal-' + component.extendOptions.name
      } else {
        options.customClass = 'modal-' + component.extendOptions.name
      }

      const instance = {
        component,
        props,
        options,

        onDismissed: () => {
          return new Promise((resolve) => {
            instance._closed = () => {
              this._closed(instance)
              resolve({ data: instance.data })
            }
          })
        },

        onWillDismiss: () => {
          return new Promise((resolve) => {
            instance._close = () => {
              this._close(null, instance)
              resolve({ data: instance.data })
            }
          })
        },
        _visible: false,
        _index: this.modals.length,
        _id: id || 'septnet-modal-' + (this.modals.length + 1),
        _opened: () => {},
        _closed: () => this._closed(instance),
        _close: (data) => this._close(data, instance)
      }
      options.beforeClose = () => (instance._visible = false)
      this.modals.push(instance)
      this.modals.forEach((m, index) => (m._index = index))

      var getStyle = function(dom, attr) {
        return dom.currentStyle
          ? dom.currentStyle[attr]
          : getComputedStyle(dom, false)[attr]
      }
      return {
        present: () =>
          new Promise((resolve) => {
            instance._opened = () => resolve(instance)
            this.$nextTick(() => {
              instance._visible = true
              this.$nextTick(() => {
                const pageRef = this.$refs[instance._id][0].$children[0].$el
                const modalRef = this.$refs[instance._id][0].$el.firstChild
                const paddingLeft = getStyle(pageRef, 'paddingLeft')
                const paddingRight = getStyle(pageRef, 'paddingRight')
                const title = pageRef.querySelector('title')
                const footer = pageRef.querySelector('[slot="footer"]')
                if (footer) {
                  modalRef.append(footer)
                  footer.style = `padding-left:${paddingLeft};padding-right:${paddingRight}`
                }

                if (pageRef.title || title) {
                  instance.options.title = pageRef.title || title.innerText
                }
                !instance.options.width &&
                  this.$set(
                    instance.options,
                    'width',
                    pageRef.offsetWidth + 'px'
                  )
                modalRef.querySelector(
                  '.el-dialog__header'
                ).style = `padding-left:${paddingLeft};padding-right:${paddingRight}`
              })
            })
          }),
        ...instance
      }
    },

    dismiss(id) {
      if (!this.modals.length) return
      const modal = id
        ? this.modals.find((m) => m.id === id)
        : this.modals[this.modals.length - 1]
      modal._close()
    },

    _close(data, p) {
      p.data = data || p.data
      p._visible = false
    },

    _closed(p) {
      p._visible = null
      this.modals.splice(p._index, 1)
      this.modals.forEach((m, index) => (m._index = index))
    }
  }
}
</script>
<style lang="scss">
.modal-page {
  .el-dialog__body {
    padding: 0;
    & > * {
      padding: 16px 30px;
    }
  }
  .el-dialog__header {
    padding-left: 30px;
    padding-right: 30px;
  }
  [slot="footer"] {
    padding-top: 16px;
    text-align: right;
    &[padding] {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .dialog-footer {
    padding-bottom: 10px;
    background: #f5f7fa;
    text-align: center;
    border-radius: 4px;
  }
  title {
    display: none;
  }
}
</style>
