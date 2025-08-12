/**
 * Outlook Email Template Optimization Script
 * This script fixes common Outlook compatibility issues in email templates
 */

const fs = require('fs');
const path = require('path');

function optimizeForOutlook() {
    const filePath = path.join(__dirname, 'email-templates.js');
    let content = fs.readFileSync(filePath, 'utf8');
    
    console.log('Starting Outlook optimization...');
    
    // Fix 1: Replace linear gradients with Outlook VML gradients and fallback
    content = content.replace(
        /style="([^"]*?)background:\s*linear-gradient\(135deg,\s*#1F1633\s*0%,\s*#3F105E\s*100%\);([^"]*?)"/g,
        'style="$1background: #1F1633;$2"'
    );
    
    // Add VML gradient support for headers
    content = content.replace(
        /<td style="padding: 40px 30px; background: linear-gradient\(135deg, #1F1633 0%, #3F105E 100%\); text-align: center;">/g,
        `<td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <!--[if gte mso 9]>
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:200px;">
                        <v:fill type="gradient" color="#1F1633" color2="#3F105E" angle="135" />
                        <v:textbox inset="0,0,0,0">
                        <![endif]-->
                        <div style="background: linear-gradient(135deg, #1F1633 0%, #3F105E 100%);">`
    );
    
    // Close VML gradient tags
    content = content.replace(
        /<\/td>\s*<\/tr>\s*<tr>\s*<td style="padding: 30px; background: white;">/g,
        `</div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">`
    );
    
    // Fix 2: Replace flexbox with table layouts for bullet points
    content = content.replace(
        /<div style="display: flex; align-items: flex-start; margin-bottom: (\d+)px;">\s*<div style="width: (\d+)px; height: (\d+)px; background: (#[A-F0-9]{6}); border-radius: 50%; margin-top: (\d+)px; margin-right: (\d+)px; flex-shrink: 0;"><\/div>\s*<div>\s*<p style="([^"]*)">(.*?)<\/p>\s*<p style="([^"]*)">(.*?)<\/p>\s*<\/div>\s*<\/div>/gs,
        `<table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: $1px;">
                                <tr>
                                    <td style="width: 25px; vertical-align: top; padding-top: $5px;">
                                        <div style="width: $2px; height: $3px; background: $4; border-radius: 50%; margin: 0;"></div>
                                    </td>
                                    <td style="vertical-align: top;">
                                        <p style="$7">$8</p>
                                        <p style="$9">$10</p>
                                    </td>
                                </tr>
                            </table>`
    );
    
    // Fix 3: Ensure images have display: block for Outlook
    content = content.replace(
        /<img src="\{\{logoUrl\}\}" alt="([^"]*)" style="height: 60px; width: auto; margin-bottom: 20px;">/g,
        '<img src="{{logoUrl}}" alt="$1" style="height: 60px; width: auto; margin-bottom: 20px; display: block;">'
    );
    
    // Fix 4: Add MSO-specific button styling
    content = content.replace(
        /<!--\[if mso\]>\s*<v:roundrect([^>]*?)>\s*<v:textbox[^>]*?>\s*<center[^>]*?>(.*?)<\/center>\s*<\/v:textbox>\s*<\/v:roundrect>\s*<!\[endif\]-->/gs,
        `<!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">$2</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->`
    );
    
    // Fix 5: Remove border-radius from elements that don't need VML (for Outlook compatibility)
    content = content.replace(
        /border-radius: 50%;/g,
        'border-radius: 50%; mso-border-radius-alt: 0;'
    );
    
    content = content.replace(
        /border-radius: (\d+)px;/g,
        'border-radius: $1px; mso-border-radius-alt: 0;'
    );
    
    // Write the optimized content back
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('✅ Outlook optimization complete!');
    console.log('Fixed issues:');
    console.log('- Replaced flexbox layouts with table-based layouts');
    console.log('- Added VML gradient support for Outlook');
    console.log('- Fixed image display properties');
    console.log('- Enhanced MSO button compatibility');
    console.log('- Added border-radius fallbacks');
}

// Run the optimization
optimizeForOutlook();
