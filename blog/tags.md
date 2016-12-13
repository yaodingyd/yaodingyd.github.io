---
layout: page
title: Tags
---


<div class="tags-expo">
  <div class="tags-expo-list">
    {% for tag in site.tags %}
    <a href="#{{ tag[0] | slugify }}" class="post-tag">{{ tag[0] }}</a>
    {% endfor %}
  </div>
  
  <div class="tags-expo-section">
    {% for tag in site.tags %}
    <h2 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h2>
    <ul class="tags-expo-posts">
      {% for post in tag[1] %}   
      <li>
        <h6>
          <a class="tag-post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title | escape }}</a>
          <small class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</small>
        </h6>
      </li>
      {% endfor %}
    </ul>
    {% endfor %}
  </div>
</div>
