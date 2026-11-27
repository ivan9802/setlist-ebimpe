-- Test de fumée du socle : le schéma privé existe et reste fermé au public.
begin;
create extension if not exists pgtap with schema extensions;
select plan(4);

select has_schema('private', 'le schéma private existe');
select has_extension('extensions', 'unaccent', 'unaccent est installé dans extensions');
select ok(
  not has_schema_privilege('anon', 'private', 'usage'),
  'anon n''a pas accès au schéma private'
);
select ok(
  not has_schema_privilege('authenticated', 'private', 'usage'),
  'authenticated n''a pas accès au schéma private'
);

select * from finish();
rollback;
