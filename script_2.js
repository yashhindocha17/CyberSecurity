const nameInput = document.getElementById('nameInput');
            const submitButton = document.getElementById('submitButton');
            const nameOutput = document.getElementById('nameOutput');
            const status = document.getElementById('status');

        // Function to check for XSS patterns
        const checkForXSS = (content) => {
            // Common XSS patterns
            const xssPatterns = [
                /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Script tags
                /<img\s+src=['"]?javascript:/gi,                      // JavaScript in img src
                /on\w+=["']?[^"']+/gi,                                // Inline event handlers like onclick, onload, etc.
                /<a\s+[^>]*href=['"]?([^'"]*)['"]?/gi,                // Detect any <a> tag with href
                /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, // Iframe tags
                /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,    // Embed tags
                /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,  // Object tags
                /<link\s+[^>]*href=['"]?javascript:/gi,               // JavaScript in <link> tag href
                /<base\s+[^>]*href=['"]?javascript:/gi,               // JavaScript in <base> tag href
                /<meta\s+[^>]*http-equiv=['"]?refresh/gi,             // Meta refresh tag for redirects
                /<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi,       // Form tags
                /<input\b[^<]*(?:(?!<\/input>)<[^<]*)*<\/input>/gi,    // Input tags
                /<textarea\b[^<]*(?:(?!<\/textarea>)<[^<]*)*<\/textarea>/gi, // Textarea tags
                /<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/gi, // Button tags
                /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,   // Style tags (for CSS-based attacks)
                /expression\s*\(/gi,                                  // CSS expression() (used in older IE)
                /@import\s+['"]?javascript:/gi,                       // @import with JavaScript
                /<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi,          // SVG tags
                /<marquee\b[^<]*(?:(?!<\/marquee>)<[^<]*)*<\/marquee>/gi, // Marquee tags
                /<audio\b[^<]*(?:(?!<\/audio>)<[^<]*)*<\/audio>/gi,    // Audio tags
                /<video\b[^<]*(?:(?!<\/video>)<[^<]*)*<\/video>/gi,    // Video tags
                /<source\b[^<]*(?:(?!<\/source>)<[^<]*)*<\/source>/gi,  // Source tags in video/audio
                /<details\b[^<]*(?:(?!<\/details>)<[^<]*)*<\/details>/gi, // Details tags
                /<summary\b[^<]*(?:(?!<\/summary>)<[^<]*)*<\/summary>/gi, // Summary tags
                /<dialog\b[^<]*(?:(?!<\/dialog>)<[^<]*)*<\/dialog>/gi,  // Dialog tags
                /<applet\b[^<]*(?:(?!<\/applet>)<[^<]*)*<\/applet>/gi,  // Applet tags (deprecated, but can still be exploited)
                /<frame\b[^<]*(?:(?!<\/frame>)<[^<]*)*<\/frame>/gi,    // Frame tags (used in older browsers)
                /<frameset\b[^<]*(?:(?!<\/frameset>)<[^<]*)*<\/frameset>/gi, // Frameset tags (used in older browsers)
                /<bgsound\b[^<]*(?:(?!<\/bgsound>)<[^<]*)*<\/bgsound>/gi, // Bgsound tags (used in older IE browsers)
                /<isindex\b[^<]*(?:(?!<\/isindex>)<[^<]*)*<\/isindex>/gi, // Isindex tags (deprecated but exploitable)
                /<basefont\b[^<]*(?:(?!<\/basefont>)<[^<]*)*<\/basefont>/gi // Basefont tags (deprecated)
            ];            
            

            // Check content against patterns
            for (const pattern of xssPatterns) {
                if (pattern.test(content)) {
                    return true;
                }
            }
            return false;
        };

        // Create a MutationObserver to detect changes in nameOutput
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Check the added content for XSS
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                            const content = node.outerHTML || node.textContent;
                            if (checkForXSS(content)) {
                                status.textContent = 'Status: XSS attack detected!';
                                status.style.color = 'red';
                                status.hidden = false;
                                // Optionally, remove the malicious content
                                node.remove();
                                return;
                            }
                        }
                    });
                }
                else if(mutation.type === 'attributes'){
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                            status.textContent = 'Status: XSS attack detected!';
                            status.style.color = 'red';
                            status.hidden = false;
                        }
                    });
                }
                else if(mutation.type === 'characterData'){
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                            status.textContent = 'Status: XSS attack detected!';
                            status.style.color = 'red';
                            status.hidden = false;
                        }
                    });
                }
            });
        });

        // Configure the observer to monitor nameOutput
        observer.observe(nameOutput, {
            childList: true, // Detect changes to child elements
            subtree: true,   // Monitor all descendants
        });

        // Event listener for the Submit button
        // submitButton.addEventListener('click', () => {
        //     const userInput = nameInput.value;
        //     nameOutput.innerHTML = userInput; // Update the innerHTML of nameOutput
        // });

        document.getElementById('submitButton').addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default form submission behavior
            status.hidden = true;
            const userInput = nameInput.value;
            nameOutput.innerHTML = userInput; // Update the innerHTML of nameOutput
        });