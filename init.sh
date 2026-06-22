#!/usr/bin/env bash
# Verificación del repo: instala deps si faltan, corre lint + build + tests.
# Debe terminar verde (exit 0) para que el reviewer pueda aprobar.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Cliente"
cd "$ROOT/client"
[ -d node_modules ] || npm install
npm run lint
npm run build
# Tests del cliente (no fallar si aún no hay script "test" definido)
npm run test --if-present

echo "==> Servidor"
cd "$ROOT/server"
[ -d node_modules ] || npm install
npm run test --if-present
# Chequeo de sintaxis de los módulos del server
for f in $(find src -name '*.js'); do node --check "$f"; done

echo "==> OK: lint + build + checks en verde"
