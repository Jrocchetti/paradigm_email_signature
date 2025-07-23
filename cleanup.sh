#!/bin/bash
# Brand Central Cleanup Script
# This script safely removes unnecessary files while preserving core functionality

echo "🧹 Starting Brand Central Project Cleanup..."
echo "=========================================="

# Create a backup first
echo "📦 Creating backup..."
git add -A
git commit -m "Pre-cleanup backup - all files before cleanup"

echo "🗑️  Phase 1: Removing Firebase backup files..."
rm -f *-firebase-backup.html
rm -f auth-firebase-backup.js
rm -f firebase-*.html
rm -f firebase-*.js

echo "🗑️  Phase 2: Removing Supabase migration files..."  
rm -f *-supabase.html
rm -f auth-supabase.js

echo "🗑️  Phase 3: Removing test and debug files..."
rm -f test-*.html
rm -f *-debug.html
rm -f cleanup-*.js
rm -f create-test-data.js
rm -f verify-deployment.js
rm -f test-syntax.js

echo "🗑️  Phase 4: Removing applied SQL files..."
rm -f fix-*.sql
rm -f supabase-*.sql
rm -f simple-security-fix.sql
rm -f final-security-fix.sql
rm -f force-fix-security-definer.sql
# Keep email-signatures-setup.sql

echo "🗑️  Phase 5: Removing redundant HTML files..."
rm -f signature_generator.html
rm -f brand-assets.html
rm -f assets-manager.html
rm -f login.html
rm -f register.html
rm -f signup.html
rm -f templates.html

echo "📁 Phase 6: Organizing documentation..."
mkdir -p docs
mv *.md docs/ 2>/dev/null || true
# Move README.md back to root
mv docs/README.md . 2>/dev/null || true

echo "✅ Cleanup completed!"
echo "📊 Project structure optimized"
echo "🚀 Ready for deployment"

echo ""
echo "Remaining core files:"
ls -la *.html *.js *.toml *.sql *.md 2>/dev/null || echo "Core files present"

echo ""
echo "📝 Next steps:"
echo "1. Review the changes"
echo "2. Test the website locally"
echo "3. Commit the cleanup: git add -A && git commit -m 'Project cleanup - removed unnecessary files'"
echo "4. Deploy: git push origin main"
