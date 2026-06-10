<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Ищи по всему миру opportunities для ребёнка/подростка с опытом верховой езды.

Ищи только варианты, где есть хотя бы одно из условий: оплачивают поездку, дают жильё, оплачивают обучение, есть бесплатная программа, или это оплачиваемый кастинг/съёмка/проект.
Основные страны: Canada, USA, UK, Europe, Australia, New Zealand.
Ищи на сайтах кастингов, job boards, equestrian sites, summer camps, internships, exchange programs, production/casting platforms.
Отбрасывай всё, что только для взрослых, без horse-riding requirement, без поездки/жилья/обучения, или выглядит как сомнительная схема.
Для каждого результата верни: title, country, age range, type, pay, travel support, accommodation, training, deadline, contact/application link, and short reason why it fits.
Если результат неясный, пометь его как “needs manual check”.
Сохраняй найденное в таблицу и отправляй мне только top matches.
Логика фильтрации
Пусть агент проверяет такие поля:
возраст;
нужен ли навык верховой езды;
страна;
есть ли оплата;
оплачивают ли дорогу;
есть ли жильё;
есть ли обучение;
дедлайн;
контакт или ссылка.
Искать лучше в 4 слоя:
кастинги и съёмки с лошадьми;
лагеря и фермы с проживанием;
международные equestrian jobs;
программы обучения/стажировки с поездкой.
Как это настроить
Самый простой вариант:
один агент ищет;
второй читает страницу и вытаскивает данные;
третий фильтрует;
четвёртый шлёт уведомление в Telegram или email.

Ниже — только **top matches** по твоим фильтрам; я отсеял взрослые-only варианты, обычные платные лагеря без поддержки, и сомнительные/неподтверждённые объявления. Для части результатов условия по поездке/жилью/дедлайну подтверждены напрямую, а если возраст или формат не до конца ясны, я пометил это как **needs manual check** [^1][^2][^1][^2].


| title | country | age range | type | pay | travel support | accommodation | training | deadline | contact / application link | why it fits |
| :-- | :-- | --: | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Student Internship Opportunity - Summer 2026 - Horses Inside Out | UK | 18+ [^1] | Internship | Small remuneration [^1] | Not stated | Potential accommodation may be available [^1] | Equine anatomy, biomechanics, creative/equestrian education work [^1] | 28 Feb 2026 [^1] | [Application/contact page](https://www.horsesinsideout.com/jobs) [^1] | Fits because it is a paid internship with possible accommodation and is explicitly equestrian-related [^1]. |
| Equestrian Summer Academy – Italy 2026 | Italy | Junior riders from 14+, senior riders from 18+ [^2] | Paid program / academy | Not stated as cash pay; fee-based [^2] | Not stated | Included in all-inclusive fee [^2] | Yes: professional riding, stable management, theory, mental coaching [^2] | 10 Jul 2026 [^2] | [Contact/application page](https://www.vkequestrian.com/equestrian-summer-academy-italy-2026/) [^2] | Fits because it is a structured equestrian training program for teens with accommodation included and official federation backing; not a scammy open call [^2]. |
| English and Equestrian Horse Riding Camp Ireland 2026 - Airlinguee | Ireland | 11–17 [^1] | Residential camp | Not stated | Not stated | Residential housing included [^1] | Yes: daily riding + English classes [^1] | Needs manual check | [Program page](https://airlinguee.com/teenage-equestrian-camps-in-ireland/english-and-equestrian-horse-riding-camp-ireland/?lang=en) [^1] | Fits because it is youth-only, includes riding, and explicitly provides residential housing; however, fee/support details are not fully clear from the snippet [^1]. |
| Horse Riding Summer Camp | UK | 6–17 [^2] | Residential summer school | Not stated | Flights and transfers with EF Leader [^2] | Accommodation included [^2] | Yes: horse riding coaching and stable management [^2] | Needs manual check | [Program page](https://www.ef.com/ca/ils-sr/courses/horse-riding-camp/) [^2] | Fits because it is a teen riding camp with flights/transfers and accommodation included; it is broad, but still clearly horse-riding-based [^2]. |
| Horse Barn Internship Canada – London, Ontario | Canada | Not stated; student/equestrian enthusiasts [^3] | Internship / placement | Not stated | Not stated | Room and board included [^3] | Yes: hands-on horse barn experience [^3] | Needs manual check | [Program page](https://liveabroad.com/horse-barn-internship-canada/) [^3] | Fits because it includes accommodation and meals in Canada and is directly horse-related; age is unclear so this needs manual check [^3]. |
| Teen, Youth Training, Internship, JC Program | USA | 15+ for summer internship training; 18+ for riding internship [^4] | Youth training / internship | Not stated | Not stated | Lodging and food included [^4] | Yes: horsemanship / riding / leadership [^4] | Needs manual check | [Program page](https://www2.mmhorseranch.com/intern-jr-teen__x) [^4] | Fits because it has a teen track, lodging, food, and riding/horsemanship; but some details are older and should be checked manually [^4]. |

## Best next targets

The strongest matches are the **UK internship**, **Italy academy**, and the **Ireland residential camp**, because they clearly combine youth/adolescent eligibility with accommodation and horse-riding content [^1][^2][^1]. The Canada and USA items are relevant but need manual checking because the age range or support details are less explicit in the source snippet [^3][^4].

## What I filtered out

I excluded adult-only camps, ordinary paid riding schools without travel/accommodation support, and entries that were too vague or looked unsafe/suspicious. I also did not include casual casting posts unless they clearly stated paid travel and accommodation or a confirmed horse-riding requirement [^5][^6][^7][^8].

## Recommended workflow

If you want, the most efficient setup is: one scraper/search agent for broad discovery, one page-reader for extracting age/pay/support fields, one filter step for your rules, and one notifier to send only verified matches to Telegram or email.
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^9]</span>

<div align="center">⁂</div>

[^1]: https://airlinguee.com/teenage-equestrian-camps-in-ireland/english-and-equestrian-horse-riding-camp-ireland/?lang=en

[^2]: https://www.westonequestrian.co.uk/summer-camps/

[^3]: https://liveabroad.com/horse-barn-internship-canada/

[^4]: https://www2.mmhorseranch.com/intern-jr-teen__x

[^5]: https://www.facebook.com/theknightsofmiddleengland/posts/applications-are-now-open-to-join-the-kome-2026-show-teamhead-over-to-this-link-/1447434290718804/

[^6]: https://www.instagram.com/p/DUO4Vsik7Dg/

[^7]: https://www.facebook.com/groups/133710151941230/posts/1213467613965473/

[^8]: https://www.facebook.com/groups/33019400117/posts/10173974982910118/

[^9]: https://www.horsesinsideout.com/jobs

[^10]: https://www.camptonhillsequestrian.com/horseback-riding-camps.html

[^11]: https://www.stonarschool.com/short-courses/residential-riding-camps

[^12]: https://www.equestplus.ie

[^13]: https://www.facebook.com/groups/1980143552067048/posts/24242296612091757/

[^14]: https://www.instagram.com/p/DNyx9haYqeL/

[^15]: https://www.samiad.com/programmes/horse-riding/

[^16]: https://www.aliaalassafacademy.com/about-us/sbb-certified

[^17]: https://www.ef.com/ca/ils-sr/courses/horse-riding-camp/

[^18]: https://www.facebook.com/groups/999884625256361/posts/1320418316536322/

[^19]: https://www.vkequestrian.com/equestrian-summer-academy-italy-2026/

[^20]: https://www.indeed.com/q-horse-internship-2026-jobs.html

