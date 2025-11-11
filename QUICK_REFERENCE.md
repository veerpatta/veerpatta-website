# Quick Reference - Media Upload System

## 📸 After Uploading Gallery Media

**Edit this file:** `assets/js/gallery-items.js`

**Add your filename:**
```javascript
window.GalleryLoader.registerItems('sports', [
  'your-file-name.jpg'  // ← Add here
]);
```

## 📁 Folder Locations

- **Home hero:** `assets/media/home/`
- **Gallery sports:** `assets/media/gallery/sports/`
- **Gallery NCC:** `assets/media/gallery/ncc/`
- **Gallery cultural:** `assets/media/gallery/cultural/`
- **Gallery academic:** `assets/media/gallery/academic/`
- **Gallery celebrations:** `assets/media/gallery/celebrations/`
- **About page:** `assets/media/about/`
- **Admissions:** `assets/media/admissions/`
- **Academics:** `assets/media/academics/`

## 📝 File Name Format

✅ **Good:** `sports-day-2024.jpg`, `ncc-drill.mp4`
❌ **Bad:** `IMG 1234.jpg`, `my video.mp4`

**Rule:** Lowercase, hyphens, no spaces

## 🎥 Video Limits

- **Max size:** 100MB per file
- **Recommended:** 50MB, 720p, MP4
- **Compress:** Use HandBrake or online tools

## 📋 Caption Format

In `captions.txt`:
```
filename.ext | EN: English text | HI: Hindi text
```

## 🔗 Full Guide

See: [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md) or [MEDIA_UPLOAD_GUIDE_HI.md](MEDIA_UPLOAD_GUIDE_HI.md)
