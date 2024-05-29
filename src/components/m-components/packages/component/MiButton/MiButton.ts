import { buildProps } from "@/components/m-components/utils/vue/props";
import { miUISize, miUIType } from "../../const/ui.type";
import { ExtractPropTypes } from "vue";

export const miButtonProps = buildProps({
  type: {
    type: String,
    default: '',
    values: miUIType
  },
  size: {
    type: String,
    default: '',
    values: miUISize
  }
})

export type MiButtonProps = ExtractPropTypes<typeof miButtonProps>;