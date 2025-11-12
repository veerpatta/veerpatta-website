---
layout: default
title: School News
description: Latest news and updates from Veer Patta Public School
permalink: /en/news/
lang: en
---

{% include header.html %}

<main class="container">
  <h1>School News & Updates</h1>

  <div class="news-list">
    {% assign en_news = site.news | where: "lang", "en" | sort: "date" | reverse %}
    {% for post in en_news %}
      <article class="news-item">
        <h2>{{ post.title }}</h2>
        <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: "%B %d, %Y" }}</time>
        <div class="news-content">
          {{ post.content }}
        </div>
      </article>
    {% endfor %}

    {% if en_news.size == 0 %}
      <p>No news updates available at this time.</p>
    {% endif %}
  </div>
</main>

{% include footer.html %}
