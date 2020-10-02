import { PurposeTypeDisplay, PurposeType } from './purpose-type.enum';
import { Measure, MeasureDisplay } from './measure.enum';
import { PromotionTypeDisplay, PromotionType } from './promotion-type.enum';
import {
  ActiveConditionDisplay,
  ActiveCondition,
} from './active-condition.enum';
export const EnumDisplayCollection = {
  ActiveConditionDisplay,
  PromotionTypeDisplay,
  PurposeTypeDisplay,
  MeasureDisplay,
};

export const EnumCollection = {
  ActiveCondition: ActiveCondition,
  PromotionType: PromotionType,
  PurposeType: PurposeType,
  Measure: Measure,
};
