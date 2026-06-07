# Конные программы: как ищем и обновляем

Проект собирает и публикует возможности для подростков с опытом верховой езды:
- с жильем, обучением, оплатой, покрытием дороги или полностью бесплатным участием;
- по приоритетным регионам: Schengen, Ирландия, UK, USA, Канада, Австралия, New Zealand, Грузия, ЮАР, Аргентина.

## Инструкция по поиску и обновлению

### 1) Где запускать поиск
1. Поиск запускается в чате Cursor (кнопка/команда "Поиск новых" в Canvas) или вручную тем же запросом.
2. Результаты сохраняются как рабочий список в `research/` (если файла нет - создать новый файл с датой).
3. Обновления вносятся сразу в два источника витрины:
   - `programs.html`
   - `/Users/artemsirchenko/.cursor/projects/Users-artemsirchenko/canvases/equestrian-programs.canvas.tsx`

### 2) Как валидировать ссылку и карточку
Для каждого найденного пункта:
1. Открыть исходную ссылку и проверить, что страница живая (не 404/редирект на нерелевантный контент).
2. Подтвердить, что horse-riding действительно требуется (или программа прямо связана с конной индустрией).
3. Проверить возраст, дедлайн, формат поддержки (жилье/дорога/обучение/оплата).
4. Если ключевые данные не подтверждаются за 2-3 минуты, ставить `needs_manual_check`.

### 3) Статусы и правила маркировки
- `new` - новая программа, которой еще не было в базе.
- `updated` - программа уже была, но изменились дедлайн, условия, ссылка, возраст или покрытие.
- `closed` - набор закрыт или дедлайн явно прошел.
- `needs_manual_check` - источник сомнительный/неполный, нужна ручная проверка.

Практика:
- в feed хранить `status`;
- в карточке добавлять пояснение в `check`/`needsCheck`, если статус `needs_manual_check`;
- для закрытых ставить `closed: true` и обновлять `deadline` на понятный текст.

### 4) Правила дедупликации
Считать дубликатом, если совпадает хотя бы одно:
1. Полный URL;
2. Нормализованное название (регистр/диакритика/пунктуация не важны);
3. Явный синоним одной и той же программы (например, один и тот же провайдер + тот же трек + та же страна).

Если найден дубликат:
- не добавлять новую карточку;
- обновить существующую как `updated`;
- сохранить один канонический URL.

### 5) Как обновлять HTML и Canvas
1. Обновить данные в `programs.html` (база + feed, если нужно).
2. Внести синхронные изменения в Canvas-файл:
   - `/Users/artemsirchenko/.cursor/projects/Users-artemsirchenko/canvases/equestrian-programs.canvas.tsx`
3. Сохранить текущую бизнес-логику:
   - фильтры по типу/стране/возрасту;
   - urgent-логика;
   - merge/dedupe;
   - пакет документов для выбранной программы.
4. Проверить, что sidecar-статус Canvas показывает:
   - `/Users/artemsirchenko/.cursor/projects/Users-artemsirchenko/canvases/equestrian-programs.canvas.status.json` = `{"status":"rendered"}`.

### 6) Проверка перед коммитом
Минимальный чек:
1. Фильтр `Срочно` показывает только релевантные срочные карточки.
2. Фильтр `Архив` показывает только `closed`.
3. Фильтры по стране и возрасту не ломают счетчики.
4. Кнопка выбора программы и блок "Пакет документов" работают.
5. 5-10 случайных ссылок открываются корректно.

### 7) Деплой и git push
1. Проверить изменения: `git status`, `git diff`.
2. Закоммитить с понятным сообщением.
3. Отправить ветку: `git push`.
4. Если используется отдельный deploy-репозиторий:
   - синхронизировать `programs.html` -> `/tmp/polina-deploy/index.html`;
   - зайти в deploy-репозиторий, сделать commit и `git push`.

## Потенциальные сайты для периодического мониторинга

Ниже базовый пул, который нужно мониторить регулярно (раз в 1-2 недели, для срочных сезонов - чаще).

### 1) Официальные федерации и youth-программы
- **Глобально:** [FEI](https://www.fei.org)
- **USA:** [USEF](https://www.usef.org), [USEA Young Riders](https://useventing.com/membership/young-riders), [USHJA Grants](https://www.ushja.org/donors-grants/grants-scholarships)
- **UK:** [British Equestrian](https://www.britishequestrians.org), [British Horse Society](https://www.bhs.org.uk), [British Racing School](https://brs.org.uk)
- **Ireland:** [Horse Sport Ireland](https://www.horsesportireland.ie), [The Irish National Stud](https://irishnationalstud.ie)
- **Australia/NZ:** [Equestrian Australia](https://www.equestrian.org.au), [Pony Club Australia](https://ponyclub.org.au), [New Zealand Pony Clubs](https://www.nzponyclub.org)
- **Канада:** [Equestrian Canada](https://equestrian.ca), [Pony Club Canada](https://www.canadianponyclub.org)
- **ЮАР:** [SAEF](https://www.saef.org.za)

### 2) Pony clubs и молодежные обмены
- [Pony Club International Alliance](https://www.ponyclub.org/activities/international-exchanges)
- [US Pony Club](https://www.ponyclub.org)
- Национальные Pony Club порталы (UK/AUS/NZ/Canada) по разделам `international`, `exchange`, `youth`.

### 3) Лагеря, стажировки и working student
- [Yard and Groom](https://www.yardandgroom.com)
- [HorseScotland jobs/resources](https://www.horsescotland.org)
- [Camp Friendship](https://campfriendship.com/staff/)
- [Camp Olson YMCA](https://campolson.org/positions/)
- [Riesenbeck International](https://riesenbeck-international.com/en/lwea/summer-camp/)

### 4) Волонтерство и обменные платформы
- [European Solidarity Corps](https://youth.europa.eu/solidarity_en)
- [Erasmus+ Youth Opportunities](https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals)
- [Workaway](https://www.workaway.info)
- [Worldpackers](https://www.worldpackers.com)
- [HelpStay](https://helpstay.com)

### 5) Стипендии и гранты
- [Godolphin Flying Start](https://www.godolphinflyingstart.com)
- [The Jockey Club Scholarships](https://www.jockeyclub.com)
- [Gerry Dilger Equine Scholarship](https://www.gerrydilgerequine.com/applications/kemi-irish-national-stud-scholarship)
- [American Horse Council](https://horsecouncil.org)

### 6) Working Holiday и официальные иммиграционные страницы
- **Австралия:** [Working Holiday Visa (417)](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/working-holiday-visa), [Work and Holiday (462)](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-and-holiday-462)
- **Новая Зеландия:** [NZ Working Holiday Visas](https://www.immigration.govt.nz/new-zealand-visas/options/work)
- **Ирландия:** [Irish Immigration](https://www.irishimmigration.ie)
- **Канада:** [IRCC](https://www.canada.ca/en/immigration-refugees-citizenship.html)
- **UK:** [UK Visas and Immigration](https://www.gov.uk/browse/visas-immigration)

### 7) Кастинги и медиапроекты с horse-riding
- [Backstage](https://www.backstage.com)
- [Project Casting](https://projectcasting.com)
- [Casting Networks](https://www.castingnetworks.com)
- [KidsCasting](https://kidscasting.com)

## Публикация

- Публичная страница: [kundul02.github.io/polina-horses-2026](https://kundul02.github.io/polina-horses-2026/)
- Репозиторий: [github.com/kundul02/polina-horses-2026](https://github.com/kundul02/polina-horses-2026)
