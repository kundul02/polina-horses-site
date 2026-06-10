# Программы для Полины: как ищем и обновляем

Мультидоменная витрина: **конные программы** и **актёрское мастерство**. Одна страница, переключатель вкладок.

Проект собирает возможности для 16-летней с опытом верховой езды и/или интересом к театру:
- с жильём, обучением, оплатой, покрытием дороги или полностью бесплатным участием;
- по приоритетным регионам: Schengen, Ирландия, UK, USA, Канада, Австралия, New Zealand, Грузия, ЮАР, Аргентина, Польша, Франция.

**Документы:** виза США ✓, украинский биометрический паспорт (Шенген безвиз). Доступность указывается в описании карточки.

## Структура research

```
research/
  equestrian/     # конные программы (7 файлов + сводный)
    castings/     # база мониторинга кастингов (JSON + чеклист)
  acting/         # актёрские программы (сводный + обновления)
```

### Кастинги с верховой ездой (16–20 лет)

Отдельная база мониторинга — не путать с конными лагерями и стажировками.

| Файл | Назначение |
|------|------------|
| [`research/equestrian/castings/castings-registry.json`](research/equestrian/castings/castings-registry.json) | Реестр: платформы, агентства, active / watch / archive |
| [`research/equestrian/castings/MONITORING_DATABASE.md`](research/equestrian/castings/MONITORING_DATABASE.md) | Сводка для человека |
| [`research/equestrian/castings/CHECKLIST_проверка.md`](research/equestrian/castings/CHECKLIST_проверка.md) | Полный промпт для агента |

**На сайте:** категория **«Кастинги»** во вкладке «Конные программы» (не отдельная вкладка).

#### Как проверять потом

**Частота:** раз в **3–7 дней**; в активный сезон (лето, вестерны) — **ежедневно**. Кастинги с лошадьми часто живут 2–5 дней.

**Промпт для Cursor** (скопировать как есть):

```
Проверь актуальность кастингов по research/equestrian/castings/castings-registry.json и обнови сайт
```

Агент должен:
1. Пройти `platforms[]` и `searchQueries[]` из JSON.
2. Сверить `active[]` — URL открыт, дедлайн не истёк (смотреть **Expiration date** на Project Casting).
3. Новые открытые → `castings-registry.json` + карточка в `programs.html` (категория `Кастинги`).
4. Истёкшие → `closed: true`, перенос в `archive`, обновить дедлайн «Закрыт (дата)».
5. **Тройная синхронизация:** `programs.html` → `cp programs.html index.html` → Canvas.
6. Запись в `checkLog` в JSON + строка в `MONITORING_DATABASE.md`.

Подробный чеклист: [`CHECKLIST_проверка.md`](research/equestrian/castings/CHECKLIST_проверка.md).

#### Формат карточки кастинга

| Поле | Правило |
|------|---------|
| `summary` | Суть роли + езда одной фразой |
| `desc` | `Тип: … · Страна (город) · Верховая езда: обязательна \| желательна \| не требуется · Оплата: да/нет. Контакт: …` |
| `riding` в JSON | `required` / `preferred` / `not_required` — дублируется в `desc` |
| `urgent` | `true` если дедлайн &lt; 14 дней |
| `closed` | `true` для архива — видно во вкладке «Закрытые · архив» |

**Уровни езды:**
- **обязательна** — без навыка не подавать (must / proficient / must be able to ride).
- **желательна** — вестерн, ранчо, ковбой: езда сильно помогает, но не must.
- **не требуется** — сельская/ранчо-тема без сцен в седле.

## Где источник правды и что значат цифры

| Что смотришь | Источник правды | В git / на сайте? |
|--------------|-----------------|-------------------|
| **Публичный сайт** (GitHub Pages) | [`programs.html`](programs.html) → `index.html` | ✅ пушится |
| **Canvas в Cursor** | `~/.cursor/projects/.../canvases/equestrian-programs.canvas.tsx` | ❌ **не в репозитории, не деплоится** |
| **База кастингов для проверок** | [`research/equestrian/castings/castings-registry.json`](research/equestrian/castings/castings-registry.json) | ✅ пушится |

**Кастинги — как считать (сейчас):**

| Цифра | Значение |
|-------|----------|
| **Открытые (N)** / **Закрытые · архив (N)** | Переключатель статуса над «Тип программы»; все фильтры ниже применяются к выбранному статусу |
| **Кастинги (4)** при «Открытые» | 4 открытых кастинга в категории |
| **Кастинги (3)** при 18+ | 3 открытых при 18+ (без Netflix 20+) |
| **3 карточки** в списке при 18+ | Только открытые; Netflix появится при **20+** |
| **7 записей** в коде | Все кастинги; 3 закрытых — во вкладке «Закрытые · архив» + фильтр «Кастинги» |
| **2 проекта** | Если считать *фильмы*, а не роли: Fallow + Love in the Wind (у фильма 2 роли → 2 карточки) |

Если на GitHub в **истории** коммита `bc18abb` — там было **2** кастинга (старая версия). На `main` сейчас **7 / 4 открытых** — как в Canvas.

## Синхронизация (обязательно при правках)

1. [`programs.html`](programs.html) — **главный источник** для сайта
2. `cp programs.html index.html` — зеркало для Pages
3. Canvas — **вручную** подтянуть те же `id`, `closed`, дедлайны (файл вне репозитория)

> Canvas удобен для работы в Cursor, но **полина на GitHub = только `programs.html`**. Расхождение «2 на сайте / 4 в Canvas» почти всегда значит: старый кэш браузера, старый коммит в истории Git, или Canvas обновлён, а `programs.html` ещё нет (или наоборот).

## Инструкция по поиску и обновлению

### 1) Где запускать поиск
1. Поиск в чате Cursor (кнопка «Поиск новых» в Canvas) или вручную.
2. Результаты — в `research/{domain}/` (новый файл с датой или обновление сводного).
3. Перенос в `programs.html` + Canvas.

### 2) Как валидировать ссылку и карточку

**Equestrian:** horse-riding обязателен; возраст, дедлайн, поддержка.

**Acting:** theater/acting/drama; возраст 16+; в первой строке `desc` — «Доступно: виза США ✓ / Шенген безвиз ✓ / UK виза нужна».

Если данные не подтверждаются за 2–3 минуты → `needs_manual_check`.

### 3) Статусы и правила маркировки
- `new` — новая программа → блок «Новые поступления»
- `updated` — изменились условия
- `closed` — набор закрыт
- `needs_manual_check` — ручная проверка

### 4) Правила дедупликации
Дубликат если совпадает URL, нормализованное название или явный синоним.

### 5) Как обновлять HTML и Canvas
1. `EQUESTRIAN`: `BASE_PROGRAMS` + `LATEST_FEED` (domain: `equestrian`)
2. `ACTING`: `ACTING_BASE_PROGRAMS` + `ACTING_LATEST_FEED` (domain: `acting`)
3. Синхронный Canvas с domain switcher
4. Фильтры, urgent, merge/dedupe, чеклист документов по домену

### 6) Проверка перед коммитом
1. Переключатель «Конные» / «Актёрское» работает в HTML и Canvas
2. Переключатель «Открытые» / «Закрытые · архив» и фильтры тип / страна / возраст в обоих доменах
3. Чеклист документов разный для коней и театра
4. 5–10 случайных ссылок открываются

### 7) Деплой и git push
1. `git status`, `git diff`
2. Commit + `git push` → [polina-horses-2026](https://github.com/kundul02/polina-horses-2026)
3. Проверить [kundul02.github.io/polina-horses-2026](https://kundul02.github.io/polina-horses-2026/)

## Мониторинг — конные программы

### Федерации и youth
- [FEI](https://www.fei.org), [USEF](https://www.usef.org), [BHS](https://www.bhs.org.uk), [Pony Club](https://www.ponyclub.org)

### Лагеря и стажировки
- [Yard and Groom](https://www.yardandgroom.com), [Camp Friendship](https://campfriendship.com/staff/)

### Обмен
- [European Solidarity Corps](https://youth.europa.eu/solidarity_en)

### Кастинги (кино / TV / реклама с ездой)

Полный список платформ и агентств — в [`castings-registry.json`](research/equestrian/castings/castings-registry.json).

**Платформы (проверять по расписанию из README выше):**
- [Backstage](https://www.backstage.com/casting/?keyword=horse) · [Mandy](https://www.mandy.com/) · [StarNow](https://www.starnow.com/uk/casting/)
- [Project Casting](https://projectcasting.com/jobs?skills=Horseback+Riding) · [Casting Networks](https://www.castingnetworks.com/)
- [KidsCasting teens](https://kidscasting.com/castingcalls/for-teens) · [Allcasting](https://allcasting.com/castingcalls)
- [MMA Feed España](https://wall.mymotheragency.com/) (испаноязычные)

**SPACT / агентства (регистрация без публичного дедлайна):**
- [Take 3 Agency](https://www.take3agency.com/) · [Casting Collective SPACT](https://www.castingcollective.co.uk/production/spact)
- [Extra People](https://www.extrapeople.co.uk/) · [CS Equine Models](https://www.cs-equine-models.co.uk/)
- [Film Horses Ireland](https://filmhorsesireland.com/)

## Мониторинг — актёрские программы

### USA (приоритет — виза США)
- [Interlochen Theater](https://www.interlochen.org/summer-camp/theater-arts)
- [Stagedoor Manor](https://stagedoormanor.com/)
- [AMDA](https://www.amda.edu/), [NYU Tisch HS](https://tisch.nyu.edu/special-programs/high-school-programs)
- [Carnegie Mellon Pre-College Drama](https://www.cmu.edu/pre-college/academic-programs/drama.html)

### UK
- [National Youth Theatre](https://www.nyt.org.uk/auditions)
- [RADA Short Courses](https://www.rada.ac.uk/short-courses/)
- [LAMDA](https://www.lamda.ac.uk/short-courses), [Guildhall](https://www.gsmd.ac.uk/shortcourses)

### Schengen (UA паспорт)
- [Cours Florent](https://www.coursflorent.fr/)
- [ESC Youth Portal](https://youth.europa.eu/solidarity_en) — Creativity and culture

### Аудиции и кастинги (театр)
- [Backstage](https://www.backstage.com), [Playbill](https://playbill.com), [StageMilk](https://www.stagemilk.com)
- [ASSITEJ](https://www.assitej.org/) — international youth theater

## Публикация

- Публичная страница: [kundul02.github.io/polina-horses-2026](https://kundul02.github.io/polina-horses-2026/)
- Репозиторий: [github.com/kundul02/polina-horses-2026](https://github.com/kundul02/polina-horses-2026)
