import { PurposeTypeDisplay, PurposeType } from './purpose-type.enum';
import { Measure, MeasureDisplay } from './measure.enum';
import { PromotionTypeDisplay, PromotionType } from './promotion-type.enum';
import {
  ActiveConditionDisplay,
  ActiveCondition,
} from './active-condition.enum';
import {
  RetroBonusTypeEnum,
  RetroBonusTypeDisplay,
} from './retro-bonus-type.enum';

export const EnumDisplayCollection = {
  ActiveConditionDisplay,
  PromotionTypeDisplay,
  PurposeTypeDisplay,
  MeasureDisplay,
  RetroBonusTypeDisplay,
};

export const EnumCollection = {
  ActiveCondition: ActiveCondition,
  PromotionType: PromotionType,
  PurposeType: PurposeType,
  Measure: Measure,
  RetroBonusTypeEnum: RetroBonusTypeEnum,
};

export const IEnumDisplayCollection = {
  ActiveCondition: ActiveConditionDisplay,
};
