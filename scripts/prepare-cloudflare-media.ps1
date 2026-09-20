param(
  [string]$SourceRoot = (Join-Path $PSScriptRoot '..\..\Testes'),
  [string]$OutputRoot = (Join-Path $PSScriptRoot '..\cloudflare-upload\icao-tests')
)

$source = [System.IO.Path]::GetFullPath($SourceRoot)
$output = [System.IO.Path]::GetFullPath($OutputRoot)

if (-not (Test-Path -LiteralPath $source -PathType Container)) {
  throw "Pasta de origem nao encontrada: $source"
}

if (Test-Path -LiteralPath $output) {
  throw "A pasta de destino ja existe. Remova ou renomeie antes de executar novamente: $output"
}

$imageMap = @{
  1 = @{ 4 = 'winglet.jpg'; 5 = 'heart atack.jpg' }
  2 = @{ 4 = 'runway incursion.jpg'; 5 = 'low-fuel.jpg' }
  3 = @{ 4 = 'tail colision.jpg'; 5 = 'smoke in the cabin.jpg' }
  4 = @{ 4 = 'bird strike.jpg'; 5 = 'UFO.jpg' }
  5 = @{ 4 = 'hail strike.jpg'; 5 = 'bomb.png' }
}

$targetImageNames = @{
  'heart atack.jpg' = 'heart-attack.jpg'
  'runway incursion.jpg' = 'runway-incursion.jpg'
  'tail colision.jpg' = 'tail-collision.jpg'
  'smoke in the cabin.jpg' = 'smoke-in-cabin.jpg'
  'bird strike.jpg' = 'bird-strike.jpg'
  'hail strike.jpg' = 'hail-strike.jpg'
  'winglet.jpg' = 'winglet.jpg'
  'low-fuel.jpg' = 'low-fuel.jpg'
  'UFO.jpg' = 'ufo.jpg'
  'bomb.png' = 'bomb.png'
}

for ($test = 1; $test -le 5; $test++) {
  $testFolder = Get-ChildItem -LiteralPath $source -Directory |
    Where-Object { $_.Name -like "Test $test-*" } |
    Select-Object -First 1

  if (-not $testFolder) { throw "Pasta do Test $test nao encontrada em $source" }

  $materialFolder = Get-ChildItem -LiteralPath $testFolder.FullName -Directory | Select-Object -First 1
  if (-not $materialFolder) { throw "Conteudo do Test $test nao encontrado" }

  for ($situation = 1; $situation -le 5; $situation++) {
    $target = Join-Path $output ("test-{0:D2}\part-02\situation-{1:D2}" -f $test, $situation)
    New-Item -ItemType Directory -Path $target -Force | Out-Null

    $initial = Get-ChildItem -LiteralPath $materialFolder.FullName -Filter "*Part 2 $situation.1.wav" -File
    $followUp = Get-ChildItem -LiteralPath $materialFolder.FullName -Filter "*Part 2 $situation.2.wav" -File
    if (-not $initial -or -not $followUp) { throw "Audios da situacao $situation do Test $test nao encontrados" }

    Copy-Item -LiteralPath $initial.FullName -Destination (Join-Path $target 'initial.wav')
    Copy-Item -LiteralPath $followUp.FullName -Destination (Join-Path $target 'follow-up.wav')

    if ($imageMap[$test].ContainsKey($situation)) {
      $sourceName = $imageMap[$test][$situation]
      $sourceImage = Join-Path $materialFolder.FullName $sourceName
      Copy-Item -LiteralPath $sourceImage -Destination (Join-Path $target $targetImageNames[$sourceName])
    }
  }

  for ($situation = 1; $situation -le 3; $situation++) {
    $target = Join-Path $output ("test-{0:D2}\part-03\situation-{1:D2}" -f $test, $situation)
    New-Item -ItemType Directory -Path $target -Force | Out-Null
    $dialogue = Get-ChildItem -LiteralPath $materialFolder.FullName -Filter "*Part 3 $situation.wav" -File
    if (-not $dialogue) { throw "Audio da Parte 3, situacao $situation do Test $test nao encontrado" }
    Copy-Item -LiteralPath $dialogue.FullName -Destination (Join-Path $target 'dialogue.wav')
  }
}

$files = Get-ChildItem -LiteralPath $output -Recurse -File
$totalMb = [math]::Round((($files | Measure-Object Length -Sum).Sum / 1MB), 2)
Write-Output "Pacote pronto: $output"
Write-Output ("{0} arquivos, {1} MB" -f $files.Count, $totalMb)
