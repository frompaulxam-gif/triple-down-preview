#!/usr/bin/env python3
"""Build the self-contained, static section-comparison preview."""
from html import escape
from pathlib import Path

HERE = Path(__file__).resolve().parent

questions = [
    ("Who we are", "We are operators first. We’ve built venues, events, brands and communities from the ground up. We understand culture because we live inside it and growth because we’ve sustained it."),
    ("Our approach", "We start with structure. Before campaigns and creative, we look at foundations: revenue streams, margins, positioning, audience clarity and operational friction. Then we build the systems for growth."),
    ("Who we work with", "We work with hospitality venues, music and cultural spaces, food and drink brands, community-led businesses and experience-driven operators building something lasting."),
]

services = [
    ("Brand & positioning", "1ad5504d4296.jpg"),
    ("Programming & experience", "33827fcc685f.jpg"),
    ("Growth & revenue", "cd68a78ef967.jpg"),
    ("Spaces & infrastructure", "50c3211a026f.jpg"),
    ("Community & expansion", "fa5275108959.jpg"),
]

def img(name):
    return f"../../assets/site/{name}"

def original_questions():
    rows = ''.join(f'<details><summary>{escape(title)}<span aria-hidden="true">⌄</span></summary><p>{escape(body)}</p></details>' for title, body in questions)
    return f'<div class="original-faq"><div class="original-faq__rows">{rows}</div></div>'

def original_services():
    return '<div class="original-services">' + ''.join(
        f'<div class="original-service" style="--photo:url(\'{img(photo)}\')"><h4>{escape(title)}</h4></div>'
        for title, photo in services
    ) + '</div>'

def faq_a():
    return '''<div class="faq-a"><div class="faq-a__intro"><span class="eyebrow">THE THINKING BEHIND THE WORK</span><h4>Built from<br><em>the inside.</em></h4><p>Three things worth knowing about us.</p></div><div class="faq-a__list">''' + ''.join(
        f'<details {"open" if i == 0 else ""}><summary><span class="number">0{i+1}</span><span>{escape(title)}</span><span class="plus" aria-hidden="true">+</span></summary><p>{escape(body)}</p></details>' for i, (title, body) in enumerate(questions)
    ) + '</div></div>'

def faq_b():
    return '''<div class="faq-b"><div class="faq-b__shade"><span class="eyebrow">TRIPLE DOWN GROUP / OUR POV</span><h4>The questions<br>behind the work.</h4><div class="faq-b__list">''' + ''.join(
        f'<details {"open" if i == 0 else ""}><summary>{escape(title)}<b aria-hidden="true"></b></summary><p>{escape(body)}</p></details>' for i, (title, body) in enumerate(questions)
    ) + '</div></div></div>'

def faq_c():
    return '''<div class="faq-c"><div class="faq-c__lead"><span class="eyebrow">NO GUESSWORK. NO OUTSIDE-IN THINKING.</span><h4>Culture meets<br>structure.</h4></div><div class="faq-c__stories">''' + ''.join(
        f'<article><span class="number">0{i+1} / 03</span><h5>{escape(title)}</h5><p>{escape(body)}</p></article>' for i, (title, body) in enumerate(questions)
    ) + '</div></div>'

def services_a():
    return '<div class="services-a"><div class="services-a__heading"><span class="eyebrow">WHAT WE BUILD</span><span>01—05</span></div>' + ''.join(
        f'<article><span class="number">0{i+1}</span><img src="{img(photo)}" alt=""><h4>{escape(title)}</h4><span class="arrow" aria-hidden="true">↗</span></article>' for i, (title, photo) in enumerate(services)
    ) + '</div>'

def services_b():
    nav = ''.join(f'<button type="button" class="stage-choice {"is-active" if i == 0 else ""}" data-stage="{i}" aria-pressed="{"true" if i == 0 else "false"}">{escape(title)}</button>' for i, (title, _) in enumerate(services))
    panels = ''.join(f'<div class="stage-panel {"is-active" if i == 0 else ""}" data-panel="{i}" style="--photo:url(\'{img(photo)}\')"><span class="eyebrow">WHAT WE DO</span><h4>{escape(title)}</h4></div>' for i, (title, photo) in enumerate(services))
    return f'<div class="services-b"><div class="services-b__stage">{panels}</div><div class="services-b__nav" aria-label="Explore services">{nav}</div></div>'

def services_c():
    return '<div class="services-c"><div class="services-c__heading"><span class="eyebrow">FROM FIRST IDEA TO WHAT COMES NEXT</span><h4>What we build.</h4></div><div class="services-c__mosaic">' + ''.join(
        f'<article class="tile tile-{i+1}" style="--photo:url(\'{img(photo)}\')"><span>0{i+1} / 05</span><h5>{escape(title)}</h5></article>' for i, (title, photo) in enumerate(services)
    ) + '</div></div>'

options = [
    ('01', 'The editorial index', 'A clear reading order. Copy opens where you need it; the five disciplines become a tight visual index.', faq_a(), services_a()),
    ('02', 'The cinematic chapter', 'The photography stays immersive. One service takes the stage while the rest remain one click away.', faq_b(), services_b()),
    ('03', 'The open story', 'All three answers and all five disciplines are visible together, arranged as a more expressive spread.', faq_c(), services_c()),
]

comparisons = []
for num, title, description, faq, service in options:
    comparisons.append(f'''<section class="option" id="option-{num}">
      <div class="option__heading"><span class="option__number">{num} / 03</span><div><h2>{escape(title)}</h2><p>{escape(description)}</p></div></div>
      <div class="comparison-heading"><span>01 / THE QUESTIONS</span><span>SECTION COMPARISON</span></div>
      <div class="compare"><div class="compare__side"><div class="side-label">CURRENT <span>← Original layout</span></div>{original_questions()}</div><div class="compare__side"><div class="side-label">REDESIGN <span>→ Option {num}</span></div>{faq}</div></div>
      <div class="comparison-heading"><span>02 / WHAT WE DO</span><span>SECTION COMPARISON</span></div>
      <div class="compare"><div class="compare__side"><div class="side-label">CURRENT <span>← Original layout</span></div>{original_services()}</div><div class="compare__side"><div class="side-label">REDESIGN <span>→ Option {num}</span></div>{service}</div></div>
    </section>''')

page = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0b0b0b"><title>Triple Down — section redesign options</title><meta name="description" content="Three side-by-side design directions for the Triple Down questions and services sections."><link rel="stylesheet" href="./style.css"></head><body>
<header class="site-header" id="top"><a class="wordmark" href="../../variants/d/" aria-label="Triple Down Group home">TRIPLE DOWN<br>GROUP</a><span>SECTION STUDY / 29.09.26</span><a href="../../variants/d/">VIEW SITE ↗</a></header>
<main><section class="intro"><div class="intro__meta"><span>TRIPLE DOWN GROUP</span><span>DESIGN OPTIONS — 01 / 03</span></div><h1>Three ways<br>to tell the <em>story.</em></h1><div class="intro__foot"><p>The existing sections are on the left. Three different placements are on the right. The copy and five disciplines stay the same.</p><nav aria-label="Jump to a design direction"><a href="#option-01">01 Editorial index ↘</a><a href="#option-02">02 Cinematic chapter ↘</a><a href="#option-03">03 Open story ↘</a></nav></div></section>''' + ''.join(comparisons) + '''</main><footer><span>TRIPLE DOWN GROUP / SECTION STUDY</span><a href="#top">BACK TO TOP ↑</a></footer><script src="./script.js"></script></body></html>'''
(HERE / 'index.html').write_text(page)
print(HERE / 'index.html')
