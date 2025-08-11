/**
 * Brand Central Email Template Builder
 * A web-based email builder for PPG-branded HTML templates
 * Features: Template library, dynamic field editing, live preview, Outlook-safe output
 */

class EmailTemplateBuilder {
    constructor() {
        this.templates = [];
        this.currentTemplate = null;
        this.currentValues = {};
        this.previewElement = null;
        this.init();
    }

    /**
     * Initialize the template builder
     */
    init() {
        this.loadTemplates();
        this.setupEventListeners();
        this.renderTemplateLibrary();
    }

    /**
     * Load predefined templates (Phase 1: Hardcoded)
     */
    loadTemplates() {
        this.templates = [
            {
                id: "client-prospecting-v1",
                name: "Client Prospecting",
                description: "Cold outreach template introducing PPG to a prospect.",
                thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNsaWVudCBQcm9zcGVjdGluZzwvdGV4dD48L3N2Zz4=",
                lockedFields: {
                    logoUrl: "https://paradigmproductionsgroup.com/assets/logo.png",
                    brandHex: "#111827",
                    accentHex: "#F7921E",
                    companyName: "Paradigm Productions Group",
                    companyAddress: "123 Business Ave, Suite 100, City, State 12345",
                    companyPhone: "(555) 123-4567",
                    companyEmail: "hello@paradigmproductionsgroup.com"
                },
                dynamicFields: [
                    {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                    {key: "recipientCompany", label: "Recipient Company", type: "text", placeholder: "Acme Corp", required: true},
                    {key: "introLine", label: "Introduction", type: "textarea", placeholder: "We help companies deliver unforgettable events...", required: true},
                    {key: "valueProposition", label: "Value Proposition", type: "textarea", placeholder: "Our team blends technical precision with creative direction...", required: true},
                    {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Schedule a Call", required: true},
                    {key: "ctaUrl", label: "Call-to-Action URL", type: "url", placeholder: "https://calendly.com/ppg", required: true}
                ],
                htmlTemplate: this.getClientProspectingTemplate()
            },
            {
                id: "client-acquisition-v1",
                name: "Client Acquisition",
                description: "Follow-up template after initial introduction and proposal.",
                thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWZmNmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNsaWVudCBBY3F1aXNpdGlvbjwvdGV4dD48L3N2Zz4=",
                lockedFields: {
                    logoUrl: "https://paradigmproductionsgroup.com/assets/logo.png",
                    brandHex: "#111827",
                    accentHex: "#F7921E",
                    companyName: "Paradigm Productions Group",
                    companyAddress: "123 Business Ave, Suite 100, City, State 12345",
                    companyPhone: "(555) 123-4567",
                    companyEmail: "hello@paradigmproductionsgroup.com"
                },
                dynamicFields: [
                    {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                    {key: "recipientCompany", label: "Recipient Company", type: "text", placeholder: "Acme Corp", required: true},
                    {key: "proposalReference", label: "Proposal Reference", type: "text", placeholder: "PPG-2025-001", required: true},
                    {key: "projectDetails", label: "Project Details", type: "textarea", placeholder: "Annual company meeting with 200 attendees...", required: true},
                    {key: "nextSteps", label: "Next Steps", type: "textarea", placeholder: "Please review the attached proposal and let us know...", required: true},
                    {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Review Proposal", required: true},
                    {key: "ctaUrl", label: "Call-to-Action URL", type: "url", placeholder: "https://proposal.paradigmproductionsgroup.com", required: true}
                ],
                htmlTemplate: this.getClientAcquisitionTemplate()
            },
            {
                id: "client-onboarding-v1",
                name: "Client Onboarding",
                description: "Welcome template for new clients after project approval.",
                thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmZGY0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNsaWVudCBPbmJvYXJkaW5nPC90ZXh0Pjwvc3ZnPg==",
                lockedFields: {
                    logoUrl: "https://paradigmproductionsgroup.com/assets/logo.png",
                    brandHex: "#111827",
                    accentHex: "#F7921E",
                    companyName: "Paradigm Productions Group",
                    companyAddress: "123 Business Ave, Suite 100, City, State 12345",
                    companyPhone: "(555) 123-4567",
                    companyEmail: "hello@paradigmproductionsgroup.com"
                },
                dynamicFields: [
                    {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                    {key: "recipientCompany", label: "Recipient Company", type: "text", placeholder: "Acme Corp", required: true},
                    {key: "projectName", label: "Project Name", type: "text", placeholder: "Annual Company Meeting 2025", required: true},
                    {key: "projectManager", label: "Project Manager", type: "text", placeholder: "John Smith", required: true},
                    {key: "kickoffDate", label: "Kickoff Date", type: "text", placeholder: "September 15, 2025", required: true},
                    {key: "nextSteps", label: "Immediate Next Steps", type: "list", placeholder: "Discovery call scheduled|Contract signing|Initial planning meeting", required: true},
                    {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Access Client Portal", required: true},
                    {key: "ctaUrl", label: "Call-to-Action URL", type: "url", placeholder: "https://portal.paradigmproductionsgroup.com", required: true}
                ],
                htmlTemplate: this.getClientOnboardingTemplate()
            },
            {
                id: "post-event-followup-v1",
                name: "Post-Event Follow-Up",
                description: "Follow-up template for gathering feedback after event completion.",
                thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmM2MwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBvc3QtRXZlbnQgRm9sbG93LVVwPC90ZXh0Pjwvc3ZnPg==",
                lockedFields: {
                    logoUrl: "https://paradigmproductionsgroup.com/assets/logo.png",
                    brandHex: "#111827",
                    accentHex: "#F7921E",
                    companyName: "Paradigm Productions Group",
                    companyAddress: "123 Business Ave, Suite 100, City, State 12345",
                    companyPhone: "(555) 123-4567",
                    companyEmail: "hello@paradigmproductionsgroup.com"
                },
                dynamicFields: [
                    {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                    {key: "recipientCompany", label: "Recipient Company", type: "text", placeholder: "Acme Corp", required: true},
                    {key: "eventName", label: "Event Name", type: "text", placeholder: "Annual Company Meeting 2025", required: true},
                    {key: "eventDate", label: "Event Date", type: "text", placeholder: "September 15, 2025", required: true},
                    {key: "personalMessage", label: "Personal Message", type: "textarea", placeholder: "Thank you for trusting us with your important event...", required: true},
                    {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Share Your Feedback", required: true},
                    {key: "ctaUrl", label: "Call-to-Action URL", type: "url", placeholder: "https://feedback.paradigmproductionsgroup.com", required: true}
                ],
                htmlTemplate: this.getPostEventTemplate()
            },
            {
                id: "loss-thankyou-v1",
                name: "Loss Thank-You",
                description: "Gracious follow-up template when not selected for a project.",
                thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmMmY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvc3MgVGhhbmstWW91PC90ZXh0Pjwvc3ZnPg==",
                lockedFields: {
                    logoUrl: "https://paradigmproductionsgroup.com/assets/logo.png",
                    brandHex: "#111827",
                    accentHex: "#F7921E",
                    companyName: "Paradigm Productions Group",
                    companyAddress: "123 Business Ave, Suite 100, City, State 12345",
                    companyPhone: "(555) 123-4567",
                    companyEmail: "hello@paradigmproductionsgroup.com"
                },
                dynamicFields: [
                    {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                    {key: "recipientCompany", label: "Recipient Company", type: "text", placeholder: "Acme Corp", required: true},
                    {key: "projectReference", label: "Project Reference", type: "text", placeholder: "Annual Company Meeting 2025", required: true},
                    {key: "personalMessage", label: "Personal Message", type: "textarea", placeholder: "While we're disappointed we won't be working together this time...", required: true},
                    {key: "futureOffering", label: "Future Offering", type: "textarea", placeholder: "We'd love to stay connected for future opportunities...", required: true},
                    {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Stay Connected", required: true},
                    {key: "ctaUrl", label: "Call-to-Action URL", type: "url", placeholder: "https://paradigmproductionsgroup.com/newsletter", required: true}
                ],
                htmlTemplate: this.getLossThankYouTemplate()
            }
        ];
    }

    /**
     * Setup event listeners for UI interactions
     */
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.bindUIEvents();
        });
    }

    /**
     * Bind UI event handlers
     */
    bindUIEvents() {
        // Copy to clipboard button
        const copyBtn = document.getElementById('copyToClipboard');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyToClipboard());
        }

        // Download HTML button
        const downloadBtn = document.getElementById('downloadHtml');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadHtml());
        }

        // Show/Hide HTML button
        const showHtmlBtn = document.getElementById('showHtml');
        if (showHtmlBtn) {
            showHtmlBtn.addEventListener('click', () => this.toggleHtmlView());
        }

        // Save draft button
        const saveDraftBtn = document.getElementById('saveDraft');
        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', () => this.saveDraft());
        }

        // Load draft button
        const loadDraftBtn = document.getElementById('loadDraft');
        if (loadDraftBtn) {
            loadDraftBtn.addEventListener('click', () => this.loadDraft());
        }
    }

    /**
     * Render the template library grid
     */
    renderTemplateLibrary() {
        const container = document.getElementById('templateLibrary');
        if (!container) return;

        container.innerHTML = this.templates.map(template => `
            <div class="template-card" data-template-id="${template.id}">
                <div class="template-thumbnail">
                    <img src="${template.thumbnail}" alt="${template.name}" />
                </div>
                <div class="template-info">
                    <h3>${template.name}</h3>
                    <p>${template.description}</p>
                    <button class="select-template-btn" onclick="emailBuilder.selectTemplate('${template.id}')">
                        Select Template
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Select a template and render the editor
     */
    selectTemplate(templateId) {
        this.currentTemplate = this.templates.find(t => t.id === templateId);
        if (!this.currentTemplate) return;

        // Reset current values
        this.currentValues = {};
        
        // Initialize with default values
        this.currentTemplate.dynamicFields.forEach(field => {
            this.currentValues[field.key] = '';
        });

        this.renderFieldEditor();
        this.updatePreview();
        this.showEditor();
    }

    /**
     * Show the editor panel
     */
    showEditor() {
        const editorPanel = document.getElementById('editorPanel');
        const templateLibraryPanel = document.getElementById('templateLibraryPanel');
        
        if (editorPanel) editorPanel.style.display = 'block';
        if (templateLibraryPanel) templateLibraryPanel.style.display = 'none';
    }

    /**
     * Go back to template library
     */
    backToLibrary() {
        const editorPanel = document.getElementById('editorPanel');
        const templateLibraryPanel = document.getElementById('templateLibraryPanel');
        
        if (editorPanel) editorPanel.style.display = 'none';
        if (templateLibraryPanel) templateLibraryPanel.style.display = 'block';
        
        this.currentTemplate = null;
        this.currentValues = {};
    }

    /**
     * Render the dynamic field editor
     */
    renderFieldEditor() {
        const container = document.getElementById('fieldEditor');
        if (!container || !this.currentTemplate) return;

        const fieldsHtml = this.currentTemplate.dynamicFields.map(field => {
            const value = this.currentValues[field.key] || '';
            const required = field.required ? 'required' : '';
            
            let inputHtml = '';
            
            switch (field.type) {
                case 'textarea':
                    inputHtml = `<textarea 
                        id="field_${field.key}" 
                        placeholder="${field.placeholder}" 
                        ${required}
                        oninput="emailBuilder.updateField('${field.key}', this.value)"
                    >${value}</textarea>`;
                    break;
                case 'url':
                    inputHtml = `<input 
                        type="url" 
                        id="field_${field.key}" 
                        placeholder="${field.placeholder}" 
                        value="${value}"
                        ${required}
                        oninput="emailBuilder.updateField('${field.key}', this.value)"
                    />`;
                    break;
                case 'list':
                    inputHtml = `<textarea 
                        id="field_${field.key}" 
                        placeholder="${field.placeholder}" 
                        ${required}
                        oninput="emailBuilder.updateField('${field.key}', this.value)"
                        title="Enter each item on a new line or separated by |"
                    >${value}</textarea>
                    <small>Enter each item on a new line or separated by |</small>`;
                    break;
                default: // text
                    inputHtml = `<input 
                        type="text" 
                        id="field_${field.key}" 
                        placeholder="${field.placeholder}" 
                        value="${value}"
                        ${required}
                        oninput="emailBuilder.updateField('${field.key}', this.value)"
                    />`;
            }

            return `
                <div class="field-group">
                    <label for="field_${field.key}">
                        ${field.label}
                        ${field.required ? '<span class="required">*</span>' : ''}
                    </label>
                    ${inputHtml}
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="editor-header">
                <h3>${this.currentTemplate.name}</h3>
                <button onclick="emailBuilder.backToLibrary()" class="back-btn">← Back to Templates</button>
            </div>
            <form id="templateForm" onsubmit="return false;">
                ${fieldsHtml}
            </form>
        `;
    }

    /**
     * Update a field value and refresh preview
     */
    updateField(key, value) {
        this.currentValues[key] = value;
        this.updatePreview();
    }

    /**
     * Update the live preview
     */
    updatePreview() {
        if (!this.currentTemplate) return;

        const preview = document.getElementById('emailPreview');
        if (!preview) return;

        const html = this.generateHtml();
        preview.srcdoc = html;
    }

    /**
     * Generate the final HTML from template and values
     */
    generateHtml() {
        if (!this.currentTemplate) return '';

        let html = this.currentTemplate.htmlTemplate;
        
        // Replace locked fields
        Object.entries(this.currentTemplate.lockedFields).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, value);
        });

        // Replace dynamic fields
        Object.entries(this.currentValues).forEach(([key, value]) => {
            const field = this.currentTemplate.dynamicFields.find(f => f.key === key);
            let processedValue = value;

            // Process list fields
            if (field && field.type === 'list' && value) {
                const items = value.split(/[|\n]/).filter(item => item.trim());
                processedValue = items.map(item => `<li>${item.trim()}</li>`).join('');
            }

            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, processedValue);
        });

        // Clean up any remaining placeholders
        html = html.replace(/{{[^}]+}}/g, '');

        return html;
    }

    /**
     * Copy generated HTML to clipboard
     */
    async copyToClipboard() {
        const html = this.generateHtml();
        const plainText = this.htmlToPlainText(html);

        try {
            // Try to write both HTML and plain text to clipboard
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([html], { type: 'text/html' }),
                    'text/plain': new Blob([plainText], { type: 'text/plain' })
                })
            ]);
            
            this.showMessage('✅ Email copied to clipboard! You can now paste it into Outlook.', 'success');
        } catch (err) {
            // Fallback to plain text only
            try {
                await navigator.clipboard.writeText(html);
                this.showMessage('✅ HTML copied to clipboard!', 'success');
            } catch (fallbackErr) {
                this.showMessage('❌ Failed to copy to clipboard. Please try again.', 'error');
                console.error('Clipboard error:', fallbackErr);
            }
        }
    }

    /**
     * Download generated HTML as file
     */
    downloadHtml() {
        const html = this.generateHtml();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentTemplate.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showMessage('✅ HTML file downloaded!', 'success');
    }

    /**
     * Toggle HTML source view
     */
    toggleHtmlView() {
        const htmlPanel = document.getElementById('htmlSource');
        const showBtn = document.getElementById('showHtml');
        
        if (htmlPanel.style.display === 'none' || !htmlPanel.style.display) {
            htmlPanel.style.display = 'block';
            htmlPanel.querySelector('pre').textContent = this.generateHtml();
            showBtn.textContent = 'Hide HTML';
        } else {
            htmlPanel.style.display = 'none';
            showBtn.textContent = 'Show HTML';
        }
    }

    /**
     * Save current draft to localStorage
     */
    saveDraft() {
        if (!this.currentTemplate) return;

        const draft = {
            templateId: this.currentTemplate.id,
            values: { ...this.currentValues },
            owner: 'current-user', // TODO: Get from auth system
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem('emailBuilderDraft', JSON.stringify(draft));
        this.showMessage('✅ Draft saved locally!', 'success');
    }

    /**
     * Load draft from localStorage
     */
    loadDraft() {
        const draftData = localStorage.getItem('emailBuilderDraft');
        if (!draftData) {
            this.showMessage('ℹ️ No saved draft found.', 'info');
            return;
        }

        try {
            const draft = JSON.parse(draftData);
            this.selectTemplate(draft.templateId);
            
            // Populate fields with draft values
            Object.entries(draft.values).forEach(([key, value]) => {
                this.currentValues[key] = value;
                const fieldElement = document.getElementById(`field_${key}`);
                if (fieldElement) {
                    fieldElement.value = value;
                }
            });
            
            this.updatePreview();
            this.showMessage('✅ Draft loaded!', 'success');
        } catch (err) {
            this.showMessage('❌ Failed to load draft.', 'error');
            console.error('Draft loading error:', err);
        }
    }

    /**
     * Convert HTML to plain text for clipboard
     */
    htmlToPlainText(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    /**
     * Show user feedback message
     */
    showMessage(message, type = 'info') {
        const messageContainer = document.getElementById('messageContainer');
        if (!messageContainer) return;

        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        
        messageContainer.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.remove();
        }, 4000);
    }

    // Template HTML generators (continued in next part due to length)
    getClientProspectingTemplate() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{recipientName}} - Partnership Opportunity</title>
    <!--[if mso]>
    <nxml:namespace xmlns:nxml="urn:schemas-microsoft-com:office:office" />
    <nxml:namespace xmlns:w="urn:schemas-microsoft-com:office:word" />
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 40px 20px; text-align: center; background-color: {{brandHex}}; border-radius: 8px 8px 0 0;">
                            <img src="{{logoUrl}}" alt="{{companyName}}" style="max-height: 50px; height: auto;" />
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <h1 style="margin: 0 0 20px; font-size: 24px; color: {{brandHex}}; font-weight: bold;">
                                Hello {{recipientName}},
                            </h1>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                                I hope this message finds you well. I'm reaching out from {{companyName}} regarding an exciting opportunity for {{recipientCompany}}.
                            </p>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                                {{introLine}}
                            </p>
                            
                            <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #333333;">
                                {{valueProposition}}
                            </p>
                            
                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                                <tr>
                                    <td>
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{ctaUrl}}" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="{{accentHex}}">
                                            <w:anchorlock/>
                                            <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">{{ctaText}}</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <a href="{{ctaUrl}}" style="background-color: {{accentHex}}; border: none; border-radius: 5px; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 200px; -webkit-text-size-adjust: none; mso-hide: all;">{{ctaText}}</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                I'd love to discuss how we can help make your next event unforgettable. Looking forward to hearing from you!
                            </p>
                            
                            <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                Best regards,<br>
                                <strong>{{companyName}} Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="font-size: 14px; color: #666666; line-height: 1.4;">
                                        <strong>{{companyName}}</strong><br>
                                        {{companyAddress}}<br>
                                        Phone: {{companyPhone}}<br>
                                        Email: <a href="mailto:{{companyEmail}}" style="color: {{accentHex}}; text-decoration: none;">{{companyEmail}}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }

    getClientAcquisitionTemplate() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proposal Follow-up - {{proposalReference}}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 40px 20px; text-align: center; background: linear-gradient(135deg, {{brandHex}} 0%, #374151 100%);">
                            <img src="{{logoUrl}}" alt="{{companyName}}" style="max-height: 50px; height: auto;" />
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <h1 style="margin: 0 0 20px; font-size: 24px; color: {{brandHex}}; font-weight: bold;">
                                Thank you for your time, {{recipientName}}!
                            </h1>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                                Following our recent conversation about {{recipientCompany}}'s upcoming project, I wanted to provide you with our detailed proposal for your review.
                            </p>
                            
                            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
                                <h3 style="margin: 0 0 10px; font-size: 18px; color: {{brandHex}};">
                                    Proposal Reference: {{proposalReference}}
                                </h3>
                                <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                    {{projectDetails}}
                                </p>
                            </div>
                            
                            <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                {{nextSteps}}
                            </p>
                            
                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                                <tr>
                                    <td>
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{ctaUrl}}" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="{{accentHex}}">
                                            <w:anchorlock/>
                                            <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">{{ctaText}}</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <a href="{{ctaUrl}}" style="background-color: {{accentHex}}; border: none; border-radius: 5px; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 200px; -webkit-text-size-adjust: none; mso-hide: all;">{{ctaText}}</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                Please don't hesitate to reach out if you have any questions or would like to discuss any aspects of the proposal. We're excited about the possibility of working with {{recipientCompany}}!
                            </p>
                            
                            <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                Best regards,<br>
                                <strong>{{companyName}} Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="font-size: 14px; color: #666666; line-height: 1.4;">
                                        <strong>{{companyName}}</strong><br>
                                        {{companyAddress}}<br>
                                        Phone: {{companyPhone}}<br>
                                        Email: <a href="mailto:{{companyEmail}}" style="color: {{accentHex}}; text-decoration: none;">{{companyEmail}}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }

    getClientOnboardingTemplate() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to {{companyName}}!</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0fdf4;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0fdf4;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 40px 20px; text-align: center; background: linear-gradient(135deg, #10b981 0%, {{accentHex}} 100%);">
                            <img src="{{logoUrl}}" alt="{{companyName}}" style="max-height: 50px; height: auto;" />
                            <h1 style="margin: 15px 0 0; font-size: 28px; color: #ffffff; font-weight: bold;">
                                Welcome to the Team!
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <h2 style="margin: 0 0 20px; font-size: 22px; color: {{brandHex}}; font-weight: bold;">
                                Hello {{recipientName}}!
                            </h2>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                                We're thrilled to officially welcome {{recipientCompany}} to the {{companyName}} family! Thank you for choosing us to bring your vision to life.
                            </p>
                            
                            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
                                <h3 style="margin: 0 0 15px; font-size: 18px; color: {{brandHex}};">
                                    Project: {{projectName}}
                                </h3>
                                <p style="margin: 0 0 10px; font-size: 16px; color: #333333;">
                                    <strong>Project Manager:</strong> {{projectManager}}
                                </p>
                                <p style="margin: 0; font-size: 16px; color: #333333;">
                                    <strong>Kickoff Date:</strong> {{kickoffDate}}
                                </p>
                            </div>
                            
                            <h3 style="margin: 25px 0 15px; font-size: 18px; color: {{brandHex}};">
                                Your Next Steps:
                            </h3>
                            <ul style="margin: 0 0 25px; padding-left: 20px; font-size: 16px; line-height: 1.8; color: #333333;">
                                {{nextSteps}}
                            </ul>
                            
                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                                <tr>
                                    <td>
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{ctaUrl}}" style="height:50px;v-text-anchor:middle;width:220px;" arcsize="10%" stroke="f" fillcolor="#10b981">
                                            <w:anchorlock/>
                                            <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">{{ctaText}}</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <a href="{{ctaUrl}}" style="background-color: #10b981; border: none; border-radius: 5px; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 220px; -webkit-text-size-adjust: none; mso-hide: all;">{{ctaText}}</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                We're committed to making this project an extraordinary success. Your project manager {{projectManager}} will be your primary point of contact and will ensure everything runs smoothly from start to finish.
                            </p>
                            
                            <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                Welcome aboard!<br>
                                <strong>The {{companyName}} Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="font-size: 14px; color: #666666; line-height: 1.4;">
                                        <strong>{{companyName}}</strong><br>
                                        {{companyAddress}}<br>
                                        Phone: {{companyPhone}}<br>
                                        Email: <a href="mailto:{{companyEmail}}" style="color: #10b981; text-decoration: none;">{{companyEmail}}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }

    getPostEventTemplate() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - {{eventName}}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fef3c0;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fef3c0;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 40px 20px; text-align: center; background: linear-gradient(135deg, #f59e0b 0%, {{accentHex}} 100%);">
                            <img src="{{logoUrl}}" alt="{{companyName}}" style="max-height: 50px; height: auto;" />
                            <h1 style="margin: 15px 0 0; font-size: 28px; color: #ffffff; font-weight: bold;">
                                Thank You!
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <h2 style="margin: 0 0 20px; font-size: 22px; color: {{brandHex}}; font-weight: bold;">
                                Dear {{recipientName}},
                            </h2>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                                What an incredible event! {{eventName}} on {{eventDate}} was truly special, and we're so grateful that {{recipientCompany}} trusted us to bring your vision to life.
                            </p>
                            
                            <div style="background: linear-gradient(135deg, #fef3c0 0%, #fde68a 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
                                <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333; font-style: italic;">
                                    {{personalMessage}}
                                </p>
                            </div>
                            
                            <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                Your feedback is invaluable to us as we continue to improve our services and exceed our clients' expectations. We'd love to hear about your experience working with our team.
                            </p>
                            
                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                                <tr>
                                    <td>
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{ctaUrl}}" style="height:50px;v-text-anchor:middle;width:220px;" arcsize="10%" stroke="f" fillcolor="#f59e0b">
                                            <w:anchorlock/>
                                            <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">{{ctaText}}</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <a href="{{ctaUrl}}" style="background-color: #f59e0b; border: none; border-radius: 5px; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 220px; -webkit-text-size-adjust: none; mso-hide: all;">{{ctaText}}</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                We hope {{eventName}} exceeded your expectations and created lasting memories for everyone involved. Thank you for choosing {{companyName}} for this important milestone.
                            </p>
                            
                            <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                We look forward to working with {{recipientCompany}} again in the future!
                            </p>
                            
                            <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                With gratitude,<br>
                                <strong>The {{companyName}} Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="font-size: 14px; color: #666666; line-height: 1.4;">
                                        <strong>{{companyName}}</strong><br>
                                        {{companyAddress}}<br>
                                        Phone: {{companyPhone}}<br>
                                        Email: <a href="mailto:{{companyEmail}}" style="color: #f59e0b; text-decoration: none;">{{companyEmail}}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }

    getLossThankYouTemplate() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Consideration</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fef2f9;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fef2f9;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 40px 20px; text-align: center; background: linear-gradient(135deg, {{brandHex}} 0%, #6b7280 100%);">
                            <img src="{{logoUrl}}" alt="{{companyName}}" style="max-height: 50px; height: auto;" />
                            <h1 style="margin: 15px 0 0; font-size: 28px; color: #ffffff; font-weight: bold;">
                                Thank You
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <h2 style="margin: 0 0 20px; font-size: 22px; color: {{brandHex}}; font-weight: bold;">
                                Dear {{recipientName}},
                            </h2>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                                Thank you for considering {{companyName}} for {{projectReference}}. While we're disappointed we won't be working together on this project, we deeply appreciate the time you invested in the selection process.
                            </p>
                            
                            <div style="background: linear-gradient(135deg, #fef2f9 0%, #fce7f3 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 25px 0;">
                                <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                    {{personalMessage}}
                                </p>
                            </div>
                            
                            <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                {{futureOffering}}
                            </p>
                            
                            <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                We wish you tremendous success with {{projectReference}} and hope {{recipientCompany}} achieves everything you've envisioned.
                            </p>
                            
                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                                <tr>
                                    <td>
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{ctaUrl}}" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="{{accentHex}}">
                                            <w:anchorlock/>
                                            <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">{{ctaText}}</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <a href="{{ctaUrl}}" style="background-color: {{accentHex}}; border: none; border-radius: 5px; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 200px; -webkit-text-size-adjust: none; mso-hide: all;">{{ctaText}}</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                Should your event planning needs change in the future, we'd be honored to discuss how {{companyName}} can help bring your next vision to life.
                            </p>
                            
                            <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                With warm regards,<br>
                                <strong>The {{companyName}} Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="font-size: 14px; color: #666666; line-height: 1.4;">
                                        <strong>{{companyName}}</strong><br>
                                        {{companyAddress}}<br>
                                        Phone: {{companyPhone}}<br>
                                        Email: <a href="mailto:{{companyEmail}}" style="color: {{accentHex}}; text-decoration: none;">{{companyEmail}}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }
}

// Global instance
let emailBuilder;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    emailBuilder = new EmailTemplateBuilder();
});

// Export for external access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailTemplateBuilder;
}
