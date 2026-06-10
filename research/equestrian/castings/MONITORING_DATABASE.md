# База мониторинга кастингов (верховая езда · 16–20 лет)

**Последняя полная проверка:** 10 июня 2026  
**Машиночитаемый реестр:** [`castings-registry.json`](castings-registry.json)  
**Чеклист для агента:** [`CHECKLIST_проверка.md`](CHECKLIST_проверка.md)

---

## Как пользоваться

1. Периодически (раз в **3–7 дней**, в пик сезона — **ежедневно**) запускай в Cursor:
   > «Проверь актуальность кастингов по `research/equestrian/castings/castings-registry.json` и обнови сайт»

2. Агент должен:
   - пройти платформы и searchQueries из JSON;
   - обновить `active` / `watch` / `archive`;
   - добавить запись в `checkLog`;
   - перенести новые открытые кастинги в `programs.html` (категория **Кастинги**);
   - закрыть истёкшие (`closed: true`).

3. После изменений: `cp programs.html index.html` + Canvas.

---

## Критерии отбора (напоминание)

| Поле | Значение |
|------|----------|
| Возраст | 16–20 (или playing age 18–25, если убедительно) |
| Езда | см. уровни ниже |
| Статус | только **открытый** набор |
| Регионы | UK, USA, Canada, EU, IE, online |

### Уровни «верховая езда» (для `desc` на сайте)

| Код в JSON | Текст в карточке `desc` | Когда выбирать |
|------------|-------------------------|----------------|
| `required` | **Верховая езда: обязательна** | В объявлении must / required / proficient |
| `preferred` | **Верховая езда: желательна** | cowboy, ranch, western — плюс, но не must |
| `not_required` | **Верховая езда: не требуется** | Ранчо/сельская тема без сцен в седле |

**Формат `desc` (как на сайте):**  
`Тип: … · Страна (город) · Верховая езда: … · Оплата: да/нет. Контакт: …`

**Формат `summary`:** суть роли + одной фразой про езду, если важно.

---

## Платформы для проверки

| ID | Платформа | URL | Частота |
|----|-----------|-----|---------|
| backstage | Backstage | https://www.backstage.com/casting/?keyword=horse | ежедневно |
| mandy | Mandy | https://www.mandy.com/uk/casting/ | ежедневно |
| starnow | StarNow | https://www.starnow.com/uk/casting/ | ежедневно |
| projectcasting | Project Casting | https://projectcasting.com/jobs?skills=Horseback+Riding | ежедневно |
| castingnetworks | Casting Networks | https://www.castingnetworks.com/ | ежедневно |
| kidscasting | KidsCasting (teens) | https://kidscasting.com/castingcalls/for-teens | ежедневно |
| allcasting | Allcasting | https://allcasting.com/castingcalls | еженедельно |
| playbill | Playbill | https://www.playbill.com/jobs | еженедельно |
| mma-spain | MMA Feed (ES) | https://wall.mymotheragency.com/ | еженедельно |
| onlinecasting-za | Onlinecasting ZA | https://www.onlinecasting.co.za/ | ежемесячно |

**Поисковые фразы** — в `castings-registry.json` → `searchQueries`.

---

## Агентства (без публичного дедлайна — регистрация)

| Агентство | Регион | Навык | Действие |
|-----------|--------|-------|----------|
| [Take 3 Agency](https://www.take3agency.com/) | UK | SPACT, horse | Профиль + riding reel |
| [Casting Collective SPACT](https://www.castingcollective.co.uk/production/spact) | UK | horse riders | Регистрация SPACT |
| [Spact UK](https://app.spotlight.com/contacts/listing/c6a0ec8f-c205-4dc1-a216-b6d78992a2be) | UK | stunts, horse | Open to new performers |
| [Extra People](https://www.extrapeople.co.uk/) | UK | extras + riding skill | Отметить horse riding |
| [CS Equine Models](https://www.cs-equine-models.co.uk/) | UK | equine casting | Портфолио всадника |
| [Film Horses Ireland](https://filmhorsesireland.com/) | IE | film horses | +353 83 434 4993 |

**Совет:** вестерны и историческое кино часто набирают наездниц 16–25 через SPACT, а не публичные объявления.

---

## Активные кастинги (10 июня 2026)

| Дедлайн | Проект | Возраст | Езда | Сайт id |
|---------|--------|---------|------|---------|
| 26 июн 2026 ⚠️ | Love in the Wind — Luke | 18–30 | желательна | 47 |
| 26 июн 2026 ⚠️ | Love in the Wind — Savannah | 18–30 | желательна | 48 |
| 2 июл 2026 | Fallow — Romi | 18–25 | **обязательна** | 46 |

### На мониторинге (на сайте)

| Проект | Возраст | Езда | Сайт id | Контакт |
|--------|---------|------|---------|---------|
| Netflix ES (Lupus Films) | женщины 20–50 | обязательна | 50 | lupuscast@gmail.com |

---

## Архив (не показывать как открытые)

| Проект | Езда | Почему закрыт |
|--------|------|---------------|
| Real London — Male Rider | обязательна | истёк **17.11.2025** |
| Blood & Soil — Riders 17–18 (id 49) | обязательна | истёк 28.02.2026 — **эталон для 16–20** |
| Sportswear Commercial | обязательна | 2023 |
| Gold Mountain riders | обязательна | 30.04.2026, возраст 25–55 |
| Texas Western lead | обязательна | 27.05.2026, 35+ |
| Burton & Robinson | обязательна | 03.04.2026 |
| Palomino Alissa | не требуется | 13.03.2026 |
| Karl-May-Spiele DE | обязательна | театр, набор до 22.02.2026 |
| Legends Pony Express | обязательна | 2023 |

Полный список с URL — в `castings-registry.json` → `archive`.

---

## Журнал проверок

| Дата | Активных | Примечание |
|------|----------|------------|
| 2026-06-10 | 3 (+1 watch) | Первый глобальный ресёрч; Real London закрыт |
| 2026-06-10 | 3 (+1 watch) | Сайт: +49 Blood & Soil, +50 Netflix; Love in the Wind urgent; README |

Новые записи — в JSON `checkLog` и сюда одной строкой.
