# CHECKPOINTS

Checklist objetiva que el `reviewer` recorre antes de aprobar. Marca `[x]`
si se cumple, `[ ]` si no (con la razón).

- C1: `./init.sh` termina verde (lint + build + tests).
- C2: Regla de dependencias respetada (`presentation → application → domain`;
  `domain` no importa de ninguna otra capa).
- C3: Atomic Design respetado (cada nivel solo compone niveles inferiores).
- C4: Sin lógica duplicada; se reutilizan casos de uso/hooks/utils existentes (DRY).
- C5: La API key de Linear NO aparece en `client/` ni en archivos versionados.
- C6: Los componentes no hacen `fetch` directo; el acceso a datos pasa por hooks.
- C7: La feature cumple todos los criterios de `acceptance` de `feature_list.json`.
- C8: Cada cambio de código tiene su test correspondiente.
