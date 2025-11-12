---
layout: default
title: स्कूल समाचार
description: वीर पट्टा पब्लिक स्कूल से नवीनतम समाचार और अपडेट
permalink: /hi/news/
lang: hi
---

{% include header.html %}

<main class="container lang-hi">
  <h1>स्कूल समाचार और अपडेट</h1>

  <div class="news-list">
    {% assign hi_news = site.news | where: "lang", "hi" | sort: "date" | reverse %}
    {% for post in hi_news %}
      <article class="news-item">
        <h2>{{ post.title }}</h2>
        <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: "%d %B %Y" }}</time>
        <div class="news-content">
          {{ post.content }}
        </div>
      </article>
    {% endfor %}

    {% if hi_news.size == 0 %}
      <p>इस समय कोई समाचार अपडेट उपलब्ध नहीं है।</p>
    {% endif %}
  </div>
</main>

{% include footer.html %}
