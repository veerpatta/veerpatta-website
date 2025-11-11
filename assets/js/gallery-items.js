/**
 * Gallery Items Registry
 *
 * INSTRUCTIONS: After uploading media to assets/media/gallery/,
 * add the filenames to the appropriate array below.
 *
 * Example:
 * sports: ['relay-race.jpg', 'football-match.mp4', 'cricket.jpg']
 */

(function() {
  'use strict';

  // Register your uploaded files here
  window.GalleryLoader.registerItems('sports', [
    // Add sports media filenames here
    // Example: 'relay-race.jpg', 'football-match.mp4'
  ]);

  window.GalleryLoader.registerItems('ncc', [
    // Add NCC media filenames here
    // Example: 'drill-practice.mp4', 'parade.jpg'
  ]);

  window.GalleryLoader.registerItems('cultural', [
    // Add cultural media filenames here
    // Example: 'dance-performance.mp4', 'drama.jpg'
  ]);

  window.GalleryLoader.registerItems('academic', [
    // Add academic media filenames here
    // Example: 'science-lab.jpg', 'lead-class.mp4'
  ]);

  window.GalleryLoader.registerItems('celebrations', [
    // Add celebrations media filenames here
    // Example: 'annual-day.mp4', 'independence-day.jpg'
  ]);

})();
