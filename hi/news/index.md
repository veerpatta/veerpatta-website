---
layout: default
title: स्कूल समाचार
description: वीर पट्टा पब्लिक स्कूल से नवीनतम समाचार और अपडेट
lang: hi
permalink: /hi/news/
---

{% include header.html %}

<main class="news container lang-hi" id="news">
  <h1>स्कूल समाचार और अपडेट</h1>
  <p>वीर पट्टा पब्लिक स्कूल में नवीनतम घटनाओं के बारे में सूचित रहें।</p>

  <div class="news-list">
    {% assign hi_news = site.news | where: "lang", "hi" | sort: "date" | reverse %}
    {% if hi_news.size > 0 %}
      {% for post in hi_news %}
        <article class="news-item">
          <time datetime="{{ post.date | date_to_xmlschema }}" class="news-date">
            {{ post.date | date: "%d %B %Y" }}
          </time>
          <h2 class="news-title">{{ post.title }}</h2>
          <div class="news-content">
            {{ post.content }}
          </div>
        </article>
      {% endfor %}
    {% else %}
      <p>इस समय कोई समाचार लेख उपलब्ध नहीं हैं। जल्द ही वापस जांचें!</p>
    {% endif %}
  </div>
</main>

{% include footer.html %}

<style>
.news-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
}

.news-item {
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.news-date {
  display: block;
  font-size: 14px;
  color: var(--muted-text);
  margin-bottom: 8px;
}

.news-title {
  margin: 0 0 16px 0;
  color: var(--brand-blue);
  font-size: 24px;
}

.news-content {
  line-height: 1.8;
}

.news-content ul {
  margin: 16px 0;
  padding-left: 24px;
}

@media (min-width: 768px) {
  .news-title {
    font-size: 28px;
  }
}
</style>
