---
layout: default
title: School News
description: Latest news and updates from Veer Patta Public School
lang: en
permalink: /en/news/
---

{% include header.html %}

<main class="news container" id="news">
  <h1>School News & Updates</h1>
  <p>Stay informed about the latest happenings at Veer Patta Public School.</p>

  <div class="news-list">
    {% assign en_news = site.news | where: "lang", "en" | sort: "date" | reverse %}
    {% if en_news.size > 0 %}
      {% for post in en_news %}
        <article class="news-item">
          <time datetime="{{ post.date | date_to_xmlschema }}" class="news-date">
            {{ post.date | date: "%B %d, %Y" }}
          </time>
          <h2 class="news-title">{{ post.title }}</h2>
          <div class="news-content">
            {{ post.content }}
          </div>
        </article>
      {% endfor %}
    {% else %}
      <p>No news articles available at the moment. Check back soon!</p>
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
