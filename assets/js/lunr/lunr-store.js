---
layout: null
---

var store1 = [
  {%- for c in site.collections -%}
    {%- if forloop.last -%}
      {%- assign l = true -%}
    {%- endif -%}
    {%- assign docs = c.docs | where_exp:'doc','doc.search != false' -%}
    {%- for doc in docs -%}
      {%- if doc.header.teaser -%}
        {%- capture teaser -%}{{ doc.header.teaser }}{%- endcapture -%}
      {%- else -%}
        {%- assign teaser = site.teaser -%}
      {%- endif -%}
      {
        "title": {{ doc.title | jsonify }},
        "excerpt":
          {%- if site.search_full_content == true -%}
            {{ doc.content | strip_html | strip_newlines | jsonify }},
          {%- else -%}
            {{ doc.content | strip_html | strip_newlines | truncatewords: 50 | jsonify }},
          {%- endif -%}
        "categories": {{ doc.categories | jsonify }},
        "tags": {{ doc.tags | jsonify }},
        "url": {{ doc.url | absolute_url | jsonify }},
        "teaser":
          {%- if teaser contains "://" -%}
            {{ teaser | jsonify }}
          {%- else -%}
            {{ teaser | absolute_url | jsonify }}
          {%- endif -%}
      }{%- unless forloop.last and l -%},{%- endunless -%}
    {%- endfor -%}
  {%- endfor -%}]


var store2 = [
  {%- for page in site.pages -%}
    {%- if forloop.last -%}
      {%- assign l = true -%}
    {%- endif -%}
    {%- if page.header.teaser -%}
      {%- capture teaser -%}{{ page.header.teaser }}{%- endcapture -%}
    {%- else -%}
      {%- assign teaser = site.teaser -%}
    {%- endif -%}
    {
      "title": {{ page.title | jsonify }},
      "excerpt":
        {%- if site.search_full_content == true -%}
          {{ page.content | strip_html | strip_newlines | jsonify }},
        {%- else -%}
          {{ page.content | strip_html | strip_newlines | truncatewords: 50 | jsonify }},
        {%- endif -%}
      "categories": {{ page.categories | jsonify }},
      "tags": {{ page.tags | jsonify }},
      "url": {{ page.url | absolute_url | jsonify }},
      "teaser":
        {%- if teaser contains "://" -%}
          {{ teaser | jsonify }}
        {%- else -%}
          {{ teaser | absolute_url | jsonify }}
        {%- endif -%}
    }{%- unless forloop.last and l -%},{%- endunless -%}
    
  {%- endfor -%}]

  var store = concat(store1,store2)
