# Чеклист: периодическая проверка кастингов

Скопируй этот промпт в Cursor (раз в 3–7 дней):

---

**Промпт:**

```
Проверь актуальность кастингов с верховой ездой для 16–20 лет.

База: research/equestrian/castings/castings-registry.json
Справка: research/equestrian/castings/MONITORING_DATABASE.md

1. Пройди все platforms[] и searchQueries[] из JSON.
2. Для каждого кастинга в active[] — открой URL, проверь что набор открыт и дедлайн не истёк.
3. Ищи НОВЫЕ открытые кастинги: возраст 16–20 (или playing 18–25), езда required или preferred.
4. Обнови castings-registry.json: active / watch / archive / checkLog.
5. **Автоархив:** `node scripts/archive-expired-castings.mjs` — закрывает карточки с истёкшим дедлайном (или `--dry-run` для просмотра).
6. Синхронизируй programs.html (категория Кастинги):
   - новые → добавить карточку с summary + desc
   - истёкшие → closed: true, deadline «Закрыт (дата)» (скрипт делает это автоматически по дате)
7. В desc каждой карточки ОБЯЗАТЕЛЬНО: «Верховая езда: обязательна | желательна | не требуется»
8. cp programs.html index.html + canvas equestrian-programs.canvas.tsx
9. Краткий отчёт: что открыто, что закрылось, что добавлено.
```

---

## Быстрая проверка одной карточки

- [ ] URL открывается, нет «expired» / «not accepting»
- [ ] Возраст подходит (16–20 или playing age с пометкой)
- [ ] Езда: `required` / `preferred` / `not_required` — записано в JSON и в `desc`
- [ ] Дедлайн подтверждён на сайте источника
- [ ] Оплата и контакт указаны
- [ ] Сортировка на сайте: по срочности дедлайна

## Поля карточки на сайте (programs.html)

| Поле | Назначение |
|------|------------|
| `summary` | О чём проект + езда одной фразой |
| `desc` | Тип · страна · **Верховая езда** · оплата · контакт |
| `age` / `minAge` | Для фильтра 16+/17+/18+ |
| `deadline` | Дедлайн или «Rolling» или «Закрыт» |
| `riding` | *(опционально в будущем)* — пока только в desc |

## Красные флаги

- Дедлайн на Project Casting ≠ дедлайн в карточке → сверять **Expiration date**
- «Horse» в названии, но езда не в требованиях → `not_required`
- Local hire only → указать в `desc` / `check`
- Возраст 25+ → в archive, не в active (кроме watch для шаблонов)
