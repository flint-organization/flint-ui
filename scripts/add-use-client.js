#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');

function addUseClientDirective(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has "use client"
  if (content.startsWith('"use client"') || content.startsWith("'use client'")) {
    return;
  }

  // Add "use client" at the beginning
  const newContent = `"use client";\n${content}`;
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`Added "use client" to: ${path.relative(distDir, filePath)}`);
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.mjs'))) {
      // Skip tailwind-preset as it doesn't need "use client"
      if (!entry.name.includes('tailwind-preset')) {
        addUseClientDirective(fullPath);
      }
    }
  }
}

console.log('Adding "use client" directives to built files...');
processDirectory(distDir);
console.log('Done!');
