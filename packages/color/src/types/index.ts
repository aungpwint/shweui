/**
 * the color palette number
 *
 * the main color number is 500
 */
export type ColorPaletteNumber = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/** the color palette */
export type ColorPalette = {
    /** the color hex value */
    hex: string;
    /**
     * the color number
     *
     * - 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
     */
    number: ColorPaletteNumber;
};

/** the color palette family */
export type ColorPaletteFamily = {
    /** the color palette family name */
    name: string;
    /** the color palettes */
    palettes: ColorPalette[];
};