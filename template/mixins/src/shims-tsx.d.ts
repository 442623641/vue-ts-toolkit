
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $event: {
      $on: (name: string, callback: (params?: any) => void) => void
      $emit: (name: string, params?: any) => void
      $off: (name: string, callback?: any) => void
    }

    $modal: {
      create: (component: any, props?: any, options?: {
        /** Title of Dialog */
        title?: string

        /** Width of Dialog */
        width?: string

        /** Whether the Dialog takes up full screen */
        fullscreen?: boolean

        /** Value for margin-top of Dialog CSS */
        top?: string

        /** Whether a mask is displayed */
        modal?: boolean

        /** Whether to append modal to body element. If false, the modal will be appended to Dialog's parent element */
        modalAppendToBody?: boolean

        /** Whether scroll of body is disabled while Dialog is displayed */
        lockScroll?: boolean

        /** Custom class names for Dialog */
        customClass?: string

        /** Whether the Dialog can be closed by clicking the mask */
        closeOnClickModal?: boolean

        /** Whether the Dialog can be closed by pressing ESC */
        closeOnPressEscape?: boolean

        /** Whether to show a close button */
        showClose?: boolean

        /** Callback before Dialog closes, and it will prevent Dialog from closing */
        beforeClose?: (done: Function) => void

        /** Whether to align the header and footer in center */
        center?: boolean

        /** Whether to destroy elements in Dialog when closed */
        destroyOnClose?: boolean

        $slots?: any
      }) => {
        present: () => Promise<any>
        onWillDismiss: () => Promise<{ data: any }>
        onDismissed: () => Promise<{ data: any }>
      }
      dismiss: (id?: string) => void
    }
  }
}
