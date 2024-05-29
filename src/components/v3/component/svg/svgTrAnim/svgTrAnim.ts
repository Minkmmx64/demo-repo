import { buildProps } from "@/components/m-components/utils/vue/props";
import { ExtractPropTypes } from "vue";

export const svgTrAnimProps = buildProps({
  svgPath: {
    type: String,
    default: "",
    required: true
  },
  width: {
    type: [ Number, String ],
    default: 100,
  },
  height: {
    type: [ Number, String ],
    default: 100
  },
  color: {
    type: String,
    default: "#007aff"
  }
});

export type SvgTrAnimProps = ExtractPropTypes<typeof svgTrAnimProps>;


