---
title: "SQL Commands"
description: "Query, join, aggregate, and modify — the SQL you reach for daily."
category: "Languages & Data"
tags: [languages-data]
---
# SQL Commands

<p class="dl-pills">
<a class="dl-pill" href="../downloads/sql-commands.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/sql-commands.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/sql-commands.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

Standard SQL that works across PostgreSQL, MySQL, and SQLite unless noted. Keywords are shown uppercase by convention; SQL itself is case-insensitive for keywords.

## Querying

| Clause | What it does |
| --- | --- |
| `SELECT col1, col2` | pick columns (`*` for all) |
| `FROM table` | the source table |
| `WHERE cond` | filter rows before grouping |
| `ORDER BY col DESC` | sort results (default `ASC`) |
| `LIMIT 10 OFFSET 20` | paginate: 10 rows, skipping 20 |
| `SELECT DISTINCT col` | unique values only |
| `AS alias` | rename a column or table in the output |

**A typical read query**

```sql
SELECT name, email, created_at
FROM users
WHERE active = true
ORDER BY created_at DESC
LIMIT 25;
```

## Filtering

| Operator | Matches |
| --- | --- |
| `col = 5` | exact equality |
| `col <> 5` | not equal (also `!=`) |
| `col LIKE 'a%'` | starts with a (`%` = any, `_` = one char) |
| `col ILIKE 'a%'` | case-insensitive LIKE (Postgres) |
| `col IN (1, 2, 3)` | matches any value in the list |
| `col BETWEEN 1 AND 9` | inclusive range |
| `col IS NULL` | test for NULL (never use `= NULL`) |
| `a = 1 AND b = 2` | combine conditions (`OR`, `NOT` too) |

## Joins

| Join | Returns |
| --- | --- |
| `INNER JOIN` | only rows matching in both tables |
| `LEFT JOIN` | all left rows + matches (NULLs if none) |
| `RIGHT JOIN` | all right rows + matches |
| `FULL OUTER JOIN` | all rows from both sides |
| `CROSS JOIN` | every combination (Cartesian product) |

**Join with an aggregate**

```sql
SELECT u.name, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.name
ORDER BY orders DESC;
```

## Aggregation

| Function / clause | Purpose |
| --- | --- |
| `COUNT(*)` | number of rows |
| `SUM(col)` | total of a numeric column |
| `AVG(col)` | average |
| `MIN(col) / MAX(col)` | smallest / largest |
| `GROUP BY col` | collapse rows into groups |
| `HAVING COUNT(*) > 1` | filter groups (WHERE filters rows) |

> **WHERE vs HAVING:** `WHERE` filters individual rows *before* grouping; `HAVING` filters *after* grouping, so it can reference aggregates like `COUNT(*)`.

## Modifying Data

**Insert, update, delete**

```sql
INSERT INTO users (name, email)
VALUES ('Ada', 'ada@x.io');

UPDATE users SET active = false
WHERE last_seen < '2025-01-01';

DELETE FROM users WHERE id = 42;
```

**Upsert (Postgres / SQLite)**

```sql
INSERT INTO users (email, name)
VALUES ('ada@x.io', 'Ada')
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name;
```

> **Always pair UPDATE / DELETE with a WHERE.** Without one, you change *every* row. Run the matching `SELECT` first, and wrap risky changes in a `BEGIN; ... ROLLBACK;` transaction while you check.

## Tables & Indexes

**Create a table**

```sql
CREATE TABLE orders (
  id        SERIAL PRIMARY KEY,
  user_id   INTEGER REFERENCES users(id),
  total     NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

| Statement | Effect |
| --- | --- |
| `ALTER TABLE t ADD COLUMN c TEXT` | add a column |
| `ALTER TABLE t DROP COLUMN c` | remove a column |
| `CREATE INDEX ON t (col)` | speed up lookups on col |
| `DROP TABLE t` | delete a table and its data |
