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
        this.zoomLevel = 100; // Add zoom level tracking
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
     * Load predefined templates organized by category
     */
    loadTemplates() {
        this.templateCategories = [
            {
                id: "prospect",
                name: "Prospect",
                description: "Templates for initial outreach and sales activities",
                icon: "📧",
                color: "#3FCBFF",
                templates: [
                    {
                        id: "prospect-outreach-v1",
                        name: "Prospect Outreach",
                        description: "Boutique AV service introduction with value proposition",
                        category: "prospect",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb3NwZWN0IE91dHJlYWNoPC90ZXh0Pjwvc3ZnPg==",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "firstName", label: "Recipient First Name", type: "text", placeholder: "Jane", required: true},
                            {key: "companyName", label: "Recipient Company", type: "text", placeholder: "Acme Corp", required: false},
                            {key: "industryVertical", label: "Industry/Vertical", type: "text", placeholder: "corporate", required: true},
                            {
                                key: "specificPainPoint", 
                                label: "Choose Pain Point or Context", 
                                type: "select",
                                required: true,
                                options: [
                                    {value: "", label: "Select a pain point..."},
                                    {value: "clarity in AV bids with transparent, line-item breakdowns", label: "Clarity in AV bids with transparent, line-item breakdowns"},
                                    {value: "flexibility by avoiding rising exclusive in-house AV costs and penalties for outside vendors", label: "Flexibility by avoiding rising in-house AV costs and penalties"},
                                    {value: "budget protection by eliminating surprise add-on fees for rigging, power, internet, or storage", label: "Budget protection by eliminating surprise add-on fees"},
                                    {value: "consistent, experienced AV crews for flawless execution", label: "Consistent, experienced AV crews for flawless execution"},
                                    {value: "adaptability to last-minute schedule or room changes without costly overtime charges", label: "Adaptability to last-minute changes without overtime charges"},
                                    {value: "hybrid and streaming capabilities without exceeding budgets", label: "Hybrid and streaming capabilities without exceeding budgets"},
                                    {value: "efficiency in navigating union labor rules and venue restrictions", label: "Efficiency in navigating union labor rules and venue restrictions"},
                                    {value: "immersive LED, AI-assisted cameras, and advanced tech without breaking the budget", label: "Immersive LED, AI cameras, and advanced tech within budget"},
                                    {value: "transparency by unbundling pricing for power, rigging, and internet", label: "Transparency by unbundling pricing for power, rigging, and internet"},
                                    {value: "leverage in negotiating carve-outs to bring preferred AV partners into venues", label: "Leverage in negotiating carve-outs for preferred AV partners"},
                                    {value: "cost-effective setups that build trust and avoid inflated pricing", label: "Cost-effective setups that build trust and avoid inflated pricing"},
                                    {value: "custom", label: "Write your own..."}
                                ]
                            },
                            {key: "customPainPoint", label: "Custom Pain Point (if selected above)", type: "textarea", placeholder: "Describe your specific pain point...", required: false, dependsOn: "specificPainPoint", dependsValue: "custom"},
                            {key: "portfolioLink", label: "Portfolio Link", type: "url", placeholder: "https://paradigmproductionsgroup.com/portfolio", required: true},
                            {key: "yourName", label: "Your Name", type: "text", placeholder: "John Smith", required: true},
                            {key: "title", label: "Your Title", type: "text", placeholder: "Senior AV Producer", required: true},
                            {key: "phone", label: "Your Phone", type: "tel", placeholder: "(555) 123-4567", required: true},
                            {key: "email", label: "Your Email", type: "email", placeholder: "john@paradigmproductionsgroup.com", required: true},
                            {key: "website", label: "Website", type: "url", placeholder: "www.paradigmproductionsgroup.com", required: true},
                            {key: "relevantEventClient", label: "Relevant Event or Client Example", type: "text", placeholder: "Microsoft's annual conference", required: true}
                        ],
                        htmlTemplate: this.getProspectOutreachTemplate()
                    },
                    {
                        id: "capabilities-followup-v1",
                        name: "Capabilities Follow-Up",
                        description: "Follow-up after networking or discovery call highlighting core strengths",
                        category: "prospect",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWZmNmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhcGFiaWxpdGllcyBGb2xsb3ctVXA8L3RleHQ+PC9zdmc+",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "firstName", label: "Recipient First Name", type: "text", placeholder: "Jane", required: true},
                            {key: "companyEventName", label: "Company/Event Name", type: "text", placeholder: "Acme Corp's Annual Conference", required: true},
                            {key: "eventDateTimeframe", label: "Event Date or Timeframe", type: "text", placeholder: "yesterday/last Tuesday", required: true},
                            {key: "eventName", label: "Specific Event Name", type: "text", placeholder: "your annual conference", required: true},
                            {key: "specificPainPointGoal", label: "Specific Pain Point or Goal Discussed", type: "textarea", placeholder: "seamless multi-room presentations with zero downtime", required: false},
                            {key: "yourName", label: "Your Name", type: "text", placeholder: "John Smith", required: true},
                            {key: "yourTitle", label: "Your Title", type: "text", placeholder: "Creative Director", required: true},
                            {key: "portfolioLink", label: "Portfolio Link", type: "url", placeholder: "https://paradigmproductionsgroup.com/capabilities", required: true},
                            {key: "yourEmail", label: "Your Email", type: "email", placeholder: "john@paradigmproductionsgroup.com", required: true},
                            {key: "yourPhone", label: "Your Phone", type: "tel", placeholder: "(555) 123-4567", required: true},
                            {key: "websiteLink", label: "Website Link", type: "url", placeholder: "www.paradigmproductionsgroup.com", required: true},
                            {key: "personalizedDetail", label: "Personalized Detail from Call", type: "textarea", placeholder: "your focus on creating memorable attendee experiences", required: false}
                        ],
                        htmlTemplate: this.getCapabilitiesFollowUpTemplate()
                    },
                    {
                        id: "proposal-submission-v1",
                        name: "Proposal Submission Cover Email",
                        description: "Sets expectations, confirms timeline",
                        category: "prospect",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmZGY0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb3Bvc2FsIFN1Ym1pc3Npb248L3RleHQ+PC9zdmc+",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "recipientFirstName", label: "Recipient First Name", type: "text", placeholder: "Jane", required: true},
                            {key: "eventName", label: "Event Name", type: "text", placeholder: "Annual Company Meeting", required: true},
                            {key: "proposalLink", label: "Proposal Link", type: "url", placeholder: "https://proposal.paradigmproductionsgroup.com", required: true},
                            {key: "decisionDate", label: "Decision Date", type: "text", placeholder: "Friday, September 20th", required: true},
                            {key: "senderName", label: "Your Name", type: "text", placeholder: "John Smith", required: true},
                            {key: "phoneNumber", label: "Phone Number", type: "text", placeholder: "(555) 123-4567", required: true},
                            {key: "websiteUrl", label: "Website URL", type: "url", placeholder: "https://paradigmproductionsgroup.com", required: true}
                        ],
                        htmlTemplate: this.getProposalSubmissionTemplate()
                    },
                    {
                        id: "loss-bid-thankyou-v1",
                        name: "Loss of Bid Thank You",
                        description: "Polite closeout, keeps door open",
                        category: "prospect",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmMmY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvc3MgQmlkIFRoYW5rIFlvdTwvdGV4dD48L3N2Zz4=",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                            {key: "projectReference", label: "Project Reference", type: "text", placeholder: "Annual Company Meeting 2025", required: true},
                            {key: "congratulatoryMessage", label: "Congratulatory Message", type: "textarea", placeholder: "Congratulations on selecting your event partner...", required: true},
                            {key: "futureOffering", label: "Future Offering", type: "textarea", placeholder: "We'd love to stay connected for future opportunities...", required: true},
                            {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Stay Connected", required: true},
                            {key: "ctaUrl", label: "Call-to-Action URL", type: "url", placeholder: "https://paradigmproductionsgroup.com/newsletter", required: true}
                        ],
                        htmlTemplate: this.getLossBidThankYouTemplate()
                    }
                ]
            },
            {
                id: "acquisition", 
                name: "Acquisition",
                description: "Templates for closing deals and welcoming new clients",
                icon: "🤝",
                color: "#B8A9D9",
                templates: [
                    {
                        id: "new-client-welcome-v1",
                        name: "New Client Welcome",
                        description: "Celebrates partnership, shares points of contact",
                        category: "acquisition",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmZGY0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5ldyBDbGllbnQgV2VsY29tZTwvdGV4dD48L3N2Zz4=",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                            {key: "recipientCompany", label: "Recipient Company", type: "text", placeholder: "Acme Corp", required: true},
                            {key: "projectName", label: "Project Name", type: "text", placeholder: "Annual Company Meeting 2025", required: true},
                            {key: "projectManager", label: "Project Manager", type: "text", placeholder: "John Smith", required: true},
                            {key: "accountManager", label: "Account Manager", type: "text", placeholder: "Sarah Johnson", required: true},
                            {key: "kickoffDate", label: "Kickoff Date", type: "text", placeholder: "September 15, 2025", required: true},
                            {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Access Client Portal", required: true},
                            {key: "ctaUrl", label: "Call-to-Action URL", type: "url", placeholder: "https://portal.paradigmproductionsgroup.com", required: true}
                        ],
                        htmlTemplate: this.getNewClientWelcomeTemplate()
                    },
                    {
                        id: "client-onboarding-v1",
                        name: "Client Onboarding",
                        description: "Event questionnaire, file-sharing links, kickoff schedule",
                        category: "acquisition",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmZGY0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNsaWVudCBPbmJvYXJkaW5nPC90ZXh0Pjwvc3ZnPg==",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                            {key: "projectName", label: "Project Name", type: "text", placeholder: "Annual Company Meeting 2025", required: true},
                            {key: "questionnaireUrl", label: "Event Questionnaire URL", type: "url", placeholder: "https://forms.paradigmproductionsgroup.com/event-brief", required: true},
                            {key: "fileSharingUrl", label: "File Sharing URL", type: "url", placeholder: "https://share.paradigmproductionsgroup.com/client", required: true},
                            {key: "kickoffSchedule", label: "Kickoff Schedule", type: "textarea", placeholder: "Discovery call: Sept 10|Planning meeting: Sept 15|Design review: Sept 20", required: true},
                            {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Complete Event Brief", required: true},
                            {key: "ctaUrl", label: "Primary Action URL", type: "url", placeholder: "https://forms.paradigmproductionsgroup.com/event-brief", required: true}
                        ],
                        htmlTemplate: this.getClientOnboardingTemplate()
                    }
                ]
            },
            {
                id: "post-event",
                name: "Post-Event",
                description: "Templates for follow-up after event completion",
                icon: "🎉",
                color: "#3F105E",
                templates: [
                    {
                        id: "post-event-thankyou-v1",
                        name: "Post-Event Thank You & Recap",
                        description: "Quick wins, warm wrap-up",
                        category: "post-event",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmM2MwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBvc3QtRXZlbnQgVGhhbmsgWW91PC90ZXh0Pjwvc3ZnPg==",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                            {key: "eventName", label: "Event Name", type: "text", placeholder: "Annual Company Meeting 2025", required: true},
                            {key: "eventDate", label: "Event Date", type: "text", placeholder: "September 15, 2025", required: true},
                            {key: "eventHighlights", label: "Event Highlights", type: "textarea", placeholder: "200+ attendees|98% satisfaction rating|Zero technical issues", required: true},
                            {key: "personalMessage", label: "Personal Message", type: "textarea", placeholder: "Thank you for trusting us with your important event...", required: true},
                            {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Share Your Feedback", required: true},
                            {key: "ctaUrl", label: "Call-to-Action URL", type: "url", placeholder: "https://feedback.paradigmproductionsgroup.com", required: true}
                        ],
                        htmlTemplate: this.getPostEventThankYouTemplate()
                    },
                    {
                        id: "survey-request-v1",
                        name: "Survey Request",
                        description: "Short, branded feedback request",
                        category: "post-event",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmM2MwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlN1cnZleSBSZXF1ZXN0PC90ZXh0Pjwvc3ZnPg==",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                            {key: "eventName", label: "Event Name", type: "text", placeholder: "Annual Company Meeting 2025", required: true},
                            {key: "surveyIncentive", label: "Survey Incentive", type: "text", placeholder: "$50 Amazon gift card", required: false},
                            {key: "estimatedTime", label: "Estimated Time", type: "text", placeholder: "5 minutes", required: true},
                            {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Take Survey", required: true},
                            {key: "ctaUrl", label: "Survey URL", type: "url", placeholder: "https://survey.paradigmproductionsgroup.com", required: true}
                        ],
                        htmlTemplate: this.getSurveyRequestTemplate()
                    },
                    {
                        id: "case-study-request-v1",
                        name: "Case Study Request",
                        description: "Permission to feature the event in PPG's portfolio",
                        category: "post-event",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmM2MwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhc2UgU3R1ZHkgUmVxdWVzdDwvdGV4dD48L3N2Zz4=",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                            {key: "eventName", label: "Event Name", type: "text", placeholder: "Annual Company Meeting 2025", required: true},
                            {key: "eventSuccessMetrics", label: "Event Success Metrics", type: "textarea", placeholder: "200+ attendees|98% satisfaction|$50K under budget", required: true},
                            {key: "portfolioBenefit", label: "Portfolio Benefit", type: "textarea", placeholder: "Help other clients see the possibilities...", required: true},
                            {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Give Permission", required: true},
                            {key: "ctaUrl", label: "Permission Form URL", type: "url", placeholder: "https://forms.paradigmproductionsgroup.com/case-study", required: true}
                        ],
                        htmlTemplate: this.getCaseStudyRequestTemplate()
                    }
                ]
            },
            {
                id: "relationship-maintenance",
                name: "Relationship Maintenance", 
                description: "Templates for maintaining client relationships and future opportunities",
                icon: "💬",
                color: "#1F1633",
                templates: [
                    {
                        id: "holiday-greeting-v1",
                        name: "Holiday / Year-End Greeting",
                        description: "Seasonal, warm, non-salesy",
                        category: "relationship-maintenance",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmMmY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhvbGlkYXkgR3JlZXRpbmc8L3RleHQ+PC9zdmc+",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                            {key: "holidayType", label: "Holiday/Season", type: "text", placeholder: "Holiday Season", required: true},
                            {key: "yearReflection", label: "Year Reflection", type: "textarea", placeholder: "What a remarkable year it's been...", required: true},
                            {key: "gratitudeMessage", label: "Gratitude Message", type: "textarea", placeholder: "We're grateful for clients like you...", required: true},
                            {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "View Our Year in Review", required: false},
                            {key: "ctaUrl", label: "Call-to-Action URL", type: "url", placeholder: "https://paradigmproductionsgroup.com/year-review", required: false}
                        ],
                        htmlTemplate: this.getHolidayGreetingTemplate()
                    },
                    {
                        id: "event-anniversary-v1",
                        name: "Event Anniversary Note",
                        description: "\"One year ago...\" with throwback photo/stat",
                        category: "relationship-maintenance",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmMmY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkV2ZW50IEFubml2ZXJzYXJ5PC90ZXh0Pjwvc3ZnPg==",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                            {key: "eventName", label: "Event Name", type: "text", placeholder: "Annual Company Meeting 2024", required: true},
                            {key: "anniversaryDate", label: "Anniversary Date", type: "text", placeholder: "One year ago today", required: true},
                            {key: "eventMemory", label: "Event Memory", type: "textarea", placeholder: "That incredible moment when...", required: true},
                            {key: "eventStats", label: "Event Stats", type: "textarea", placeholder: "200 attendees|98% satisfaction|Zero technical issues", required: true},
                            {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Plan This Year's Event", required: false},
                            {key: "ctaUrl", label: "Call-to-Action URL", type: "url", placeholder: "https://calendly.com/ppg/anniversary-planning", required: false}
                        ],
                        htmlTemplate: this.getEventAnniversaryTemplate()
                    },
                    {
                        id: "industry-insight-v1",
                        name: "Industry Insight Share",
                        description: "Thought-leadership or trend relevant to the client",
                        category: "relationship-maintenance",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmMmY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkluZHVzdHJ5IEluc2lnaHQ8L3RleHQ+PC9zdmc+",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                            {key: "insightTitle", label: "Insight Title", type: "text", placeholder: "2025 Event Technology Trends", required: true},
                            {key: "keyInsights", label: "Key Insights", type: "textarea", placeholder: "Three trends reshaping corporate events...", required: true},
                            {key: "clientRelevance", label: "Client Relevance", type: "textarea", placeholder: "This could be particularly relevant for your upcoming...", required: true},
                            {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Read Full Report", required: true},
                            {key: "ctaUrl", label: "Report URL", type: "url", placeholder: "https://paradigmproductionsgroup.com/insights/2025-trends", required: true}
                        ],
                        htmlTemplate: this.getIndustryInsightTemplate()
                    },
                    {
                        id: "reengagement-v1",
                        name: "Re-Engagement Email",
                        description: "Revives dormant clients with new work examples",
                        category: "relationship-maintenance",
                        thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmMmY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJlLUVuZ2FnZW1lbnQ8L3RleHQ+PC9zdmc+",
                        lockedFields: this.getLockedFields(),
                        dynamicFields: [
                            {key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Jane Doe", required: true},
                            {key: "lastInteraction", label: "Last Interaction Reference", type: "text", placeholder: "your successful 2023 conference", required: true},
                            {key: "recentWorkExamples", label: "Recent Work Examples", type: "textarea", placeholder: "Since we last worked together, we've produced...", required: true},
                            {key: "valueProposition", label: "Updated Value Proposition", type: "textarea", placeholder: "We've expanded our capabilities to include...", required: true},
                            {key: "ctaText", label: "Call-to-Action Text", type: "text", placeholder: "Reconnect with PPG", required: true},
                            {key: "ctaUrl", label: "Call-to-Action URL", type: "url", placeholder: "https://calendly.com/ppg/reconnect", required: true}
                        ],
                        htmlTemplate: this.getReEngagementTemplate()
                    }
                ]
            }
        ];

        // Create flat array for backward compatibility
        this.templates = [];
        this.templateCategories.forEach(category => {
            this.templates.push(...category.templates);
        });
    }

    /**
     * Get standard locked fields for all templates
     */
    getLockedFields() {
        return {
            logoUrl: "https://brandcentral.netlify.app/assets/images/paradigm-logo.png",
            brandHex: "#1F1633",
            accentHex: "#3FCBFF",
            secondaryHex: "#3F105E",
            supportingHex: "#B8A9D9",
            companyName: "Paradigm Productions Group",
            companyTagline: "Boutique Service Built on Trust",
            companyAddress: "215 E Main Street, Leesburg, Florida 34748",
            companyPhone: "(407) 909 - 1338",
            companyEmail: "hello@paradigmproductionsgroup.com",
            companyWebsite: "www.paradigmproductionsgroup.com"
        };
    }

    /**
     * Generate Outlook-compatible image HTML
     */
    getOutlookCompatibleImage(src = "{{logoUrl}}", alt = "Paradigm Productions Group", width = 240, height = 60) {
        return `<!--[if gte mso 9]>
                            <table role="presentation" cellpadding="0" cellspacing="0" style="width: ${width}px; margin: 0 auto 20px auto;">
                                <tr>
                                    <td style="text-align: center;">
                                        <img src="${src}" alt="${alt}" style="width: ${width}px; height: ${height}px; display: block;" width="${width}" height="${height}" border="0">
                                    </td>
                                </tr>
                            </table>
                            <![endif]-->
                            <!--[if !mso]><!-->
                            <img src="${src}" alt="${alt}" style="height: ${height}px; width: ${width}px; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; max-width: ${width}px; font-size: 0; line-height: 0;" width="${width}" height="${height}" border="0">
                            <!--<![endif]-->`;
    }

    /**
     * Get standard prospect outreach template
     */
    getProspectOutreachTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <div style="background: #1F1633; text-align: center; padding: 20px 0;">
                            <!-- Outlook-safe image with correct aspect ratio -->
                            <div style="width: 120px; height: 60px; margin: 0 auto 20px auto; background-color: #1F1633;">
                                <img src="{{logoUrl}}" alt="Paradigm Productions Group" style="width: 120px; height: 60px; display: block; margin: 0; padding: 0; border: 0; outline: none; vertical-align: top; -ms-interpolation-mode: bicubic;" width="120" height="60" border="0" vspace="0" hspace="0">
                            </div>
                            <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700; font-family: Arial, sans-serif;">bringing boutique AV service to your next event</h1>
                            <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px; font-family: Arial, sans-serif;">Precision show calling &bull; Creative previsualizations &bull; Technical mastery</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi {{firstName}},</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">I'm {{yourName}}, {{title}} at Paradigm Productions Group — an AV partner known for delivering boutique service built on trust for {{industryVertical}} events.</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">We recently partnered with {{relevantEventClient}}, providing {{specificPainPoint}}&mdash;solutions that kept the show running flawlessly &mdash; from rough CAD layouts to conceptual previsualization and precision show calling.</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">I thought you might be interested in seeing how our approach blends:</p>
                        
                        <div style="margin: 20px 0;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                                <tr>
                                    <td style="width: 20px; vertical-align: top; padding-top: 8px;">
                                        <div style="width: 8px; height: 8px; background: #3FCBFF; border-radius: 50%; mso-border-radius-alt: 0; margin: 0;"></div>
                                    </td>
                                    <td style="vertical-align: top;">
                                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 600;">Technical mastery</p>
                                        <p style="color: #666; font-size: 15px; line-height: 1.5; margin: 2px 0 0 0;">Gear specs, CADs, and signal flow you can count on.</p>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                                <tr>
                                    <td style="width: 20px; vertical-align: top; padding-top: 8px;">
                                        <div style="width: 8px; height: 8px; background: #3FCBFF; border-radius: 50%; mso-border-radius-alt: 0; margin: 0;"></div>
                                    </td>
                                    <td style="vertical-align: top;">
                                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 600;">Creative impact</p>
                                        <p style="color: #666; font-size: 15px; line-height: 1.5; margin: 2px 0 0 0;">Previsualizations that let you see the stage before show day.</p>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                                <tr>
                                    <td style="width: 20px; vertical-align: top; padding-top: 8px;">
                                        <div style="width: 8px; height: 8px; background: #3FCBFF; border-radius: 50%; mso-border-radius-alt: 0; margin: 0;"></div>
                                    </td>
                                    <td style="vertical-align: top;">
                                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 600;">Trusted partnership</p>
                                        <p style="color: #666; font-size: 15px; line-height: 1.5; margin: 2px 0 0 0;">A familiar team that feels like an extension of yours.</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 20px 0;">Here's a quick look at our work: <a href="{{portfolioLink}}" style="color: #3FCBFF; text-decoration: none; font-weight: 600;">{{portfolioLink}}</a></p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">If you're planning upcoming events, meetings, or season activities, I'd love to explore how we can make them seamless, impactful, and stress-free.</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0; font-weight: 600;">Would you be open to a short call next week?</p>
                        
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">Let's Connect</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="mailto:{{email}}?subject=Let's Connect - AV Partnership Discussion" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">Let's Connect</a>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">Warm regards,</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{yourName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{title}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">Paradigm Productions Group</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="tel:{{phone}}" style="color: #3FCBFF; text-decoration: none;">{{phone}}</a> | 
                                        <a href="mailto:{{email}}" style="color: #3FCBFF; text-decoration: none;">{{email}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{website}}" style="color: #3FCBFF; text-decoration: none;">{{website}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get capabilities follow-up template
     */
    getCapabilitiesFollowUpTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <!--[if gte mso 9]>
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:200px;">
                        <v:fill type="gradient" color="#1F1633" color2="#3F105E" angle="135" />
                        <v:textbox inset="0,0,0,0">
                        <![endif]-->
                        <div style="background: #1F1633;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width: 240px; margin: 0 auto 20px auto;">
                                <tr>
                                    <td style="text-align: center; width: 240px; height: 60px;">
                                        <img src="{{logoUrl}}" alt="Paradigm Productions Group" style="width: 240px !important; height: 60px !important; display: block; margin: 0; padding: 0; border: none; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60" border="0">
                                    </td>
                                </tr>
                            </table>
                            <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">Boutique Service Built on Trust</h1>
                            <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">High-touch client care • Precision execution • Zero margin for error</p>
                        </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi {{firstName}},</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">It was great speaking with you {{eventDateTimeframe}} and learning more about {{companyEventName}}.</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">I wanted to follow up with a quick snapshot of how Paradigm Productions Group can help make your next event run seamlessly — and leave your audience talking for all the right reasons.</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">At PPG, we deliver <strong style="color: #3F105E;">Boutique Service Built on Trust</strong> — pairing high-touch client care with precision execution for events where there's no room for "almost right."</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0; font-weight: 600;">We focus on four core strengths:</p>
                        
                        <div style="margin: 20px 0;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
                                <tr>
                                    <td style="width: 25px; vertical-align: top; padding-top: 6px;">
                                        <div style="width: 10px; height: 10px; background: #3FCBFF; border-radius: 50%; mso-border-radius-alt: 0; margin: 0;"></div>
                                    </td>
                                    <td style="vertical-align: top;">
                                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 600;">Technical Direction</p>
                                        <p style="color: #666; font-size: 15px; line-height: 1.5; margin: 2px 0 0 0;">From gear specs to cue calls, we orchestrate the entire show flow with precision.</p>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
                                <tr>
                                    <td style="width: 25px; vertical-align: top; padding-top: 6px;">
                                        <div style="width: 10px; height: 10px; background: #3FCBFF; border-radius: 50%; mso-border-radius-alt: 0; margin: 0;"></div>
                                    </td>
                                    <td style="vertical-align: top;">
                                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 600;">Show Management</p>
                                        <p style="color: #666; font-size: 15px; line-height: 1.5; margin: 2px 0 0 0;">We lead rehearsals, wrangle timelines, and keep every moment running flawlessly.</p>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
                                <tr>
                                    <td style="width: 25px; vertical-align: top; padding-top: 6px;">
                                        <div style="width: 10px; height: 10px; background: #3FCBFF; border-radius: 50%; mso-border-radius-alt: 0; margin: 0;"></div>
                                    </td>
                                    <td style="vertical-align: top;">
                                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 600;">On-Site Execution</p>
                                        <p style="color: #666; font-size: 15px; line-height: 1.5; margin: 2px 0 0 0;">Our team shows up early, stays late, and sweats the details so you don't have to.</p>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
                                <tr>
                                    <td style="width: 25px; vertical-align: top; padding-top: 6px;">
                                        <div style="width: 10px; height: 10px; background: #3FCBFF; border-radius: 50%; mso-border-radius-alt: 0; margin: 0;"></div>
                                    </td>
                                    <td style="vertical-align: top;">
                                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 600;">Creative Direction</p>
                                        <p style="color: #666; font-size: 15px; line-height: 1.5; margin: 2px 0 0 0;">From branding to motion design, we ensure every visual is on-message and show-ready.</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 20px 0;">Our sweet spot? High-stakes productions for pharma, finance, and national associations — where every detail matters, timelines are unforgiving, and the margin for error is zero.</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Here's a link to our Capabilities Portfolio so you can see exactly how we deliver: <a href="{{portfolioLink}}" style="color: #3FCBFF; text-decoration: none; font-weight: 600;">{{portfolioLink}}</a></p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Let's continue the conversation and explore how we can make {{eventName}} your most seamless, impactful production yet.</p>
                        
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">Let's Continue the Conversation</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="mailto:{{yourEmail}}?subject=Continue Our Conversation - {{eventName}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">Let's Continue the Conversation</a>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">Warm regards,</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{yourName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{yourTitle}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">Paradigm Productions Group</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="mailto:{{yourEmail}}" style="color: #3FCBFF; text-decoration: none;">{{yourEmail}}</a> | 
                                        <a href="tel:{{yourPhone}}" style="color: #3FCBFF; text-decoration: none;">{{yourPhone}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{websiteLink}}" style="color: #3FCBFF; text-decoration: none;">{{websiteLink}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get proposal submission template
     */
    getProposalSubmissionTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <!--[if gte mso 9]>
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:200px;">
                        <v:fill type="gradient" color="#1F1633" color2="#3F105E" angle="135" />
                        <v:textbox inset="0,0,0,0">
                        <![endif]-->
                        <div style="background: linear-gradient(135deg, #1F1633 0%, #3F105E 100%);">
                            <img src="{{logoUrl}}" alt="{{companyName}} Logo" style="height: 60px; width: auto; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60">
                            <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">Boutique Service Built on Trust</h1>
                            <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">Proposal Submission – {{eventName}}</p>
                        </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi {{recipientFirstName}},</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Thank you for the opportunity to submit our proposal for {{eventName}}.</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">At Paradigm Productions Group, we deliver <strong>Boutique Service Built on Trust</strong> — a seamless blend of precise technical direction, polished execution, and creative solutions that make every event exceptional.</p>
                        
                        <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #3FCBFF; margin: 25px 0;">
                            <h3 style="color: #1F1633; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Here's what happens next:</h3>
                            
                            <div style="margin-bottom: 20px;">
                                <p style="color: #3FCBFF; font-weight: 600; margin: 0 0 8px 0; font-size: 16px;">📋 Proposal Review</p>
                                <p style="color: #1F1633; font-size: 15px; line-height: 1.5; margin: 0;">You can review the full proposal <a href="{{proposalLink}}" style="color: #3FCBFF; text-decoration: none; font-weight: 600;">here</a>. We're available to walk through it in detail, answer questions, and ensure every element is aligned with your vision.</p>
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <p style="color: #3FCBFF; font-weight: 600; margin: 0 0 8px 0; font-size: 16px;">⏰ Decision Timeline</p>
                                <p style="color: #1F1633; font-size: 15px; line-height: 1.5; margin: 0;">We understand that decisions will be made by {{decisionDate}}. If that changes, please let us know so we can adjust accordingly.</p>
                            </div>
                            
                            <div style="margin-bottom: 0;">
                                <p style="color: #3FCBFF; font-weight: 600; margin: 0 0 8px 0; font-size: 16px;">🎯 Pre-Event Planning</p>
                                <p style="color: #1F1633; font-size: 15px; line-height: 1.5; margin: 0;">Upon confirmation, we'll begin refining CAD layouts, finalizing gear specs, and preparing conceptual previsualizations to ensure a flawless show flow.</p>
                            </div>
                        </div>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">This proposal was built with your audience, objectives, and budget in mind — ensuring every element supports your goals. We look forward to the opportunity to build on the strong foundation we've already established and deliver an event that exceeds expectations.</p>
                        
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">If it's helpful, we can schedule a quick proposal walkthrough call this week to review details together.</p>
                        
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">Review Proposal</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="{{proposalLink}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 15px 30px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all; margin-bottom: 20px;">Review Proposal</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; margin: 0 0 5px 0;">Warm regards,</p>
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">{{senderName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">Creative Director</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">{{companyName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="tel:{{phoneNumber}}" style="color: #3FCBFF; text-decoration: none;">{{phoneNumber}}</a> | 
                                        <a href="{{websiteUrl}}" style="color: #3FCBFF; text-decoration: none;">{{websiteUrl}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">{{companyAddress}}</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get loss bid thank you template
     */
    getLossBidThankYouTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <img src="{{logoUrl}}" alt="{{companyName}} Logo" style="height: 60px; width: auto; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60">
                        <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">Thank You for the Opportunity</h1>
                        <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">Building relationships for the future</p>
                    </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{recipientName}},</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Thank you for considering {{companyName}} for {{projectName}}. While we're disappointed we won't be working together on this project, we truly appreciate the opportunity to propose our services.</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">We understand that choosing the right partner involves many factors, and we respect your decision. We hope the project is a tremendous success!</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">{{futureOpportunityMessage}}</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Please don't hesitate to reach out if there's anything we can help with in the future. We'd love to stay connected!</p>
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">Stay Connected</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="{{companyWebsite}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">Stay Connected</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{senderName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{senderTitle}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">{{companyName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="mailto:{{companyEmail}}" style="color: #3FCBFF; text-decoration: none;">{{companyEmail}}</a> | 
                                        <a href="tel:{{companyPhone}}" style="color: #3FCBFF; text-decoration: none;">{{companyPhone}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 5px 0;">{{companyAddress}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{companyWebsite}}" style="color: #3FCBFF; text-decoration: none;">{{companyWebsite}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get new client welcome template
     */
    getNewClientWelcomeTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <img src="{{logoUrl}}" alt="{{companyName}} Logo" style="height: 60px; width: auto; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60">
                        <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">Welcome to the {{companyName}} Family!</h1>
                        <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">We're thrilled to partner with you</p>
                    </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{recipientName}} and the entire {{recipientCompany}} team,</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">{{welcomeMessage}}</p>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #3FCBFF; margin: 20px 0;">
                            <h3 style="color: #1F1633; margin: 0 0 15px 0; font-size: 18px;">What's Next</h3>
                            <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0;">{{nextSteps}}</p>
                        </div>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 20px 0;">Our commitment to you goes beyond just delivering excellent events. We're here to be your trusted partner in creating memorable experiences that align with your brand and objectives.</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Thank you for choosing {{companyName}}. We can't wait to get started!</p>
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">{{ctaText}}</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="{{ctaUrl}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">{{ctaText}}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{senderName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{senderTitle}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">{{companyName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="mailto:{{companyEmail}}" style="color: #3FCBFF; text-decoration: none;">{{companyEmail}}</a> | 
                                        <a href="tel:{{companyPhone}}" style="color: #3FCBFF; text-decoration: none;">{{companyPhone}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 5px 0;">{{companyAddress}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{companyWebsite}}" style="color: #3FCBFF; text-decoration: none;">{{companyWebsite}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get client onboarding template
     */
    getClientOnboardingTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <img src="{{logoUrl}}" alt="{{companyName}} Logo" style="height: 60px; width: auto; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60">
                        <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">Let's Get Started</h1>
                        <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">Your onboarding information and next steps</p>
                    </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi {{recipientName}},</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Welcome to {{companyName}}! We're excited to begin working with {{recipientCompany}} on {{projectName}}.</p>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #3FCBFF; margin: 20px 0;">
                            <h3 style="color: #1F1633; margin: 0 0 15px 0; font-size: 18px;">Onboarding Checklist</h3>
                            <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0;">{{onboardingSteps}}</p>
                        </div>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 20px 0;"><strong>Key Contacts:</strong></p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">{{keyContacts}}</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">{{projectTimeline}}</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">If you have any questions or need clarification on any of these steps, please don't hesitate to reach out. We're here to make this process as smooth as possible!</p>
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">{{ctaText}}</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="{{ctaUrl}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">{{ctaText}}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{senderName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{senderTitle}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">{{companyName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="mailto:{{companyEmail}}" style="color: #3FCBFF; text-decoration: none;">{{companyEmail}}</a> | 
                                        <a href="tel:{{companyPhone}}" style="color: #3FCBFF; text-decoration: none;">{{companyPhone}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 5px 0;">{{companyAddress}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{companyWebsite}}" style="color: #3FCBFF; text-decoration: none;">{{companyWebsite}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get post-event thank you template
     */
    getPostEventThankYouTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <img src="{{logoUrl}}" alt="{{companyName}} Logo" style="height: 60px; width: auto; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60">
                        <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">Thank You for an Amazing Event!</h1>
                        <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">{{eventName}} wrap-up and highlights</p>
                    </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{recipientName}},</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">What an incredible {{eventName}}! Thank you for trusting {{companyName}} to bring your vision to life. {{eventSuccess}}</p>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #3FCBFF; margin: 20px 0;">
                            <h3 style="color: #1F1633; margin: 0 0 15px 0; font-size: 18px;">Event Highlights</h3>
                            <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0;">{{eventHighlights}}</p>
                        </div>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 20px 0;"><strong>Final Numbers:</strong></p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">{{finalMetrics}}</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">{{futureCollaboration}}</p>
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">{{ctaText}}</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="{{ctaUrl}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">{{ctaText}}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{senderName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{senderTitle}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">{{companyName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="mailto:{{companyEmail}}" style="color: #3FCBFF; text-decoration: none;">{{companyEmail}}</a> | 
                                        <a href="tel:{{companyPhone}}" style="color: #3FCBFF; text-decoration: none;">{{companyPhone}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 5px 0;">{{companyAddress}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{companyWebsite}}" style="color: #3FCBFF; text-decoration: none;">{{companyWebsite}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get holiday greeting template
     */
    getHolidayGreetingTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <img src="{{logoUrl}}" alt="{{companyName}} Logo" style="height: 60px; width: auto; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60">
                        <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">{{holidayTitle}}</h1>
                        <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">From the {{companyName}} family to yours</p>
                    </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{recipientName}},</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">{{holidayMessage}}</p>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #3FCBFF; margin: 20px 0; text-align: center;">
                            <h3 style="color: #1F1633; margin: 0 0 15px 0; font-size: 18px;">{{yearReflection}}</h3>
                            <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0;">{{yearHighlights}}</p>
                        </div>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 20px 0;">{{futureExcitement}}</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Wishing you and your loved ones {{holidayWishes}}!</p>
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">Our Portfolio</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="{{companyWebsite}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">Our Portfolio</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{senderName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{senderTitle}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">{{companyName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="mailto:{{companyEmail}}" style="color: #3FCBFF; text-decoration: none;">{{companyEmail}}</a> | 
                                        <a href="tel:{{companyPhone}}" style="color: #3FCBFF; text-decoration: none;">{{companyPhone}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 5px 0;">{{companyAddress}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{companyWebsite}}" style="color: #3FCBFF; text-decoration: none;">{{companyWebsite}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get survey request template
     */
    getSurveyRequestTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <img src="{{logoUrl}}" alt="{{companyName}} Logo" style="height: 60px; width: auto; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60">
                        <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">Help Us Improve</h1>
                        <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">Your feedback matters to us</p>
                    </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi {{recipientName}},</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Thank you for choosing {{companyName}} for {{eventName}}. We hope you had an amazing experience!</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">To help us continue delivering exceptional events, we'd love to hear your feedback. The survey takes approximately {{estimatedTime}} to complete.</p>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #3FCBFF; margin: 20px 0; text-align: center;">
                            <h3 style="color: #1F1633; margin: 0 0 15px 0; font-size: 18px;">Survey Incentive</h3>
                            <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0;">Complete the survey and receive {{surveyIncentive}} as a thank you!</p>
                        </div>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Your honest feedback helps us improve and ensures future events exceed expectations.</p>
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">{{ctaText}}</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="{{ctaUrl}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">{{ctaText}}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{senderName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{senderTitle}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">{{companyName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="mailto:{{companyEmail}}" style="color: #3FCBFF; text-decoration: none;">{{companyEmail}}</a> | 
                                        <a href="tel:{{companyPhone}}" style="color: #3FCBFF; text-decoration: none;">{{companyPhone}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 5px 0;">{{companyAddress}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{companyWebsite}}" style="color: #3FCBFF; text-decoration: none;">{{companyWebsite}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get case study request template
     */
    getCaseStudyRequestTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <img src="{{logoUrl}}" alt="{{companyName}} Logo" style="height: 60px; width: auto; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60">
                        <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">Share Your Success Story</h1>
                        <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">Help inspire other clients</p>
                    </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{recipientName}},</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">{{eventName}} was such a tremendous success, and we'd love to share your story to inspire other clients.</p>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #3FCBFF; margin: 20px 0;">
                            <h3 style="color: #1F1633; margin: 0 0 15px 0; font-size: 18px;">Event Success Metrics</h3>
                            <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0;">{{eventSuccessMetrics}}</p>
                        </div>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 20px 0;">{{portfolioBenefit}}</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Would you be willing to let us feature your event as a case study? We'll ensure your approval on all content before publication.</p>
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">{{ctaText}}</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="{{ctaUrl}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">{{ctaText}}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{senderName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{senderTitle}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">{{companyName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="mailto:{{companyEmail}}" style="color: #3FCBFF; text-decoration: none;">{{companyEmail}}</a> | 
                                        <a href="tel:{{companyPhone}}" style="color: #3FCBFF; text-decoration: none;">{{companyPhone}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 5px 0;">{{companyAddress}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{companyWebsite}}" style="color: #3FCBFF; text-decoration: none;">{{companyWebsite}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get event anniversary template
     */
    getEventAnniversaryTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <img src="{{logoUrl}}" alt="{{companyName}} Logo" style="height: 60px; width: auto; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60">
                        <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">Remembering {{eventName}}</h1>
                        <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">{{anniversaryDate}}</p>
                    </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi {{recipientName}},</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">{{anniversaryDate}}, we had the privilege of producing {{eventName}}. {{eventMemory}}</p>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #3FCBFF; margin: 20px 0;">
                            <h3 style="color: #1F1633; margin: 0 0 15px 0; font-size: 18px;">Event Highlights</h3>
                            <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0;">{{eventStats}}</p>
                        </div>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 20px 0;">It was truly a pleasure working with your team, and we hope you're already planning this year's event!</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">If you're ready to start planning, we'd love to discuss how we can make this year even better.</p>
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">{{ctaText}}</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="{{ctaUrl}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">{{ctaText}}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{senderName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{senderTitle}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">{{companyName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="mailto:{{companyEmail}}" style="color: #3FCBFF; text-decoration: none;">{{companyEmail}}</a> | 
                                        <a href="tel:{{companyPhone}}" style="color: #3FCBFF; text-decoration: none;">{{companyPhone}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 5px 0;">{{companyAddress}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{companyWebsite}}" style="color: #3FCBFF; text-decoration: none;">{{companyWebsite}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get industry insight template
     */
    getIndustryInsightTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <img src="{{logoUrl}}" alt="{{companyName}} Logo" style="height: 60px; width: auto; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60">
                        <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">{{insightTitle}}</h1>
                        <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">Industry insights from {{companyName}}</p>
                    </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi {{recipientName}},</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">I thought you might find this industry insight interesting and relevant to your upcoming events.</p>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #3FCBFF; margin: 20px 0;">
                            <h3 style="color: #1F1633; margin: 0 0 15px 0; font-size: 18px;">Key Insights</h3>
                            <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0;">{{keyInsights}}</p>
                        </div>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 20px 0;"><strong>Relevance to Your Events:</strong></p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">{{clientRelevance}}</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">I'd love to discuss how these trends might apply to your future events. Feel free to reach out if you'd like to explore any of these ideas further.</p>
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">{{ctaText}}</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="{{ctaUrl}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">{{ctaText}}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{senderName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{senderTitle}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">{{companyName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="mailto:{{companyEmail}}" style="color: #3FCBFF; text-decoration: none;">{{companyEmail}}</a> | 
                                        <a href="tel:{{companyPhone}}" style="color: #3FCBFF; text-decoration: none;">{{companyPhone}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 5px 0;">{{companyAddress}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{companyWebsite}}" style="color: #3FCBFF; text-decoration: none;">{{companyWebsite}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Get re-engagement template
     */
    getReEngagementTemplate() {
        return `
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;">
                <tr>
                    <td style="padding: 40px 30px; background: #1F1633; text-align: center;">
                        <img src="{{logoUrl}}" alt="{{companyName}} Logo" style="height: 60px; width: auto; margin: 0 auto 20px auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" width="240" height="60">
                        <h1 style="color: #3FCBFF; margin: 0; font-size: 28px; font-weight: 700;">Let's Reconnect</h1>
                        <p style="color: #B8A9D9; margin: 15px 0 0 0; font-size: 16px;">We've been busy creating amazing events</p>
                    </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; background: white;">
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi {{recipientName}},</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">I was just thinking about {{lastInteraction}} and wanted to reach out to reconnect.</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">{{recentWorkExamples}}</p>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #3FCBFF; margin: 20px 0;">
                            <h3 style="color: #1F1633; margin: 0 0 15px 0; font-size: 18px;">What's New at {{companyName}}</h3>
                            <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0;">{{valueProposition}}</p>
                        </div>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 20px 0;">I'd love to catch up and hear about your current event needs. Are you planning any events in the coming months?</p>
                        <p style="color: #1F1633; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Let's schedule a quick call to discuss how we can support your goals.</p>
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:45px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#3FCBFF">
                        <v:textbox inset="0,0,0,0">
                        <center style="color:#1F1633;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">{{ctaText}}</center>
                        </v:textbox>
                        </v:roundrect>
                        <![endif]-->
                        <a href="{{ctaUrl}}" style="background: #3FCBFF; color: #1F1633; text-decoration: none; padding: 12px 25px; border-radius: 6px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; display: inline-block; mso-hide: all;">{{ctaText}}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 25px 30px; background: #f8f9fa; border-top: 3px solid #3FCBFF;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="color: #1F1633; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">{{senderName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">{{senderTitle}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">{{companyName}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 0;">
                                        <a href="mailto:{{companyEmail}}" style="color: #3FCBFF; text-decoration: none;">{{companyEmail}}</a> | 
                                        <a href="tel:{{companyPhone}}" style="color: #3FCBFF; text-decoration: none;">{{companyPhone}}</a>
                                    </p>
                                    <p style="color: #666; font-size: 14px; margin: 5px 0;">{{companyAddress}}</p>
                                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                        <a href="{{companyWebsite}}" style="color: #3FCBFF; text-decoration: none;">{{companyWebsite}}</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    /**
     * Setup event listeners for UI interactions
     */
    setupEventListeners() {
        // Bind UI events immediately since DOM is already loaded
        this.bindUIEvents();
        this.bindZoomEvents();
    }

    /**
     * Bind UI event handlers
     */
    bindUIEvents() {
        // Download HTML button
        const downloadBtn = document.getElementById('downloadHtml');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadHtml();
            });
        }

        // Show/Hide HTML button
        const showHtmlBtn = document.getElementById('showHtml');
        if (showHtmlBtn) {
            showHtmlBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleHtmlView();
            });
        }

        // Save draft button
        const saveDraftBtn = document.getElementById('saveDraft');
        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveDraft();
            });
        }

        // Load draft button
        const loadDraftBtn = document.getElementById('loadDraft');
        if (loadDraftBtn) {
            loadDraftBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadDraft();
            });
        }
    }

    /**
     * Render the template library grid
     */
    renderTemplateLibrary() {
        const container = document.getElementById('templateLibrary');
        if (!container) return;

        // Render category cards view
        const categoriesHtml = this.templateCategories.map(category => `
            <div class="category-card" data-category-id="${category.id}" onclick="emailBuilder.showCategoryTemplates('${category.id}')">
                <div class="category-icon" style="color: ${category.color};">
                    ${category.icon}
                </div>
                <div class="category-info">
                    <h3 class="category-card-title">${category.name}</h3>
                    <p class="category-card-description">${category.description}</p>
                    <div class="category-template-count">
                        ${category.templates.length} template${category.templates.length !== 1 ? 's' : ''}
                    </div>
                </div>
                <div class="category-arrow">→</div>
            </div>
        `).join('');

        container.innerHTML = `
            <div id="categoryView" class="category-grid">
                ${categoriesHtml}
            </div>
            <div id="templateView" class="template-view" style="display: none;">
                <!-- Templates will be loaded here -->
            </div>
        `;

        // Setup search functionality
        this.setupSearch();
    }

    /**
     * Show templates for a specific category
     */
    showCategoryTemplates(categoryId) {
        const category = this.templateCategories.find(c => c.id === categoryId);
        if (!category) return;

        const categoryView = document.getElementById('categoryView');
        const templateView = document.getElementById('templateView');
        const backButton = document.querySelector('.back-to-categories-btn');

        if (categoryView && templateView && backButton) {
            categoryView.style.display = 'none';
            templateView.style.display = 'block';
            backButton.style.display = 'inline-block';

            // Render templates for this category
            templateView.innerHTML = `
                <div class="category-header-detail">
                    <div class="category-icon-large" style="color: ${category.color};">
                        ${category.icon}
                    </div>
                    <div>
                        <h2 class="category-title-large">${category.name}</h2>
                        <p class="category-description-large">${category.description}</p>
                    </div>
                </div>
                <div class="category-templates-grid">
                    ${category.templates.map(template => `
                        <div class="template-card" data-template-id="${template.id}">
                            <div class="template-info">
                                <h3>${template.name}</h3>
                                <p>${template.description}</p>
                                <button class="select-template-btn" onclick="emailBuilder.selectTemplate('${template.id}')">
                                    Select Template
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    /**
     * Show categories view
     */
    showCategories() {
        const categoryView = document.getElementById('categoryView');
        const templateView = document.getElementById('templateView');
        const backButton = document.querySelector('.back-to-categories-btn');

        if (categoryView && templateView && backButton) {
            categoryView.style.display = 'grid';
            templateView.style.display = 'none';
            backButton.style.display = 'none';
        }
    }

    /**
     * Setup search functionality
     */
    setupSearch() {
        const searchInput = document.getElementById('templateSearch');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filterContent(searchTerm);
        });
    }

    /**
     * Filter categories and templates based on search term
     */
    filterContent(searchTerm) {
        if (!searchTerm) {
            this.showCategories();
            return;
        }

        const categoryView = document.getElementById('categoryView');
        const templateView = document.getElementById('templateView');
        const backButton = document.querySelector('.back-to-categories-btn');

        // Search through all templates across categories
        const matchingTemplates = [];
        this.templateCategories.forEach(category => {
            category.templates.forEach(template => {
                const templateMatches = 
                    template.name.toLowerCase().includes(searchTerm) ||
                    template.description.toLowerCase().includes(searchTerm) ||
                    category.name.toLowerCase().includes(searchTerm);
                
                if (templateMatches) {
                    matchingTemplates.push({
                        ...template,
                        categoryName: category.name,
                        categoryIcon: category.icon,
                        categoryColor: category.color
                    });
                }
            });
        });

        if (matchingTemplates.length > 0) {
            // Show filtered results
            if (categoryView && templateView) {
                categoryView.style.display = 'none';
                templateView.style.display = 'block';
                backButton.style.display = 'inline-block';

                templateView.innerHTML = `
                    <div class="search-results-header">
                        <h2>Search Results for "${searchTerm}"</h2>
                        <p>${matchingTemplates.length} template${matchingTemplates.length !== 1 ? 's' : ''} found</p>
                    </div>
                    <div class="category-templates-grid">
                        ${matchingTemplates.map(template => `
                            <div class="template-card" data-template-id="${template.id}">
                                <div class="template-category-badge" style="background-color: ${template.categoryColor}20; color: ${template.categoryColor};">
                                    ${template.categoryIcon} ${template.categoryName}
                                </div>
                                <div class="template-info">
                                    <h3>${template.name}</h3>
                                    <p>${template.description}</p>
                                    <button class="select-template-btn" onclick="emailBuilder.selectTemplate('${template.id}')">
                                        Select Template
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        } else {
            // Show no results
            if (templateView) {
                categoryView.style.display = 'none';
                templateView.style.display = 'block';
                backButton.style.display = 'inline-block';

                templateView.innerHTML = `
                    <div class="no-results">
                        <h2>No templates found</h2>
                        <p>No templates match "${searchTerm}". Try a different search term.</p>
                    </div>
                `;
            }
        }
    }

    /**
     * Select a template and render the editor
     */
    selectTemplate(templateId) {
        console.log('🎯 selectTemplate called with:', templateId);
        this.currentTemplate = this.templates.find(t => t.id === templateId);
        if (!this.currentTemplate) {
            console.error('❌ Template not found:', templateId);
            return;
        }

        console.log('✅ Found template:', this.currentTemplate.name);
        // Reset current values
        this.currentValues = {};
        
        // Initialize with default values
        this.currentTemplate.dynamicFields.forEach(field => {
            this.currentValues[field.key] = '';
        });
        console.log('📝 Current values initialized:', this.currentValues);

        this.renderFieldEditor();
        console.log('📋 Field editor rendered');
        
        this.updatePreview();
        console.log('🖼️ Preview update called');
        
        this.showEditor();
        console.log('👁️ Editor shown');
        
        // Enable action buttons when template is selected
        this.enableActionButtons();
    }
    
    /**
     * Enable action buttons when template is loaded
     */
    enableActionButtons() {
        const buttons = ['downloadHtml', 'showHtml', 'saveDraft'];
        buttons.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.disabled = false;
            }
        });
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
            
            // Check if this field depends on another field
            let style = '';
            if (field.dependsOn) {
                const dependsOnValue = this.currentValues[field.dependsOn] || '';
                style = dependsOnValue === field.dependsValue ? 'display: block;' : 'display: none;';
            }
            
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
                case 'select':
                    const options = field.options.map(option => 
                        `<option value="${option.value}" ${value === option.value ? 'selected' : ''}>${option.label}</option>`
                    ).join('');
                    inputHtml = `<select 
                        id="field_${field.key}" 
                        ${required}
                        onchange="emailBuilder.updateField('${field.key}', this.value); emailBuilder.handleFieldDependency('${field.key}', this.value)"
                    >${options}</select>`;
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
                <div class="field-group" style="${style}">
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
     * Handle field dependencies (show/hide fields based on other field values)
     */
    handleFieldDependency(changedFieldKey, changedValue) {
        // Find all fields that depend on the changed field
        const dependentFields = this.currentTemplate.dynamicFields.filter(field => 
            field.dependsOn === changedFieldKey
        );

        dependentFields.forEach(field => {
            const fieldGroup = document.querySelector(`#field_${field.key}`).closest('.field-group');
            if (fieldGroup) {
                if (changedValue === field.dependsValue) {
                    fieldGroup.style.display = 'block';
                } else {
                    fieldGroup.style.display = 'none';
                    // Clear the value when hiding
                    this.currentValues[field.key] = '';
                    const fieldElement = document.getElementById(`field_${field.key}`);
                    if (fieldElement) {
                        fieldElement.value = '';
                    }
                }
            }
        });

        // Update preview to reflect changes
        this.updatePreview();
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
        console.log('🖼️ updatePreview called');
        console.log('📄 Current template:', this.currentTemplate ? this.currentTemplate.name : 'null');
        
        if (!this.currentTemplate) {
            console.warn('⚠️ No current template, exiting updatePreview');
            return;
        }

        const preview = document.getElementById('emailPreview');
        if (!preview) {
            console.error('❌ Preview iframe not found');
            return;
        }
        console.log('✅ Preview iframe found:', preview);

        try {
            console.log('🏗️ Generating HTML...');
            let html = this.generateHtml();
            
            // Inject zoom styles into the HTML
            const zoomScale = this.zoomLevel / 100;
            const zoomCSS = `
                <style>
                    body {
                        transform: scale(${zoomScale}) !important;
                        transform-origin: top left !important;
                        width: ${100 / zoomScale}% !important;
                        height: ${100 / zoomScale}% !important;
                    }
                </style>
            `;
            
            // Insert zoom CSS before closing head tag, or before body if no head
            if (html.includes('</head>')) {
                html = html.replace('</head>', zoomCSS + '</head>');
            } else if (html.includes('<body')) {
                html = html.replace('<body', zoomCSS + '<body');
            } else {
                html = zoomCSS + html;
            }
            
            console.log('✅ HTML generated with zoom, length:', html.length);
            console.log('📝 HTML preview:', html.substring(0, 200) + '...');
            
            // Use data URL to avoid CSP issues with srcdoc
            const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
            console.log('🔗 Data URL created, length:', dataUrl.length);
            
            preview.src = dataUrl;
            console.log('✅ Preview src set to data URL');
            
            // Also try srcdoc as backup
            preview.srcdoc = html;
            console.log('✅ Preview srcdoc also set as backup');
            
        } catch (error) {
            console.error('❌ Error updating preview:', error);
            console.error('Stack trace:', error.stack);
            
            // Fallback: try srcdoc
            try {
                const html = this.generateHtml();
                preview.srcdoc = html;
                console.log('🔄 Fallback: Preview updated with srcdoc');
            } catch (fallbackError) {
                console.error('❌ Fallback preview error:', fallbackError);
                this.showMessage('❌ Preview update failed. Please refresh the page.', 'error');
            }
        }
    }

    /**
     * Generate the final HTML from template and values
     */
    generateHtml() {
        console.log('🏗️ generateHtml called');
        if (!this.currentTemplate) {
            console.warn('❌ No template selected');
            return '';
        }

        if (!this.currentTemplate.htmlTemplate) {
            console.warn('❌ No HTML template found');
            return '';
        }

        console.log('📊 Current values:', this.currentValues || 'No values set');
        
        // Check for required fields but don't block generation
        const missingRequired = [];
        if (this.currentTemplate.dynamicFields) {
            this.currentTemplate.dynamicFields.forEach(field => {
                if (field.required && (!this.currentValues || !this.currentValues[field.key])) {
                    missingRequired.push(field.label);
                }
            });
        }
        
        if (missingRequired.length > 0) {
            console.warn('⚠️ Missing required fields:', missingRequired);
            // Continue generation but warn user
        }
        
        console.log('📋 Template name:', this.currentTemplate.name);
        console.log('📄 HTML template length:', this.currentTemplate.htmlTemplate.length);

        let html = this.currentTemplate.htmlTemplate;
        
        try {
            // Replace locked fields
            if (this.currentTemplate.lockedFields) {
                console.log('🔒 Processing locked fields:', Object.keys(this.currentTemplate.lockedFields));
                Object.entries(this.currentTemplate.lockedFields).forEach(([key, value]) => {
                    const regex = new RegExp(`{{${key}}}`, 'g');
                    html = html.replace(regex, value || '');
                });
            }

            // Replace dynamic fields
            if (this.currentValues) {
                console.log('🔄 Processing dynamic fields:', Object.keys(this.currentValues));
                console.log('📊 Current values:', this.currentValues);
                Object.entries(this.currentValues).forEach(([key, value]) => {
                    const field = this.currentTemplate.dynamicFields?.find(f => f.key === key);
                    let processedValue = value || '';

                    // Special handling for pain point selection
                    if (key === 'specificPainPoint' && value === 'custom') {
                        processedValue = this.currentValues['customPainPoint'] || '';
                        console.log('🎯 Using custom pain point:', processedValue);
                    } else if (key === 'specificPainPoint' && value) {
                        console.log('🎯 Using predefined pain point:', value);
                    }

                    // Process list fields
                    if (field && field.type === 'list' && processedValue) {
                        const items = processedValue.split(/[|\n]/).filter(item => item.trim());
                        processedValue = items.map(item => `<li>${item.trim()}</li>`).join('');
                    }

                    console.log(`🔀 Replacing {{${key}}} with: "${processedValue}"`);
                    const regex = new RegExp(`{{${key}}}`, 'g');
                    html = html.replace(regex, processedValue);
                });
            }

            // Clean up any remaining placeholders
            const remainingPlaceholders = html.match(/{{[^}]+}}/g);
            if (remainingPlaceholders) {
                console.warn('⚠️ Remaining unfilled placeholders:', remainingPlaceholders);
            }
            html = html.replace(/{{[^}]+}}/g, '');
            
            console.log('✅ Final HTML generated, length:', html.length);
            console.log('📝 HTML preview (first 300 chars):', html.substring(0, 300));

            return html;
        } catch (error) {
            console.error('❌ Error generating HTML:', error);
            console.error('Stack trace:', error.stack);
            return '';
        }
    }

    /**
     * Copy generated HTML to clipboard
     */
    /**
     * Download generated HTML as file
     */
    downloadHtml() {
        try {
            const html = this.generateHtml();
            if (!html) {
                this.showMessage('❌ No content to download. Please fill in the template fields.', 'error');
                return;
            }
            
            // Wrap in proper HTML document with UTF-8 encoding
            const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body>
${html}
</body>
</html>`;
            
            const blob = new Blob([fullHtml], { type: 'text/html; charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `${this.currentTemplate.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showMessage('✅ HTML file downloaded!', 'success');
        } catch (error) {
            this.showMessage('❌ Failed to download HTML file. Please try again.', 'error');
            console.error('Download error:', error);
        }
    }

    /**
     * Toggle HTML source view
     */
    toggleHtmlView() {
        try {
            const htmlPanel = document.getElementById('htmlSource');
            const showBtn = document.getElementById('showHtml');
            
            if (!htmlPanel || !showBtn) {
                console.error('HTML panel or show button not found');
                return;
            }
            
            if (htmlPanel.style.display === 'none' || !htmlPanel.style.display) {
                const html = this.generateHtml();
                if (!html) {
                    this.showMessage('❌ No content to show. Please fill in the template fields.', 'error');
                    return;
                }
                
                htmlPanel.style.display = 'block';
                const preElement = htmlPanel.querySelector('pre');
                if (preElement) {
                    preElement.textContent = html;
                }
                showBtn.textContent = 'Hide HTML';
                this.showMessage('📄 HTML source displayed', 'info');
            } else {
                htmlPanel.style.display = 'none';
                showBtn.textContent = 'Show HTML';
            }
        } catch (error) {
            this.showMessage('❌ Failed to toggle HTML view. Please try again.', 'error');
            console.error('Toggle HTML view error:', error);
        }
    }

    /**
     * Save current draft to localStorage
     */
    saveDraft() {
        if (!this.currentTemplate) {
            this.showMessage('❌ No template selected to save as draft.', 'error');
            return;
        }

        try {
            const draft = {
                templateId: this.currentTemplate.id,
                values: { ...this.currentValues },
                owner: 'current-user', // TODO: Get from auth system
                updatedAt: new Date().toISOString()
            };

            localStorage.setItem('emailBuilderDraft', JSON.stringify(draft));
            this.showMessage('✅ Draft saved locally!', 'success');
        } catch (error) {
            console.error('Error saving draft:', error);
            this.showMessage('❌ Failed to save draft. Please try again.', 'error');
        }
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
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap" rel="stylesheet">
    <!--[if mso]>
    <nxml:namespace xmlns:nxml="urn:schemas-microsoft-com:office:office" />
    <nxml:namespace xmlns:w="urn:schemas-microsoft-com:office:word" />
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Manrope', Arial, sans-serif; background-color: #f8f9fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; mso-border-radius-alt: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 40px 20px; text-align: center; background-color: {{brandHex}}; border-radius: 8px 8px 0 0;">
                            <img src="{{logoUrl}}" alt="{{companyName}}" style="max-height: 50px; height: auto;" />
                            <div style="margin-top: 10px; font-size: 14px; font-style: italic; color: {{accentHex}}; font-weight: 400;">
                                {{companyTagline}}
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <h1 style="margin: 0 0 20px; font-size: 24px; color: {{brandHex}}; font-weight: 600; font-family: 'Manrope', Arial, sans-serif;">
                                Hello {{recipientName}},
                            </h1>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333; font-family: 'Manrope', Arial, sans-serif;">
                                I hope this message finds you well. I'm reaching out from {{companyName}} regarding an exciting opportunity for {{recipientCompany}}.
                            </p>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333; font-family: 'Manrope', Arial, sans-serif;">
                                {{introLine}}
                            </p>
                            
                            <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #333333; font-family: 'Manrope', Arial, sans-serif;">
                                {{valueProposition}}
                            </p>
                            
                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                                <tr>
                                    <td>
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{ctaUrl}}" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="{{accentHex}}">
                                            <w:anchorlock/>
                                            <center style="color:#ffffff;font-family:'Manrope',Arial,sans-serif;font-size:16px;font-weight:600;">{{ctaText}}</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <!--[if !mso]><!-->
                                        <a href="{{ctaUrl}}" style="display: inline-block; padding: 15px 30px; background-color: {{accentHex}}; color: #ffffff; text-decoration: none; border-radius: 5px; mso-border-radius-alt: 0; font-weight: 600; font-size: 16px; font-family: 'Manrope', Arial, sans-serif;">{{ctaText}}</a>
                                        <!--<![endif]-->
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.6; color: #333333; font-family: 'Manrope', Arial, sans-serif;">
                                I'd love to discuss how we can bring exceptional value to your next event. Would you be available for a brief call this week?
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px 30px; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0 0 10px; font-size: 14px; color: #666666; font-family: 'Manrope', Arial, sans-serif;">
                                            <strong>{{companyName}}</strong><br>
                                            {{companyAddress}}<br>
                                            Phone: {{companyPhone}} | Email: {{companyEmail}}<br>
                                            <a href="https://{{companyWebsite}}" style="color: {{accentHex}}; text-decoration: none;">{{companyWebsite}}</a>
                                        </p>
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
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; mso-border-radius-alt: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
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
                            
                            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; mso-border-radius-alt: 0; margin: 20px 0;">
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
                                        <a href="{{ctaUrl}}" style="background-color: {{accentHex}}; border: none; border-radius: 5px; mso-border-radius-alt: 0; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 200px; -webkit-text-size-adjust: none; mso-hide: all;">{{ctaText}}</a>
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
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; mso-border-radius-alt: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
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
                            
                            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 25px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #10b981; margin: 25px 0;">
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
                                        <a href="{{ctaUrl}}" style="background-color: #10b981; border: none; border-radius: 5px; mso-border-radius-alt: 0; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 220px; -webkit-text-size-adjust: none; mso-hide: all;">{{ctaText}}</a>
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
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; mso-border-radius-alt: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
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
                            
                            <div style="background: linear-gradient(135deg, #fef3c0 0%, #fde68a 100%); padding: 25px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #f59e0b; margin: 25px 0;">
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
                                        <a href="{{ctaUrl}}" style="background-color: #f59e0b; border: none; border-radius: 5px; mso-border-radius-alt: 0; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 220px; -webkit-text-size-adjust: none; mso-hide: all;">{{ctaText}}</a>
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
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; mso-border-radius-alt: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
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
                            
                            <div style="background: linear-gradient(135deg, #fef2f9 0%, #fce7f3 100%); padding: 25px; border-radius: 8px; mso-border-radius-alt: 0; border-left: 4px solid #ec4899; margin: 25px 0;">
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
                                        <a href="{{ctaUrl}}" style="background-color: {{accentHex}}; border: none; border-radius: 5px; mso-border-radius-alt: 0; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 200px; -webkit-text-size-adjust: none; mso-hide: all;">{{ctaText}}</a>
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

    /**
     * Generate thumbnail URL for template
     */
    generateThumbnail(templateId) {
        // Template name mapping for display
        const templateNames = {
            'initial_outreach': 'Initial Outreach',
            'capabilities_follow_up': 'Capabilities Follow-Up', 
            'proposal_submission': 'Proposal Submission',
            'loss_bid_thank_you': 'Loss Bid Thank You',
            'new_client_welcome': 'New Client Welcome',
            'client_onboarding': 'Client Onboarding',
            'thank_you_recap': 'Thank You & Recap',
            'survey_request': 'Survey Request',
            'case_study_request': 'Case Study Request',
            'holiday_greeting': 'Holiday Greeting',
            'event_anniversary': 'Event Anniversary',
            'industry_insight': 'Industry Insight',
            're_engagement': 'Re-Engagement'
        };
        
        const templateName = templateNames[templateId] || 'Template';
        
        // Generate SVG placeholder with template name
        const svg = `
            <svg width="320" height="200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#1F1633;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#3F105E;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="320" height="200" fill="url(#bg)"/>
                <circle cx="160" cy="70" r="20" fill="#3FCBFF" opacity="0.3"/>
                <rect x="40" y="110" width="240" height="8" rx="4" fill="#3FCBFF" opacity="0.6"/>
                <rect x="40" y="130" width="180" height="6" rx="3" fill="#B8A9D9" opacity="0.5"/>
                <rect x="40" y="145" width="200" height="6" rx="3" fill="#B8A9D9" opacity="0.4"/>
                <text text-anchor="middle" x="160" y="180" style="fill:#3FCBFF;font-family:Arial,sans-serif;font-size:12px;font-weight:600;">${templateName}</text>
            </svg>
        `;
        
        return 'data:image/svg+xml;base64,' + btoa(svg);
    }

    /**
     * Get all templates (flat array for compatibility)
     */
    getAllTemplates() {
        return this.templateCategories.flatMap(category => 
            category.templates.map(template => ({
                ...template,
                categoryName: category.name,
                categoryId: category.id
            }))
        );
    }

    /**
     * Bind zoom control events
     */
    bindZoomEvents() {
        console.log('bindZoomEvents called');
        const zoomInBtn = document.getElementById('zoomIn');
        const zoomOutBtn = document.getElementById('zoomOut');
        const zoomResetBtn = document.getElementById('zoomReset');

        console.log('Zoom buttons found:', {
            zoomIn: zoomInBtn,
            zoomOut: zoomOutBtn,
            zoomReset: zoomResetBtn
        });

        if (zoomInBtn) {
            console.log('Binding zoom in event');
            zoomInBtn.addEventListener('click', () => {
                console.log('Zoom in clicked');
                this.zoomIn();
            });
        } else {
            console.warn('Zoom in button not found');
        }

        if (zoomOutBtn) {
            console.log('Binding zoom out event');
            zoomOutBtn.addEventListener('click', () => {
                console.log('Zoom out clicked');
                this.zoomOut();
            });
        } else {
            console.warn('Zoom out button not found');
        }

        if (zoomResetBtn) {
            console.log('Binding zoom reset event');
            zoomResetBtn.addEventListener('click', () => {
                console.log('Zoom reset clicked');
                this.zoomReset();
            });
        } else {
            console.warn('Zoom reset button not found');
        }
    }

    /**
     * Zoom in preview
     */
    zoomIn() {
        console.log('zoomIn called, current level:', this.zoomLevel);
        if (this.zoomLevel < 200) {
            this.zoomLevel += 25;
            console.log('New zoom level:', this.zoomLevel);
            this.applyZoom();
        } else {
            console.log('Max zoom reached');
        }
    }

    /**
     * Zoom out preview
     */
    zoomOut() {
        console.log('zoomOut called, current level:', this.zoomLevel);
        if (this.zoomLevel > 50) {
            this.zoomLevel -= 25;
            console.log('New zoom level:', this.zoomLevel);
            this.applyZoom();
        } else {
            console.log('Min zoom reached');
        }
    }

    /**
     * Reset zoom to 100%
     */
    zoomReset() {
        console.log('zoomReset called');
        this.zoomLevel = 100;
        this.applyZoom();
    }

    /**
     * Apply zoom transformation to preview
     */
    applyZoom() {
        console.log('applyZoom called with level:', this.zoomLevel);
        const zoomDisplay = document.getElementById('zoomLevel');

        // Update zoom display
        if (zoomDisplay) {
            zoomDisplay.textContent = `${this.zoomLevel}%`;
            console.log('Zoom display updated');
        } else {
            console.error('Zoom display not found');
        }

        // Regenerate the preview with new zoom level
        if (this.currentTemplate) {
            console.log('Updating preview with new zoom level');
            this.updatePreview();
        }
    }
}

// Global instance
let emailBuilder;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        emailBuilder = new EmailTemplateBuilder();
        window.emailBuilder = emailBuilder; // Make it globally accessible
    } catch (error) {
        console.error('Failed to initialize EmailTemplateBuilder:', error);
    }
});

// Export for external access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailTemplateBuilder;
}
