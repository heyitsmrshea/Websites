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
const publishedPages = [
  'index.html',
  '404.html',
  'contact/index.html',
  'microsoft-security/index.html',
  'on-prem-attack-paths/index.html',
  'platform/index.html',
  'pricing/index.html',
  'security/index.html',
  'Contact.dc.html',
  'Demo.dc.html',
  'Home.dc.html',
  'Microsoft Security.dc.html',
  'OnPrem Attack Paths.dc.html',
  'Platform.dc.html',
  'Pricing.dc.html',
  'Security.dc.html',
]
const screenshotSources = ['attack.html', 'exec.html', 'portal.html', 'queue.html', 'report.html', 'vciso.html']
const forbiddenPolarisBranding = /polaris(?:consulting(?:\.net)?)?|polaris-logo|polaris-icon/i
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
  const routePath = path.join(demo, route, 'index.html')
  if (!fs.existsSync(routePath)) {
    failures.push(`deep link is missing: /demo/${route}/`)
    continue
  }
  if (forbiddenPolarisBranding.test(fs.readFileSync(routePath, 'utf8'))) failures.push(`Polaris branding leaked into /demo/${route}/`)
}

for (const relativePath of publishedPages) assertRoadRunnerSurface(relativePath)
for (const file of screenshotSources) assertRoadRunnerSurface(path.join('shots', file))

const home = path.join(root, 'index.html')
if (fs.existsSync(home)) {
  const html = fs.readFileSync(home, 'utf8')
  if (!html.includes('https://roadrunnersecure.com/demo/')) failures.push('RoadRunner homepage is missing its first-party demo URL')
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

console.log('RoadRunner brand verification passed: first-party marketing, screenshots, versioned bird, and eight assessment routes')

function assertRoadRunnerSurface(relativePath) {
  const file = path.join(root, relativePath)
  if (!fs.existsSync(file)) {
    failures.push(`RoadRunner surface is missing: ${relativePath}`)
    return
  }
  const contents = fs.readFileSync(file, 'utf8')
  if (forbiddenPolarisBranding.test(contents)) failures.push(`Polaris branding leaked into ${relativePath}`)
}
