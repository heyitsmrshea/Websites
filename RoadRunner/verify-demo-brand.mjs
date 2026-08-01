#!/usr/bin/env node
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const demo = path.join(root, 'demo')
const routes = ['executive', 'compliance', 'workbench', 'sources', 'onprem', 'vciso', 'appendix', 'trust']
const expectedMarks = new Map([
  ['rrsecure-mark.svg', '5067f9383248808c4d42fa5af5a55d18d002ac54f616bb36049c9086fe47ed27'],
  ['rrsecure-mark-white.svg', 'cf9d83f16f65592c0295c91eecd598fe756b0b4485fb7808a9a2c04fa1a747e5'],
])
const failures = []

const indexPath = path.join(demo, 'index.html')
if (!fs.existsSync(indexPath)) failures.push('demo/index.html is missing')
else {
  const index = fs.readFileSync(indexPath, 'utf8')
  if (!index.includes('<title>RoadRunner Secure — Synthetic Security Assessment</title>')) failures.push('RoadRunner demo title is missing')
  if (!index.includes('rrsecure-mark.svg?v=rr-bird-20260801-2')) failures.push('versioned RoadRunner favicon is missing')
  if (/polarisconsulting\.net\/icon\.svg/i.test(index)) failures.push('Polaris favicon leaked into the RoadRunner entry point')
}

for (const route of routes) {
  if (!fs.existsSync(path.join(demo, route, 'index.html'))) failures.push(`deep link is missing: /demo/${route}/`)
}

for (const [file, expected] of expectedMarks) {
  const asset = path.join(demo, file)
  if (!fs.existsSync(asset)) { failures.push(`RoadRunner mark is missing: ${file}`); continue }
  const actual = crypto.createHash('sha256').update(fs.readFileSync(asset)).digest('hex')
  if (actual !== expected) failures.push(`RoadRunner mark digest changed: ${file}`)
}

if (failures.length) {
  console.error(`RoadRunner demo verification failed:\n- ${failures.join('\n- ')}`)
  process.exit(1)
}

console.log('RoadRunner demo verification passed: versioned bird, eight deep links, no Polaris entry-point asset')
