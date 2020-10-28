import { scaleFont } from './mixins';

// FONT FAMILY
export const FONT_FAMILY_PT_REGULAR = 'PTSans-Regular';
export const FONT_FAMILY_PT_BOLD = 'PTSans-Bold';

// FONT WEIGHT
export const FONT_WEIGHT_LIGHT = '300';
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_35 = scaleFont(35);
export const FONT_SIZE_25 = scaleFont(25);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_8 = scaleFont(8);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_REGULAR_PT = {
    fontFamily: FONT_FAMILY_PT_REGULAR,
    fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD_PT = {
    fontFamily: FONT_FAMILY_PT_BOLD,
    fontWeight: FONT_WEIGHT_BOLD,
};