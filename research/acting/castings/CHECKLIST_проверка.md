# Чеклист: актёрские кастинги 16–18+

**Промпт для Cursor (раз в 3–7 дней):**

```
Проверь актуальность актёрских кастингов для 16–18+ лет.

База: research/acting/castings/castings-registry.json
Справка: research/acting/castings/MONITORING_DATABASE.md

1. Пройди platforms[] и searchQueries[] из JSON.
2. Для каждого кастинга в active[] — открой URL, проверь что набор открыт и дедлайн не истёк.
3. Ищи НОВЫЕ открытые кастинги: возраст 16–20 (или playing 15–18), актёрство lead/featured/ensemble.
4. Обнови castings-registry.json: active / watch / archive / checkLog.
5. **Автоархив:** `node scripts/archive-expired-castings.mjs` — закрывает карточки с истёкшим дедлайном (или `--dry-run` для просмотра).
6. Синхронизируй programs.html (категория «Кастинги в актёрском мастерстве»):
   - новые → карточка с summary + desc
   - истёкшие → closed: true, deadline «Закрыт (дата)» (скрипт делает это автоматически по дате)
7. В desc каждой карточки ОБЯЗАТЕЛЬНО: «Актёрство: lead | featured | ensemble | talent_search · Оплата: да/нет»
8. cp programs.html index.html
9. Краткий отчёт: что открыто, что закрылось, что добавлено.
```

## Формат карточки

| Поле | Правило |
|------|---------|
| `summary` | Роль + тип (film/TV/theater) одной фразой |
| `desc` | `Тип: … · Страна · Актёрство: … · Оплата: … · Контакт: …` |
| `age` / `minAge` | Для фильтра 16+/17+/18+ |
| `urgent` | true если дедлайн < 14 дней |
| `profileFit` | local hire, язык, niche (deaf, Irish, etc.) |

## Красные флаги

- Local hire only → указать в desc
- Agency registration fee → не публиковать (TR: Cast Istanbul / V Ajans — бесплатно ✓)
- «Teen» но 18+ playing younger → пометка в age
- Placeholder URL → не добавлять на сайт
