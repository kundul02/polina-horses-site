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
  acting/         # актёрские программы (сводный + обновления)
```

## Тройная синхронизация (обязательно)

При любом обновлении менять **одновременно**:

1. [`programs.html`](programs.html) — источник правды
2. [`index.html`](index.html) — зеркало для GitHub Pages (`cp programs.html index.html`)
3. [`equestrian-programs.canvas.tsx`](/Users/artemsirchenko/.cursor/projects/Users-artemsirchenko/canvases/equestrian-programs.canvas.tsx) — Canvas в Cursor

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
2. Фильтры «Срочно» / «Архив» / страна / возраст в обоих доменах
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

### Кастинги (конные съёмки)
- [Backstage](https://www.backstage.com), [Project Casting](https://projectcasting.com)

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
