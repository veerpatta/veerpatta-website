# 🏫 Veer Patta Public School Website - Project Guide

**Welcome!** This guide explains everything about the Veer Patta Public School website in simple terms.

## 📚 What is This Project?

This is the official website for **Veer Patta Public School** located in Nokha, Rajasthan, India. The website provides information about the school in both **English** and **Hindi** languages.

### What Can You Find on the Website?

- 🏠 **Home Page**: Introduction to the school
- 👥 **About**: School history, vision, and principal's message
- 📖 **Academics**: Information about curriculum and programs
- 🎓 **Admissions**: How to enroll students
- 🖼️ **Gallery**: Photos and videos of school activities
- 📞 **Contact**: How to reach the school

## 🌐 Website Languages

The website is available in:
- **English** (`/en/`) - For English-speaking visitors
- **हिंदी** (`/hi/`) - For Hindi-speaking visitors

Both versions have the same content, just in different languages.

## 🎯 Who Uses This Website?

1. **Parents** - Looking for school information and admissions
2. **Students** - Current and prospective students
3. **Teachers** - School staff members
4. **Community** - People in Nokha and surrounding areas

## 📱 Important Features

### Mobile-Friendly Design
70% of visitors use mobile phones, so the website works great on smartphones!

### WhatsApp Contact
Click the green WhatsApp button to contact the school directly.

### Photo & Video Gallery
View school events, activities, and celebrations.

### Privacy-Safe
No cookies or tracking - respects your privacy.

## 📂 How the Website is Organized

```
Website Files/
├── en/              ← English pages (Home, About, etc.)
├── hi/              ← Hindi pages (होम, परिचय, etc.)
├── assets/          ← Images, videos, and styles
│   ├── css/         ← Website colors and design
│   ├── js/          ← Interactive features
│   ├── images/      ← School photos
│   └── media/       ← Gallery photos/videos
├── _includes/       ← Reusable parts (header, footer)
└── _layouts/        ← Page templates
```

## 🖼️ Adding Photos and Videos

Want to add new photos or videos? It's easy!

### Quick Steps:
1. Upload image/video to the correct folder in `assets/media/`
2. For gallery items, register the filename in `assets/js/gallery-items.js`
3. Save your changes

📖 **Full Instructions**: See [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md) for step-by-step guide.

### Where to Upload:

| Content Type | Folder Location |
|--------------|-----------------|
| Home page hero | `assets/media/home/` |
| Sports gallery | `assets/media/gallery/sports/` |
| NCC gallery | `assets/media/gallery/ncc/` |
| Cultural events | `assets/media/gallery/cultural/` |
| Academic activities | `assets/media/gallery/academic/` |
| Celebrations | `assets/media/gallery/celebrations/` |

## 🔧 Technical Information

### Built With:
- **Jekyll** - Website generator (free and simple)
- **GitHub Pages** - Free hosting from GitHub
- **HTML/CSS/JavaScript** - Standard web technologies

### How It Works:
1. Write content in simple text files (Markdown)
2. Jekyll converts it to a beautiful website
3. GitHub automatically publishes it online
4. Website appears at: https://veerpatta.github.io/veerpatta-website/

### Updates Happen Automatically:
When you save changes, GitHub rebuilds the website in 2-3 minutes!

## 📞 Getting Help

### For Non-Technical Questions:
- **Email**: veerpatta.school@gmail.com
- **WhatsApp**: Click the button on the website

### For Technical Questions:
- See [CONTRIBUTING.md](CONTRIBUTING.md) for developer guidelines
- Check [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for technical details

## 🎓 Learning Resources

### Want to Learn More?

**About Jekyll (Website Builder):**
- [Jekyll Official Website](https://jekyllrb.com/)
- [GitHub Pages Documentation](https://pages.github.com/)

**About Markdown (Text Formatting):**
- [Markdown Guide](https://www.markdownguide.org/)
- It's like Word, but simpler - just text with symbols!

**About GitHub (Where Website Lives):**
- [GitHub Hello World Guide](https://guides.github.com/activities/hello-world/)

## ❓ Common Questions

### How do I change text on the website?
1. Find the page in `en/` or `hi/` folders
2. Open the `.md` file
3. Edit the text
4. Save - website updates automatically!

### How do I add a new photo to the gallery?
Follow the [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md) - it has pictures and step-by-step instructions!

### How do I change the school phone number?
1. Open `_includes/header.html`
2. Find the WhatsApp link
3. Update the phone number
4. Save changes

### Can I break the website by accident?
Not easily! GitHub keeps all old versions. If something goes wrong, we can restore it.

### How long does it take for changes to appear?
Usually 2-3 minutes after saving.

## 🌟 Best Practices

### When Adding Content:

✅ **Do:**
- Write clear, simple language
- Add both English and Hindi versions
- Test on mobile phone
- Use good quality photos (not blurry)
- Check spelling and grammar

❌ **Don't:**
- Use very large videos (keep under 50MB)
- Forget to add Hindi translation
- Use copyrighted images without permission
- Include personal phone numbers or addresses

### When Adding Photos:

✅ **Good Filenames:**
- `sports-day-2024.jpg`
- `ncc-drill-practice.jpg`
- `annual-function-2024.mp4`

❌ **Bad Filenames:**
- `IMG_1234.jpg` (not descriptive)
- `my video.mp4` (has spaces)
- `photo.png` (not specific)

## 📊 Website Statistics

- **Languages**: 2 (English & Hindi)
- **Pages**: 7 (Home, About, Academics, Admissions, Gallery, Contact, Privacy)
- **Target Audience**: Parents & students in Nokha, Rajasthan
- **Primary Device**: Mobile phones (70% of visitors)
- **Network**: Works well on 3G connections

## 🎉 Success Metrics

The website is successful when:
- ✅ Parents can easily find admission information
- ✅ Works fast on mobile phones
- ✅ Available in both English and Hindi
- ✅ Easy to contact the school via WhatsApp
- ✅ Gallery shows school activities
- ✅ Information is up-to-date

## 📝 Need More Help?

Choose the guide that matches your needs:

| I want to... | Read this document |
|--------------|-------------------|
| Understand the project | **PROJECT_GUIDE.md** (this file) |
| Upload photos/videos | [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md) |
| Make code changes | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Understand technical structure | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Quick reference for uploads | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| See what changed | [CHANGELOG.md](CHANGELOG.md) |

---

**Remember**: This website represents Veer Patta Public School. Keep content professional, accurate, and respectful! 🏫

*Last Updated: November 2025*
