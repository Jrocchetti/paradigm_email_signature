# Brand Central Cleanup Script (PowerShell)
# This script safely removes unnecessary files while preserving core functionality

Write-Host "🧹 Starting Brand Central Project Cleanup..." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# Create a backup first
Write-Host "📦 Creating backup..." -ForegroundColor Yellow
git add -A
git commit -m "Pre-cleanup backup - all files before cleanup"

Write-Host "🗑️  Phase 1: Removing Firebase backup files..." -ForegroundColor Cyan
Get-ChildItem "*-firebase-backup.html" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "auth-firebase-backup.js" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "firebase-*.html" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "firebase-*.js" -ErrorAction SilentlyContinue | Remove-Item -Force

Write-Host "🗑️  Phase 2: Removing Supabase migration files..." -ForegroundColor Cyan
Get-ChildItem "*-supabase.html" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "auth-supabase.js" -ErrorAction SilentlyContinue | Remove-Item -Force

Write-Host "🗑️  Phase 3: Removing test and debug files..." -ForegroundColor Cyan
Get-ChildItem "test-*.html" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "*-debug.html" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "cleanup-*.js" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "create-test-data.js" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "verify-deployment.js" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "test-syntax.js" -ErrorAction SilentlyContinue | Remove-Item -Force

Write-Host "🗑️  Phase 4: Removing applied SQL files..." -ForegroundColor Cyan
Get-ChildItem "fix-*.sql" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "supabase-*.sql" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "simple-security-fix.sql" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "final-security-fix.sql" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "force-fix-security-definer.sql" -ErrorAction SilentlyContinue | Remove-Item -Force
# Keep email-signatures-setup.sql

Write-Host "🗑️  Phase 5: Removing redundant HTML files..." -ForegroundColor Cyan
$redundantFiles = @(
    "signature_generator.html",
    "brand-assets.html", 
    "assets-manager.html",
    "login.html",
    "register.html",
    "signup.html",
    "templates.html"
)

foreach ($file in $redundantFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  Removed: $file" -ForegroundColor DarkGray
    }
}

Write-Host "📁 Phase 6: Organizing documentation..." -ForegroundColor Cyan
if (-not (Test-Path "docs")) {
    New-Item -ItemType Directory -Name "docs" -Force | Out-Null
}

# Move markdown files to docs folder, except README.md
Get-ChildItem "*.md" | Where-Object { $_.Name -ne "README.md" } | Move-Item -Destination "docs" -Force

Write-Host "✅ Cleanup completed!" -ForegroundColor Green
Write-Host "📊 Project structure optimized" -ForegroundColor Green
Write-Host "🚀 Ready for deployment" -ForegroundColor Green

Write-Host ""
Write-Host "Remaining core files:" -ForegroundColor Yellow
Get-ChildItem "*.html", "*.js", "*.toml", "*.sql", "*.md" -ErrorAction SilentlyContinue | Format-Table Name, Length, LastWriteTime -AutoSize

Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Magenta
Write-Host "1. Review the changes" -ForegroundColor White
Write-Host "2. Test the website locally" -ForegroundColor White
Write-Host "3. Commit the cleanup: git add -A && git commit -m `"Project cleanup - removed unnecessary files`"" -ForegroundColor White
Write-Host "4. Deploy: git push origin main" -ForegroundColor White
