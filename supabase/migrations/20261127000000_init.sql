-- Sprint 0 : fondations. Le schéma métier arrive au sprint 1 (0001_schema à 0005_audit).
-- Schéma private : fonctions internes, jamais exposé par PostgREST (architecture §5.2).
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

-- Recherche et normalisation insensibles aux accents (RG-CAT-05, pseudos).
create extension if not exists unaccent with schema extensions;
