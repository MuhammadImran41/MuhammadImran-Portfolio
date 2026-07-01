@echo off
echo ============================================
echo   Building Portfolio for Production
echo ============================================
echo.

call ng build --configuration production

echo.
echo ============================================
echo   Build Complete!
echo ============================================
echo.
echo Your production files are in:
echo dist\portfolio-angular\browser\
echo.
echo You can now deploy these files to:
echo - Vercel
echo - Netlify
echo - GitHub Pages
echo - Any static hosting service
echo.
pause
