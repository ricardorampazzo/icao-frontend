# Midias dos simulados no Cloudflare R2

## O que deve ser enviado

Envie somente os 75 arquivos usados pelo aluno:

- 65 audios `.wav`;
- 10 imagens `.jpg` ou `.png`.

Execute no PowerShell, na raiz do frontend:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\prepare-cloudflare-media.ps1
```

O comando cria `cloudflare-upload/icao-tests` com os nomes e diretorios esperados pela aplicacao. Envie a pasta `icao-tests` para a raiz do bucket, preservando sua estrutura.

Padrao criado para a Parte 2:

```text
icao-tests/test-01/part-02/situation-01/initial.wav
icao-tests/test-01/part-02/situation-01/follow-up.wav
```

Padrao criado para a Parte 3:

```text
icao-tests/test-01/part-03/situation-01/dialogue.wav
```

As imagens ficam dentro da situacao correspondente da Parte 2.

## O que nao deve ser enviado

- Os cinco arquivos `.docx`: sao fontes editoriais e suas instrucoes ja foram estruturadas no sistema.
- `ICAO_OLD.rar` e `ICAO_V2.rar`: sao backups do projeto.
- Pastas externas com nomes de exportacao, como `Test 1-20260920T225050Z-1-001`.
- Codigo-fonte, `node_modules`, `dist`, logs ou arquivos do backend.

## Configuracao da aplicacao

Depois de publicar o bucket com um dominio publico, informe a origem em:

```ts
mediaBaseUrl: 'https://media.seudominio.com'
```

O campo fica em `src/app/environments/environment.ts`. Nao inclua `/icao-tests` nem barra no final, pois as chaves dos arquivos ja incluem essa pasta.

No R2, use os tipos de conteudo `audio/wav`, `image/jpeg` e `image/png`. O dominio precisa permitir requisicoes `GET` e `HEAD` originadas pelo endereco da aplicacao na Vercel.
