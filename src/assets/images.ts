import heroSpread from './images/hero_azhar_pakwan_spread_1790592430943.jpg';
import muttonKunna from './images/food_chinioti_mutton_kunna_1790592451492.jpg';
import specialBiryani from './images/food_special_biryani_1790592467140.jpg';
import weddingDeg from './images/catering_wedding_deg_1790592481502.jpg';

export const IMAGES = {
  heroSpread,
  muttonKunna,
  specialBiryani,
  weddingDeg,
};

/**
 * Resolves an image path to a valid bundled URL or returns a fallback.
 * Works seamlessly with GitHub Pages base URL (/Azhar-Chiniot-Pakwan/) and Vite asset bundling.
 */
export const resolveDishImage = (imagePath?: string): string => {
  if (!imagePath) return heroSpread;
  if (imagePath.includes('food_chinioti_mutton_kunna')) return muttonKunna;
  if (imagePath.includes('food_special_biryani')) return specialBiryani;
  if (imagePath.includes('catering_wedding_deg')) return weddingDeg;
  if (imagePath.includes('hero_azhar_pakwan_spread')) return heroSpread;
  return imagePath;
};

export default IMAGES;
