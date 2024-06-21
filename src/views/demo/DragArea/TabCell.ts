import { buildProps } from "@/components/m-components/utils/vue/props";

import { ExtractPropTypes } from "vue";

export const dragTabCellProps = buildProps({
  icon: {
    type: String,
    default: '',
    required: true
  },
  name: {
    type: String,
    default: '',
    required: true
  }
})

export type DragTabCellProps = ExtractPropTypes<typeof dragTabCellProps>;