# 📸 Media Upload Guide - Veer Patta Public School Website

## Quick Start (5 Minutes)

### Step 1: Navigate to the Right Folder

Go to GitHub repository: [veerpatta/veerpatta-website](https://github.com/veerpatta/veerpatta-website)

Navigate to the folder where you want to add media:

| Content Type | Folder Path |
|--------------|-------------|
| **Home Page Hero** | `assets/media/home/` |
| **Gallery - Sports** | `assets/media/gallery/sports/` |
| **Gallery - NCC** | `assets/media/gallery/ncc/` |
| **Gallery - Cultural** | `assets/media/gallery/cultural/` |
| **Gallery - Academic** | `assets/media/gallery/academic/` |
| **Gallery - Celebrations** | `assets/media/gallery/celebrations/` |
| **About Page** | `assets/media/about/` |
| **Admissions** | `assets/media/admissions/` |
| **Academics** | `assets/media/academics/` |

### Step 2: Upload Files

1. Click **"Add file"** → **"Upload files"**
2. Drag and drop your images/videos
3. **Supported formats:**
   - Images: `.jpg`, `.png`, `.webp`
   - Videos: `.mp4`, `.webm` (recommended: `.mp4`)

### Step 3: Register Gallery Files (Gallery Only)

For gallery uploads, you need one extra step:

1. Open `assets/js/gallery-items.js`
2. Click the edit (pencil) icon
3. Add your filenames to the appropriate category:
```javascript
window.GalleryLoader.registerItems('sports', [
  'relay-race.jpg',           // ← Add your files here
  'football-match.mp4'
]);
```

4. Commit changes

### Step 4: Add Captions (Optional)

For bilingual captions in gallery:

1. Open `assets/media/gallery/{category}/captions.txt`
2. Add line: `filename.ext | EN: English caption | HI: Hindi caption`
3. Example:
```
relay-race.jpg | EN: Annual Sports Day 2024 | HI: वार्षिक खेल दिवस 2024
football-match.mp4 | EN: Football Practice | HI: फुटबॉल अभ्यास
```

4. Commit changes

---

## Detailed Instructions

### A. Home Page Media Upload

The home page displays a rotating hero section with images and videos.

#### Steps:

1. **Navigate to home folder:**
   - Go to: `assets/media/home/`

2. **Upload your files:**
   - Click "Add file" → "Upload files"
   - Drag and drop your media files
   - Write a commit message (e.g., "Add sports day photos")
   - Click "Commit changes"

3. **That's it!** ✅
   - Home page automatically detects and displays all media in this folder
   - No additional configuration needed
   - The system will rotate through all available media

#### Best Practices:
- Use high-quality images (at least 1920x1080 pixels)
- Keep file sizes under 5MB for faster loading
- Use descriptive filenames: `sports-day-2024.jpg` instead of `IMG_1234.jpg`

---

### B. Gallery Media Upload

Gallery pages require an extra registration step to display media.

#### Steps:

1. **Upload media files:**
   - Navigate to the appropriate category folder:
     - Sports: `assets/media/gallery/sports/`
     - NCC: `assets/media/gallery/ncc/`
     - Cultural: `assets/media/gallery/cultural/`
     - Academic: `assets/media/gallery/academic/`
     - Celebrations: `assets/media/gallery/celebrations/`
   - Click "Add file" → "Upload files"
   - Upload your images/videos
   - Commit the changes

2. **Register the files:**
   - Open file: `assets/js/gallery-items.js`
   - Click the edit icon (pencil)
   - Find the appropriate category section:
   ```javascript
   window.GalleryLoader.registerItems('sports', [
     'existing-file-1.jpg',
     'existing-file-2.mp4',
     'your-new-file.jpg',  // ← Add your filename here
     'another-new-file.mp4'
   ]);
   ```
   - Add your filenames to the array
   - Make sure each filename is in quotes and separated by commas
   - Commit the changes

3. **Add captions (Optional but recommended):**
   - Navigate to: `assets/media/gallery/{category}/captions.txt`
   - Click edit icon
   - Add a new line for each file:
   ```
   filename.jpg | EN: English caption | HI: Hindi caption
   ```
   - Example:
   ```
   science-fair.jpg | EN: Students presenting projects at Science Fair 2024 | HI: विज्ञान मेला 2024 में परियोजनाएं प्रस्तुत करते छात्र
   ```
   - Commit the changes

#### Gallery Categories:

| Category | Use For |
|----------|---------|
| **sports** | Sports activities, competitions, athletic events |
| **ncc** | NCC parades, camps, training activities |
| **cultural** | Cultural programs, dance, music, drama |
| **academic** | Classroom activities, projects, academic achievements |
| **celebrations** | Annual days, festivals, special events |

---

### C. Other Page Media

For About, Admissions, and Academics pages:

1. **Navigate to the folder:**
   - About: `assets/media/about/`
   - Admissions: `assets/media/admissions/`
   - Academics: `assets/media/academics/`

2. **Upload files:**
   - Click "Add file" → "Upload files"
   - Upload your media
   - Commit changes

3. **No registration needed!** ✅
   - These pages automatically load all media from their folders

---

## File Naming Best Practices

### ✅ Good Names:
- `annual-sports-day-2024.jpg`
- `ncc-parade-republic-day.mp4`
- `science-exhibition-winner.jpg`
- `cultural-fest-dance-performance.mp4`

### ❌ Avoid:
- `IMG_1234.jpg` (not descriptive)
- `DSC_5678.jpg` (camera default names)
- `photo 1.jpg` (spaces in names)
- `NEW FILE!!!.mp4` (special characters)

### Rules:
- Use lowercase letters
- Use hyphens (-) instead of spaces
- Be descriptive
- Include year if relevant
- Use only letters, numbers, and hyphens

---

## Image & Video Specifications

### Images:

| Requirement | Specification |
|-------------|---------------|
| **Format** | `.jpg`, `.png`, `.webp` (preferred: `.jpg`) |
| **Resolution** | Minimum 1920x1080 (Full HD) |
| **Aspect Ratio** | 16:9 recommended |
| **File Size** | Under 5MB (compress if needed) |
| **Color Space** | sRGB |

### Videos:

| Requirement | Specification |
|-------------|---------------|
| **Format** | `.mp4` (preferred), `.webm` |
| **Resolution** | 1920x1080 (Full HD) or 1280x720 (HD) |
| **Codec** | H.264 for MP4 |
| **Duration** | 30 seconds to 2 minutes recommended |
| **File Size** | Under 50MB (compress if needed) |
| **Aspect Ratio** | 16:9 |

---

## Troubleshooting

### Problem: "My uploaded image doesn't appear on the gallery"

**Solution:**
- Did you register the file in `gallery-items.js`?
- Check spelling: filename in `gallery-items.js` must exactly match the uploaded file
- Check the category: Make sure you added it to the correct category array

### Problem: "Caption shows 'undefined' or missing"

**Solution:**
- Open `captions.txt` in the correct category folder
- Verify the format: `filename | EN: caption | HI: caption`
- Check spelling: filename must exactly match
- Make sure you saved/committed the changes

### Problem: "Video doesn't play"

**Solution:**
- Use `.mp4` format (most compatible)
- Check file size (under 50MB)
- Verify the video codec is H.264
- Try playing the video locally first to ensure it's not corrupted

### Problem: "Home page only shows some media"

**Solution:**
- All media in `assets/media/home/` will be shown
- Verify files are actually uploaded to the correct folder
- Check browser console for errors (F12 key)
- Clear browser cache and reload

### Problem: "File upload fails"

**Solution:**
- Check file size (GitHub has 100MB limit per file)
- Compress large files before uploading
- Check internet connection
- Try uploading fewer files at once

---

## Image Compression Tools

If your images are too large:

### Online Tools (Free):
1. **TinyPNG** - https://tinypng.com/
   - Drag and drop images
   - Automatically compresses
   - Download compressed versions

2. **Squoosh** - https://squoosh.app/
   - More control over quality
   - Compare before/after
   - Browser-based

3. **Compress JPEG** - https://compressjpeg.com/
   - Simple and fast
   - Batch compression

### Video Compression:
1. **HandBrake** (Desktop app) - https://handbrake.fr/
   - Free and powerful
   - Preset for web video

2. **CloudConvert** - https://cloudconvert.com/
   - Online converter
   - Multiple format support

---

## Commit Message Best Practices

When uploading files, you need to write a commit message. Here are good examples:

### ✅ Good Commit Messages:
- `Add sports day 2024 photos to gallery`
- `Upload NCC parade videos`
- `Update home page hero images`
- `Add cultural fest photos with captions`

### ❌ Avoid:
- `Update` (too vague)
- `Changes` (not descriptive)
- `asdf` (meaningless)
- `Fixed stuff` (unclear)

---

## Quick Reference Checklist

### For Home Page Upload:
- [ ] Navigate to `assets/media/home/`
- [ ] Upload images/videos
- [ ] Commit changes
- [ ] Done! ✅

### For Gallery Upload:
- [ ] Navigate to `assets/media/gallery/{category}/`
- [ ] Upload images/videos
- [ ] Commit upload
- [ ] Edit `assets/js/gallery-items.js`
- [ ] Add filenames to appropriate category
- [ ] Commit registration
- [ ] (Optional) Edit `captions.txt`
- [ ] (Optional) Add captions
- [ ] (Optional) Commit captions
- [ ] Done! ✅

### For Other Pages:
- [ ] Navigate to appropriate folder
- [ ] Upload files
- [ ] Commit changes
- [ ] Done! ✅

---

## Getting Help

If you encounter issues:

1. **Check this guide** - Review the troubleshooting section
2. **Verify file paths** - Ensure files are in correct folders
3. **Check spelling** - Filenames must match exactly
4. **Browser console** - Press F12 to see error messages
5. **Ask for help** - Contact the technical team with specific error details

---

## Examples

### Example 1: Adding Sports Photos

1. Go to: `assets/media/gallery/sports/`
2. Upload: `cricket-match-2024.jpg`, `football-tournament.jpg`
3. Edit: `assets/js/gallery-items.js`
4. Add:
```javascript
window.GalleryLoader.registerItems('sports', [
  'cricket-match-2024.jpg',
  'football-tournament.jpg'
]);
```
5. Edit: `assets/media/gallery/sports/captions.txt`
6. Add:
```
cricket-match-2024.jpg | EN: Inter-house Cricket Match 2024 | HI: अंतर-सदन क्रिकेट मैच 2024
football-tournament.jpg | EN: District Football Tournament | HI: जिला फुटबॉल प्रतियोगिता
```

### Example 2: Updating Home Page

1. Go to: `assets/media/home/`
2. Upload: `school-building-front.jpg`, `students-assembly.jpg`
3. Commit with message: "Add new school photos to home page"
4. Done! No additional steps needed.

---

## Important Notes

1. **File Size Limits:**
   - GitHub: 100MB per file
   - Recommended: Keep images under 5MB, videos under 50MB

2. **Browser Caching:**
   - After uploading, you may need to hard refresh (Ctrl+F5 or Cmd+Shift+R)
   - Changes can take a few minutes to appear on the live site

3. **Mobile Optimization:**
   - High-resolution images will be automatically optimized for mobile
   - Videos will use appropriate playback settings for mobile devices

4. **Backup:**
   - GitHub keeps history of all files
   - You can always revert changes if needed
   - Never worry about losing files

---

## System Features (Technical Info)

The media management system includes:

- **Automatic Detection:** Home page and non-gallery pages auto-load media
- **Format Support:** JPG, PNG, WebP images; MP4, WebM videos
- **Lazy Loading:** Images load as needed for better performance
- **Responsive Design:** Media adapts to screen sizes
- **Bilingual Captions:** Support for English and Hindi
- **Video Controls:** Muted autoplay for gallery, full controls in modal
- **Accessibility:** Proper alt text and ARIA labels

You don't need to worry about these technical details - just upload files correctly and the system handles the rest!

---

**Last Updated:** November 2024
**Version:** 1.0
**Maintained by:** Veer Patta Public School Technical Team
