import chickenBiryani from './images/chicken_biryani_deg_1790669221794.jpg';
import sindhiBiryani from './images/sindhi_biryani_deg_1790669238681.jpg';
import chickenQorma from './images/chicken_qorma_handi_1790669254003.jpg';
import muttonKunna from './images/mutton_dish_deg_1790669272702.jpg';
import weddingDeg from './images/wedding_deg_pakwan_1790669289421.jpg';
import heroSpread from './images/hero_azhar_pakwan_spread_1790592430943.jpg';

export const IMAGES = {
  chickenBiryani,
  sindhiBiryani,
  chickenQorma,
  muttonKunna,
  weddingDeg,
  heroSpread,
  specialBiryani: chickenBiryani,
};

/**
 * Resolves an image path or dish ID to a pristine, studio-photographed dish asset on pure white background.
 * Works seamlessly with GitHub Pages base URL (/Azhar-Chiniot-Pakwan/) and Vite asset bundling.
 */
export const resolveDishImage = (imagePath?: string, dishId?: string, categoryId?: string): string => {
  if (dishId) {
    if (dishId === 'biryani-1') return IMAGES.chickenBiryani;
    if (dishId === 'biryani-2') return IMAGES.sindhiBiryani;
    if (dishId === 'biryani-3' || dishId === 'biryani-4') return IMAGES.chickenBiryani;
    if (dishId === 'chicken-1' || dishId.startsWith('chicken-')) return IMAGES.chickenQorma;
    if (dishId === 'mutton-4' || dishId.startsWith('mutton-')) return IMAGES.muttonKunna;
    if (dishId === 'rice-1' || dishId === 'rice-2') return IMAGES.chickenBiryani;
    if (dishId.startsWith('catering-')) return IMAGES.weddingDeg;
  }

  if (imagePath) {
    if (imagePath.includes('sindhi_biryani')) return IMAGES.sindhiBiryani;
    if (imagePath.includes('chicken_biryani') || imagePath.includes('food_special_biryani')) return IMAGES.chickenBiryani;
    if (imagePath.includes('chicken_qorma')) return IMAGES.chickenQorma;
    if (imagePath.includes('mutton') || imagePath.includes('kunna')) return IMAGES.muttonKunna;
    if (imagePath.includes('wedding_deg') || imagePath.includes('catering')) return IMAGES.weddingDeg;
    if (imagePath.includes('hero_azhar_pakwan_spread')) return IMAGES.heroSpread;
    return imagePath;
  }

  if (categoryId === 'biryani') return IMAGES.chickenBiryani;
  if (categoryId === 'chicken') return IMAGES.chickenQorma;
  if (categoryId === 'mutton') return IMAGES.muttonKunna;
  if (categoryId === 'catering') return IMAGES.weddingDeg;

  return IMAGES.chickenBiryani;
};

export default IMAGES;
